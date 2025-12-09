<template>
  <div class="modal-overlay" @click.self="emit('close')" @keydown.escape="emit('close')">
    <div class="modal" role="dialog" aria-labelledby="modal-title" tabindex="-1" ref="modalRef">
      <div class="modal-header">
        <h2 id="modal-title">{{ t.artifactDetail.title }}</h2>
        <button @click="emit('close')" class="close-btn" :aria-label="t.common.closeModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="modal-body">
        <div class="artifact-summary">
          <div class="summary-item">
            <span class="label">{{ t.artifactDetail.repository }}</span>
            <span class="value">{{ artifact.repository }}</span>
          </div>
          <div class="summary-item">
            <span class="label">{{ t.artifactDetail.status }}</span>
            <span :class="['badge', getStatusClass(artifact.status)]">{{ artifact.status }}</span>
          </div>
          <div class="summary-item">
            <span class="label">{{ t.artifactDetail.duration }}</span>
            <span class="value">{{ formatDuration(artifact.durationMs) }}</span>
          </div>
        </div>



        <div class="section cves-section" v-if="artifact.cves?.length">
          <h3 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            {{ t.artifactDetail.targetCves }} ({{ artifact.cves.length }})
          </h3>
          <div class="cve-grid">
            <div v-for="cve in artifact.cves" :key="cve" class="cve-item">
              <span class="cve-id">{{ cve }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button @click="emit('close')" class="btn btn-secondary">
          {{ t.artifactDetail.close }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

const props = defineProps({
  artifact: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const modalRef = ref(null)


onMounted(() => {
  if (modalRef.value) {
    modalRef.value.focus()
  }
})

function getStatusClass(status) {
  switch (status) {
    case 'Success': return 'badge-success'
    case 'Failed': return 'badge-error'
    case 'Running': return 'badge-warning'
    default: return 'badge-info'
  }
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
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal {
  background: var(--bg-card);
  border-radius: 1rem;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  animation: modalIn 0.2s ease-out;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.close-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: var(--bg-input);
  color: var(--text-primary);
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.artifact-summary {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.summary-item .label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

.summary-item .value {
  font-size: 0.9375rem;
  color: var(--text-primary);
}

.summary-item .commit {
  background: var(--bg-input);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8125rem;
  color: var(--secondary);
  width: fit-content;
}

.section {
  margin-bottom: 2rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.section-title svg {
  color: var(--primary);
}

.localization-info {
  background: var(--bg-input);
  border-radius: 0.75rem;
  padding: 1rem;
}

.loc-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
}

.loc-item:not(:last-child) {
  border-bottom: 1px solid var(--border);
}

.loc-label {
  font-size: 0.875rem;
  color: var(--text-muted);
  min-width: 60px;
}

.loc-item code {
  font-size: 0.8125rem;
  color: var(--primary);
}

.line-number {
  background: rgba(14, 165, 233, 0.2);
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
}

.evidence-info {
  background: var(--bg-input);
  border-radius: 0.75rem;
  padding: 1rem;
}

.coverage-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.coverage-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  min-width: 100px;
}

.coverage-track {
  flex: 1;
  height: 8px;
  background: var(--bg-card);
  border-radius: 4px;
  overflow: hidden;
}

.coverage-fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.coverage-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary);
  min-width: 50px;
  text-align: right;
}

.exploit-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.exploit-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.exploit-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.exploit-badge.success {
  background: rgba(34, 197, 94, 0.2);
  color: var(--success);
}

.exploit-badge.failed {
  background: rgba(239, 68, 68, 0.2);
  color: var(--error);
}

.execution-trace h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.trace-list {
  margin: 0;
  padding-left: 1.5rem;
  list-style: decimal;
}

.trace-list li {
  padding: 0.5rem 0;
  color: var(--text-muted);
  font-size: 0.8125rem;
}

.trace-list li code {
  color: var(--text-primary);
  background: var(--bg-card);
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
}

.failure-reason {
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: var(--error);
}

.cve-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cve-item {
  background: rgba(239, 68, 68, 0.15);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

.cve-id {
  font-size: 0.875rem;
  font-weight: 500;
  color: #f87171;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 600px) {
  .modal-overlay {
    padding: 1rem;
  }
  
  .artifact-summary {
    grid-template-columns: 1fr;
  }
}
</style>
