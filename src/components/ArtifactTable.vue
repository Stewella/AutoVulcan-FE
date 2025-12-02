<template>
  <div class="artifact-table-container">
    <table class="artifact-table" v-if="artifacts.length > 0">
      <thead>
        <tr>
          <th @click="sort('repository')" class="sortable">
            Repository
            <span class="sort-icon" v-if="sortKey === 'repository'">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th>Commit</th>
          <th @click="sort('status')" class="sortable">
            Status
            <span class="sort-icon" v-if="sortKey === 'status'">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th>CVEs</th>
          <th @click="sort('durationMs')" class="sortable">
            Duration
            <span class="sort-icon" v-if="sortKey === 'durationMs'">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th @click="sort('createdAt')" class="sortable">
            Time
            <span class="sort-icon" v-if="sortKey === 'createdAt'">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="artifact in sortedArtifacts" 
          :key="artifact.id"
          tabindex="0"
          @keydown.enter="emit('view', artifact)"
        >
          <td class="repo-cell">
            <span class="repo-name">{{ artifact.repository }}</span>
          </td>
          <td class="commit-cell">
            <code>{{ artifact.commit }}</code>
          </td>
          <td>
            <span :class="['badge', getStatusClass(artifact.status)]">
              {{ artifact.status }}
            </span>
          </td>
          <td class="cves-cell">
            <div class="cve-list">
              <span 
                v-for="(cve, index) in getDisplayCVEs(artifact.cves)"
                :key="cve"
                class="cve-badge"
              >
                {{ cve }}
              </span>
              <span v-if="artifact.cves?.length > 3" class="cve-more">
                +{{ artifact.cves.length - 3 }} more
              </span>
            </div>
          </td>
          <td class="duration-cell">
            {{ formatDuration(artifact.durationMs) }}
          </td>
          <td class="time-cell">
            {{ formatTime(artifact.createdAt) }}
          </td>
          <td class="actions-cell">
            <div class="action-buttons">
              <button 
                @click="emit('view', artifact)" 
                class="action-btn view-btn"
                title="View Details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                View
              </button>
              <button 
                @click="emit('download', artifact)" 
                class="action-btn download-btn"
                title="Download Artifact"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
              <button 
                @click="emit('graph', artifact)" 
                class="action-btn graph-btn"
                title="View Call Graph"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div v-else class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
      </svg>
      <p>No artifacts found</p>
      <span>Run an analysis to generate artifacts</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  artifacts: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['view', 'download', 'graph'])

const sortKey = ref('createdAt')
const sortOrder = ref('desc')

const sortedArtifacts = computed(() => {
  return [...props.artifacts].sort((a, b) => {
    let aVal = a[sortKey.value]
    let bVal = b[sortKey.value]
    
    if (sortKey.value === 'createdAt') {
      aVal = new Date(aVal)
      bVal = new Date(bVal)
    }
    
    if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})

function sort(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'desc'
  }
}

function getStatusClass(status) {
  switch (status) {
    case 'Success': return 'badge-success'
    case 'Failed': return 'badge-error'
    case 'Running': return 'badge-warning'
    default: return 'badge-info'
  }
}

function getDisplayCVEs(cves) {
  if (!cves) return []
  return cves.slice(0, 3)
}

function formatDuration(ms) {
  if (!ms) return '-'
  if (ms < 1000) return `${ms}ms`
  const seconds = Math.floor(ms / 1000)
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds}s`
}

function formatTime(isoString) {
  if (!isoString) return '-'
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.artifact-table-container {
  overflow-x: auto;
}

.artifact-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.artifact-table th {
  text-align: left;
  padding: 0.75rem 1rem;
  background: var(--bg-input);
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--border);
}

.artifact-table th.sortable {
  cursor: pointer;
  user-select: none;
}

.artifact-table th.sortable:hover {
  color: var(--primary);
}

.sort-icon {
  margin-left: 0.25rem;
  color: var(--primary);
}

.artifact-table td {
  padding: 1rem;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}

.artifact-table tbody tr {
  transition: background 0.2s ease;
}

.artifact-table tbody tr:hover {
  background: rgba(14, 165, 233, 0.05);
}

.artifact-table tbody tr:focus {
  outline: none;
  background: rgba(14, 165, 233, 0.1);
}

.repo-name {
  font-weight: 500;
  color: var(--text-primary);
}

.commit-cell code {
  background: var(--bg-input);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8125rem;
  color: var(--secondary);
}

.cve-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cve-badge {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.cve-more {
  color: var(--text-muted);
  font-size: 0.75rem;
}

.duration-cell {
  color: var(--text-secondary);
  font-variant-numeric: tabular-nums;
}

.time-cell {
  color: var(--text-muted);
  font-size: 0.8125rem;
  white-space: nowrap;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--border);
  color: var(--text-primary);
}

.view-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.download-btn:hover {
  border-color: var(--success);
  color: var(--success);
}

.graph-btn:hover {
  border-color: var(--secondary);
  color: var(--secondary);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  color: var(--text-muted);
  text-align: center;
}

.empty-state svg {
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state p {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.empty-state span {
  font-size: 0.875rem;
}

@media (max-width: 1024px) {
  .artifact-table th,
  .artifact-table td {
    padding: 0.75rem 0.5rem;
  }
  
  .action-btn span {
    display: none;
  }
}
</style>
