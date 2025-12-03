import { defineStore } from 'pinia'

export { useLanguageStore } from './language'

export const useArtifactStore = defineStore('artifacts', {
  state: () => ({
    artifacts: [],
    currentJob: null,
    selectedArtifact: null
  }),
  
  getters: {
    sortedArtifacts: (state) => {
      return [...state.artifacts].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      )
    },
    
    runningJobs: (state) => {
      return state.artifacts.filter(a => a.status === 'Running')
    }
  },
  
  actions: {
    addArtifact(artifact) {
      this.artifacts.push(artifact)
    },
    
    updateArtifact(artifactId, updates) {
      const index = this.artifacts.findIndex(a => a.id === artifactId)
      if (index !== -1) {
        this.artifacts[index] = { ...this.artifacts[index], ...updates }
      }
    },
    
    setSelectedArtifact(artifact) {
      this.selectedArtifact = artifact
    },
    
    clearSelectedArtifact() {
      this.selectedArtifact = null
    },
    
    initDemoData() {
      if (this.artifacts.length === 0) {
        const demoArtifacts = [
          {
            id: 'art-001',
            repository: 'commons-collections',
            commit: 'e585cd0',
            status: 'Success',
            cves: ['CVE-2015-6420', 'CVE-2015-7501'],
            durationMs: 45230,
            createdAt: '2025-11-28T14:30:00Z',
            artifactJson: {
              localization: {
                className: 'org.apache.commons.collections.functors.InvokerTransformer',
                method: 'transform',
                line: 125
              },
              evidence: {
                executionTrace: [
                  'InvokerTransformer.transform(Object)',
                  'ChainedTransformer.transform(Object)',
                  'LazyMap.get(Object)',
                  'AnnotationInvocationHandler.invoke(Object, Method, Object[])'
                ],
                coverage: 87.5,
                exploitSuccess: true
              },
              callGraph: {
                nodes: [
                  { id: 'n1', label: 'Main.main()', type: 'entry' },
                  { id: 'n2', label: 'LazyMap.get()', type: 'intermediate' },
                  { id: 'n3', label: 'ChainedTransformer.transform()', type: 'intermediate' },
                  { id: 'n4', label: 'InvokerTransformer.transform()', type: 'vulnerable' }
                ],
                edges: [
                  { source: 'n1', target: 'n2' },
                  { source: 'n2', target: 'n3' },
                  { source: 'n3', target: 'n4' }
                ]
              }
            }
          },
          {
            id: 'art-002',
            repository: 'log4j-core',
            commit: '3b9fca8',
            status: 'Success',
            cves: ['CVE-2021-44228', 'CVE-2021-45046', 'CVE-2021-45105'],
            durationMs: 62400,
            createdAt: '2025-11-27T09:15:00Z',
            artifactJson: {
              localization: {
                className: 'org.apache.logging.log4j.core.lookup.JndiLookup',
                method: 'lookup',
                line: 56
              },
              evidence: {
                executionTrace: [
                  'JndiLookup.lookup(LogEvent, String)',
                  'Interpolator.lookup(LogEvent, String)',
                  'StrSubstitutor.resolveVariable(LogEvent, String, StringBuilder, int, int)',
                  'MessagePatternConverter.format(LogEvent, StringBuilder)'
                ],
                coverage: 92.3,
                exploitSuccess: true
              },
              callGraph: {
                nodes: [
                  { id: 'n1', label: 'Logger.error()', type: 'entry' },
                  { id: 'n2', label: 'MessagePatternConverter.format()', type: 'intermediate' },
                  { id: 'n3', label: 'StrSubstitutor.replace()', type: 'intermediate' },
                  { id: 'n4', label: 'Interpolator.lookup()', type: 'intermediate' },
                  { id: 'n5', label: 'JndiLookup.lookup()', type: 'vulnerable' }
                ],
                edges: [
                  { source: 'n1', target: 'n2' },
                  { source: 'n2', target: 'n3' },
                  { source: 'n3', target: 'n4' },
                  { source: 'n4', target: 'n5' }
                ]
              }
            }
          },
          {
            id: 'art-003',
            repository: 'spring-beans',
            commit: 'a2d8e1f',
            status: 'Failed',
            cves: ['CVE-2022-22965'],
            durationMs: 38500,
            createdAt: '2025-11-26T16:45:00Z',
            artifactJson: {
              localization: {
                className: 'org.springframework.beans.CachedIntrospectionResults',
                method: 'getPropertyDescriptor',
                line: 289
              },
              evidence: {
                executionTrace: [
                  'DataBinder.bind(PropertyValues)',
                  'BeanWrapperImpl.setPropertyValues(PropertyValues)',
                  'CachedIntrospectionResults.getPropertyDescriptor(String)'
                ],
                coverage: 45.2,
                exploitSuccess: false,
                failureReason: 'Timeout reached before exploitation path found'
              },
              callGraph: {
                nodes: [
                  { id: 'n1', label: 'Controller.handleRequest()', type: 'entry' },
                  { id: 'n2', label: 'DataBinder.bind()', type: 'intermediate' },
                  { id: 'n3', label: 'BeanWrapperImpl.setPropertyValues()', type: 'intermediate' },
                  { id: 'n4', label: 'CachedIntrospectionResults.getPropertyDescriptor()', type: 'vulnerable' }
                ],
                edges: [
                  { source: 'n1', target: 'n2' },
                  { source: 'n2', target: 'n3' },
                  { source: 'n3', target: 'n4' }
                ]
              }
            }
          }
        ]
        this.artifacts = demoArtifacts
      }
    }
  },
  
  persist: {
    key: 'vulnshield-artifacts',
    storage: localStorage
  }
})
