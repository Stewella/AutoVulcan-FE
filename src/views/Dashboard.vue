<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div class="container">
        <h1 class="page-title">{{ t.dashboard.title }}</h1>
        <p class="page-subtitle">{{ t.dashboard.subtitle }}</p>
      </div>
    </div>

    <div class="dashboard-content">
      <div class="dashboard-grid">
        <div class="input-panel card">
          <h2 class="panel-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            {{ t.dashboard.codeInput }}
          </h2>
          
          <CodeInputPanel 
            @run="handleRunScan"
            :disabled="isRunning"
          />
        </div>

        <div class="results-panel">
          <div class="execution-status card" v-if="currentJob">
            <h3 class="status-title">
              <span class="spinner" v-if="currentJob.status === 'running'"></span>
              <svg v-else-if="currentJob.status === 'success'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-success">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <svg v-else-if="currentJob.status === 'failed'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-error">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              {{ getAnalysisStatusText(currentJob.status) }}
            </h3>
            <div class="progress-container" v-if="currentJob.status === 'running'">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: currentJob.progress + '%' }"></div>
              </div>
              <span class="progress-text">{{ currentJob.progress }}%</span>
            </div>
            <div class="status-details" v-if="currentJob.status !== 'running'">
              <p v-if="currentJob.status === 'success'">
                {{ t.dashboard.analysis.foundCves.replace('{count}', currentJob.cves?.length || 0).replace('{duration}', formatDuration(currentJob.duration)) }}
              </p>
              <p v-else class="error-text">{{ currentJob.error }}</p>
            </div>
          </div>

          <div class="history-section card">
            <div class="history-header">
              <h2 class="panel-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {{ t.dashboard.artifactHistory }}
              </h2>
              <div class="history-controls">
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  :placeholder="t.dashboard.searchPlaceholder" 
                  class="search-input"
                />
                <select v-model="statusFilter" class="filter-select">
                  <option value="">{{ t.dashboard.allStatus }}</option>
                  <option value="Success">Success</option>
                  <option value="Failed">Failed</option>
                  <option value="Running">Running</option>
                </select>
              </div>
            </div>
            
            <ArtifactTable 
              :artifacts="filteredArtifacts"
              @view="openArtifactDetail"
              @download="downloadArtifact"
              @graph="openCallGraph"
            />
          </div>
        </div>
      </div>
    </div>

    <ArtifactDetailModal 
      v-if="showDetailModal"
      :artifact="selectedArtifact"
      @close="closeDetailModal"
    />

    <CallGraphModal
      v-if="showGraphModal"
      :artifact="selectedArtifact"
      @close="closeGraphModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useArtifactStore } from '../store'
import { api } from '../services/api'
import { useI18n } from '../composables/useI18n'
import CodeInputPanel from '../components/CodeInputPanel.vue'
import ArtifactTable from '../components/ArtifactTable.vue'
import ArtifactDetailModal from '../components/ArtifactDetailModal.vue'
import CallGraphModal from '../components/CallGraphModal.vue'

const { t } = useI18n()
const store = useArtifactStore()

const currentJob = ref(null)
const isRunning = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const showDetailModal = ref(false)
const showGraphModal = ref(false)
const selectedArtifact = ref(null)

const filteredArtifacts = computed(() => {
  let result = store.sortedArtifacts
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(a => 
      a.repository.toLowerCase().includes(query) ||
      a.commit.toLowerCase().includes(query) ||
      a.cves?.some(c => c.toLowerCase().includes(query))
    )
  }
  
  if (statusFilter.value) {
    result = result.filter(a => a.status === statusFilter.value)
  }
  
  return result
})

onMounted(() => {
  store.initDemoData()
})

function getAnalysisStatusText(status) {
  switch(status) {
    case 'running': return t.value.dashboard.analysis.running
    case 'success': return t.value.dashboard.analysis.complete
    case 'failed': return t.value.dashboard.analysis.failed
    default: return status
  }
}

async function handleRunScan(inputData) {
  isRunning.value = true
  currentJob.value = { status: 'running', progress: 0 }
  
  try {
    const { jobId } = await api.runScan(inputData)
    
    await pollJobStatus(jobId, inputData)
  } catch (error) {
    currentJob.value = { status: 'failed', error: error.message }
  } finally {
    isRunning.value = false
  }
}

async function pollJobStatus(jobId, inputData) {
  const pollInterval = 500
  
  while (true) {
    try {
      const status = await api.getJobStatus(jobId)
      currentJob.value = status
      
      if (status.status === 'success') {
        const artifact = {
          id: status.artifactId,
          repository: inputData.repository,
          commit: inputData.commit,
          status: 'Success',
          cves: status.cves,
          durationMs: status.duration,
          createdAt: new Date().toISOString(),
          artifactJson: await api.getArtifact(status.artifactId).then(a => a.artifactJson)
        }
        store.addArtifact(artifact)
        break
      } else if (status.status === 'failed') {
        break
      }
      
      await new Promise(resolve => setTimeout(resolve, pollInterval))
    } catch (error) {
      currentJob.value = { status: 'failed', error: error.message }
      break
    }
  }
}

function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`
  const seconds = Math.floor(ms / 1000)
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds}s`
}

function openArtifactDetail(artifact) {
  selectedArtifact.value = artifact
  showDetailModal.value = true
}

function closeDetailModal() {
  showDetailModal.value = false
  selectedArtifact.value = null
}

function downloadArtifact(artifact) {
  const dataStr = JSON.stringify(artifact, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `artifact-${artifact.id}.json`
  link.click()
  URL.revokeObjectURL(url)
}

function openCallGraph(artifact) {
  selectedArtifact.value = artifact
  showGraphModal.value = true
}

function closeGraphModal() {
  showGraphModal.value = false
  selectedArtifact.value = null
}
</script>

<style scoped>
.dashboard {
  min-height: calc(100vh - 160px);
}

.dashboard-header {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 3rem 2rem;
  border-bottom: 1px solid var(--border);
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

.dashboard-content {
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 2rem;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.panel-title svg {
  color: var(--primary);
}

.input-panel {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.execution-status {
  margin-bottom: 2rem;
}

.status-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.icon-success {
  color: var(--success);
}

.icon-error {
  color: var(--error);
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: var(--bg-input);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary);
  min-width: 45px;
}

.status-details {
  margin-top: 1rem;
  font-size: 0.9375rem;
  color: var(--text-secondary);
}

.error-text {
  color: var(--error);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.history-header .panel-title {
  margin-bottom: 0;
}

.history-controls {
  display: flex;
  gap: 1rem;
}

.search-input {
  padding: 0.5rem 1rem;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  color: var(--text-primary);
  width: 200px;
}

.search-input::placeholder {
  color: var(--text-muted);
}

.filter-select {
  padding: 0.5rem 1rem;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  color: var(--text-primary);
}

@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .input-panel {
    position: static;
  }
}

@media (max-width: 768px) {
  .dashboard-content {
    padding: 1rem;
  }
  
  .history-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .history-controls {
    width: 100%;
    flex-direction: column;
  }
  
  .search-input {
    width: 100%;
  }
}
</style>
