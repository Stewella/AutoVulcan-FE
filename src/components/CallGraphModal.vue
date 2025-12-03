<template>
  <div class="modal-overlay" @click.self="emit('close')" @keydown.escape="emit('close')">
    <div class="modal" role="dialog" aria-labelledby="graph-modal-title" tabindex="-1" ref="modalRef">
      <div class="modal-header">
        <h2 id="graph-modal-title">{{ t.callGraph.title }}</h2>
        <div class="header-info">
          <span class="repo-badge">{{ artifact.repository }}</span>
          <code class="commit-badge">{{ artifact.commit }}</code>
        </div>
        <button @click="emit('close')" class="close-btn" :aria-label="t.common.closeModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="modal-body">
        <div class="graph-container">
          <VueFlow
            :nodes="flowNodes"
            :edges="flowEdges"
            :default-viewport="{ zoom: 1, x: 0, y: 0 }"
            :fit-view-on-init="true"
            :nodes-draggable="true"
            :nodes-connectable="false"
            :zoom-on-scroll="true"
            :pan-on-drag="true"
            class="vue-flow-wrapper"
          >
            <Background pattern-color="#334155" :gap="20" />
            <Controls />
            
            <template #node-entry="{ data }">
              <div class="custom-node entry-node">
                <div class="node-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
                <span class="node-label">{{ data.label }}</span>
              </div>
            </template>
            
            <template #node-intermediate="{ data }">
              <div class="custom-node intermediate-node">
                <div class="node-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </div>
                <span class="node-label">{{ data.label }}</span>
              </div>
            </template>
            
            <template #node-vulnerable="{ data }">
              <div class="custom-node vulnerable-node">
                <div class="node-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <span class="node-label">{{ data.label }}</span>
              </div>
            </template>
          </VueFlow>
        </div>
        
        <div class="legend">
          <div class="legend-item">
            <span class="legend-color entry"></span>
            <span>{{ t.callGraph.legend.entry }}</span>
          </div>
          <div class="legend-item">
            <span class="legend-color intermediate"></span>
            <span>{{ t.callGraph.legend.intermediate }}</span>
          </div>
          <div class="legend-item">
            <span class="legend-color vulnerable"></span>
            <span>{{ t.callGraph.legend.vulnerable }}</span>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button @click="emit('close')" class="btn btn-secondary">
          {{ t.callGraph.close }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'
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

const callGraph = computed(() => props.artifact.artifactJson?.callGraph || { nodes: [], edges: [] })

const flowNodes = computed(() => {
  const nodes = callGraph.value.nodes || []
  const verticalSpacing = 120
  const horizontalCenter = 300
  
  return nodes.map((node, index) => {
    let xOffset = 0
    if (index % 2 === 1 && nodes.length > 2) {
      xOffset = 100
    } else if (index % 2 === 0 && index > 0) {
      xOffset = -100
    }
    
    return {
      id: node.id,
      type: node.type || 'intermediate',
      position: { 
        x: horizontalCenter + xOffset, 
        y: verticalSpacing * index + 50 
      },
      data: { label: node.label }
    }
  })
})

const flowEdges = computed(() => {
  const edges = callGraph.value.edges || []
  
  return edges.map((edge, index) => ({
    id: `e${index}`,
    source: edge.source,
    target: edge.target,
    animated: true,
    style: { stroke: '#0ea5e9', strokeWidth: 2 },
    markerEnd: {
      type: 'arrowclosed',
      color: '#0ea5e9'
    }
  }))
})

onMounted(() => {
  if (modalRef.value) {
    modalRef.value.focus()
  }
})
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
  max-width: 900px;
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
  flex-wrap: wrap;
  gap: 1rem;
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.header-info {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.repo-badge {
  background: var(--bg-input);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.commit-badge {
  background: var(--bg-input);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: var(--secondary);
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

.graph-container {
  background: var(--bg-dark);
  border-radius: 0.75rem;
  overflow: hidden;
  height: 450px;
}

.vue-flow-wrapper {
  width: 100%;
  height: 100%;
}

.custom-node {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: white;
  min-width: 140px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  cursor: grab;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.custom-node:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.node-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.node-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.entry-node {
  background: linear-gradient(135deg, #22c55e, #14b8a6);
  border: 2px solid #22c55e;
}

.intermediate-node {
  background: linear-gradient(135deg, #0ea5e9, #14b8a6);
  border: 2px solid #0ea5e9;
}

.vulnerable-node {
  background: linear-gradient(135deg, #ef4444, #f97316);
  border: 2px solid #ef4444;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.legend-color.entry {
  background: linear-gradient(135deg, #22c55e, #14b8a6);
}

.legend-color.intermediate {
  background: linear-gradient(135deg, #0ea5e9, #14b8a6);
}

.legend-color.vulnerable {
  background: linear-gradient(135deg, #ef4444, #f97316);
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }
  
  .graph-container {
    height: 350px;
  }
  
  .legend {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .modal-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

<style>
.vue-flow__node {
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
}

.vue-flow__handle {
  opacity: 0;
}

.vue-flow__controls {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  overflow: hidden;
}

.vue-flow__controls-button {
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  color: var(--text-secondary);
  fill: var(--text-secondary);
}

.vue-flow__controls-button:hover {
  background: var(--bg-input);
}

.vue-flow__background {
  background: var(--bg-dark);
}
</style>
