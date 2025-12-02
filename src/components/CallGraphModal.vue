<template>
  <div class="modal-overlay" @click.self="emit('close')" @keydown.escape="emit('close')">
    <div class="modal" role="dialog" aria-labelledby="graph-modal-title" tabindex="-1" ref="modalRef">
      <div class="modal-header">
        <h2 id="graph-modal-title">Call Graph Visualization</h2>
        <div class="header-info">
          <span class="repo-badge">{{ artifact.repository }}</span>
          <code class="commit-badge">{{ artifact.commit }}</code>
        </div>
        <button @click="emit('close')" class="close-btn" aria-label="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="modal-body">
        <div class="graph-container" ref="graphContainer">
          <svg 
            :width="svgWidth" 
            :height="svgHeight" 
            class="call-graph-svg"
            :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon 
                  points="0 0, 10 3.5, 0 7" 
                  fill="var(--primary)"
                />
              </marker>
              <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#0ea5e9"/>
                <stop offset="100%" style="stop-color:#14b8a6"/>
              </linearGradient>
              <linearGradient id="vulnerableGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ef4444"/>
                <stop offset="100%" style="stop-color:#f97316"/>
              </linearGradient>
              <linearGradient id="entryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#22c55e"/>
                <stop offset="100%" style="stop-color:#14b8a6"/>
              </linearGradient>
            </defs>
            
            <g class="edges">
              <line
                v-for="edge in computedEdges"
                :key="`${edge.source}-${edge.target}`"
                :x1="edge.x1"
                :y1="edge.y1"
                :x2="edge.x2"
                :y2="edge.y2"
                class="edge"
                marker-end="url(#arrowhead)"
              />
            </g>
            
            <g class="nodes">
              <g 
                v-for="node in computedNodes" 
                :key="node.id"
                :transform="`translate(${node.x}, ${node.y})`"
                class="node-group"
                @mouseenter="hoveredNode = node.id"
                @mouseleave="hoveredNode = null"
              >
                <rect
                  :x="-node.width / 2"
                  :y="-node.height / 2"
                  :width="node.width"
                  :height="node.height"
                  rx="8"
                  :class="['node-rect', node.type]"
                  :fill="getNodeFill(node.type)"
                />
                <text
                  x="0"
                  :y="4"
                  text-anchor="middle"
                  class="node-label"
                >
                  {{ node.label }}
                </text>
              </g>
            </g>
          </svg>
        </div>
        
        <div class="legend">
          <div class="legend-item">
            <span class="legend-color entry"></span>
            <span>Entry Point</span>
          </div>
          <div class="legend-item">
            <span class="legend-color intermediate"></span>
            <span>Intermediate Call</span>
          </div>
          <div class="legend-item">
            <span class="legend-color vulnerable"></span>
            <span>Vulnerable Code</span>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button @click="emit('close')" class="btn btn-secondary">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'

const props = defineProps({
  artifact: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const modalRef = ref(null)
const graphContainer = ref(null)
const hoveredNode = ref(null)

const svgWidth = 700
const svgHeight = 400

const callGraph = computed(() => props.artifact.artifactJson?.callGraph || { nodes: [], edges: [] })

const computedNodes = computed(() => {
  const nodes = callGraph.value.nodes || []
  const nodeCount = nodes.length
  const verticalSpacing = svgHeight / (nodeCount + 1)
  const horizontalCenter = svgWidth / 2
  
  return nodes.map((node, index) => {
    const labelLength = node.label.length
    const width = Math.max(150, labelLength * 8 + 40)
    
    let xOffset = 0
    if (index % 2 === 1 && nodeCount > 2) {
      xOffset = 80
    } else if (index % 2 === 0 && index > 0) {
      xOffset = -80
    }
    
    return {
      ...node,
      x: horizontalCenter + xOffset,
      y: verticalSpacing * (index + 1),
      width,
      height: 40
    }
  })
})

const computedEdges = computed(() => {
  const edges = callGraph.value.edges || []
  const nodeMap = new Map(computedNodes.value.map(n => [n.id, n]))
  
  return edges.map(edge => {
    const source = nodeMap.get(edge.source)
    const target = nodeMap.get(edge.target)
    
    if (!source || !target) return null
    
    return {
      source: edge.source,
      target: edge.target,
      x1: source.x,
      y1: source.y + source.height / 2,
      x2: target.x,
      y2: target.y - target.height / 2 - 10
    }
  }).filter(Boolean)
})

function getNodeFill(type) {
  switch (type) {
    case 'entry': return 'url(#entryGradient)'
    case 'vulnerable': return 'url(#vulnerableGradient)'
    default: return 'url(#nodeGradient)'
  }
}

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
  max-width: 800px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.call-graph-svg {
  display: block;
}

.edge {
  stroke: var(--primary);
  stroke-width: 2;
  opacity: 0.6;
}

.node-rect {
  stroke-width: 2;
  cursor: pointer;
  transition: all 0.2s ease;
}

.node-rect.entry {
  stroke: #22c55e;
}

.node-rect.intermediate {
  stroke: #0ea5e9;
}

.node-rect.vulnerable {
  stroke: #ef4444;
}

.node-group:hover .node-rect {
  filter: brightness(1.2);
  transform: scale(1.02);
}

.node-label {
  fill: white;
  font-size: 11px;
  font-weight: 500;
  pointer-events: none;
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
