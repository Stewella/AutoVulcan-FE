const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const generateId = () => Math.random().toString(36).substring(2, 9)

const mockJobs = new Map()
const mockArtifacts = new Map()

export const api = {
  async runScan(inputData) {
    await delay(500)
    
    const jobId = `job-${generateId()}`
    const artifactId = `art-${generateId()}`
    
    mockJobs.set(jobId, {
      id: jobId,
      artifactId,
      status: 'running',
      inputData,
      startTime: Date.now(),
      progress: 0
    })
    
    simulateJobProgress(jobId, inputData)
    
    return {
      jobId,
      status: 'running'
    }
  },
  
  async getJobStatus(jobId) {
    await delay(200)
    
    const job = mockJobs.get(jobId)
    if (!job) {
      throw new Error(`Job ${jobId} not found`)
    }
    
    return {
      jobId: job.id,
      status: job.status,
      progress: job.progress,
      duration: Date.now() - job.startTime,
      artifactId: job.status === 'success' || job.status === 'failed' ? job.artifactId : null,
      cves: job.cves || [],
      error: job.error
    }
  },
  
  async getArtifact(artifactId) {
    await delay(300)
    
    const artifact = mockArtifacts.get(artifactId)
    if (!artifact) {
      throw new Error(`Artifact ${artifactId} not found`)
    }
    
    return artifact
  }
}

async function simulateJobProgress(jobId, inputData) {
  const job = mockJobs.get(jobId)
  if (!job) return
  
  const steps = [
    { progress: 10, delay: 800, status: 'running' },
    { progress: 25, delay: 1200, status: 'running' },
    { progress: 50, delay: 1500, status: 'running' },
    { progress: 75, delay: 1000, status: 'running' },
    { progress: 90, delay: 800, status: 'running' },
    { progress: 100, delay: 500, status: 'finalizing' }
  ]
  
  for (const step of steps) {
    await delay(step.delay)
    job.progress = step.progress
    job.status = step.status
  }
  
  const success = Math.random() > 0.15
  
  if (success) {
    job.status = 'success'
    job.cves = generateMockCVEs(inputData)
    
    const artifact = generateMockArtifact(job.artifactId, inputData, job)
    mockArtifacts.set(job.artifactId, artifact)
    
    job.artifact = artifact
  } else {
    job.status = 'failed'
    job.error = 'Timeout reached: unable to find exploitation path within time limit'
  }
}

function generateMockCVEs(inputData) {
  const targetCVE = inputData.scanOptions?.targetCVE
  if (targetCVE && targetCVE !== 'CVE-2024-XXXX') {
    return [targetCVE]
  }
  
  const mockCVEs = [
    'CVE-2024-1234',
    'CVE-2024-5678',
    'CVE-2023-9012',
    'CVE-2023-3456'
  ]
  
  const count = Math.floor(Math.random() * 3) + 1
  return mockCVEs.slice(0, count)
}

function generateMockArtifact(artifactId, inputData, job) {
  const files = inputData.files || []
  const mainFile = files[0] || { path: 'src/Main.java', content: '' }
  
  const classMatch = mainFile.content.match(/class\s+(\w+)/)
  const className = classMatch ? classMatch[1] : 'UnknownClass'
  
  return {
    id: artifactId,
    repository: inputData.repository,
    commit: inputData.commit,
    status: 'Success',
    cves: job.cves,
    durationMs: Date.now() - job.startTime,
    createdAt: new Date().toISOString(),
    artifactJson: {
      localization: {
        className: `com.example.${className}`,
        method: 'processInput',
        line: Math.floor(Math.random() * 100) + 10
      },
      evidence: {
        executionTrace: [
          `${className}.main(String[])`,
          `${className}.initialize()`,
          `${className}.processInput(Object)`,
          `VulnerableLib.execute(String)`
        ],
        coverage: Math.round((70 + Math.random() * 25) * 10) / 10,
        exploitSuccess: true
      },
      callGraph: {
        nodes: [
          { id: 'n1', label: `${className}.main()`, type: 'entry' },
          { id: 'n2', label: `${className}.initialize()`, type: 'intermediate' },
          { id: 'n3', label: `${className}.processInput()`, type: 'intermediate' },
          { id: 'n4', label: 'VulnerableLib.execute()', type: 'vulnerable' }
        ],
        edges: [
          { source: 'n1', target: 'n2' },
          { source: 'n2', target: 'n3' },
          { source: 'n3', target: 'n4' }
        ]
      }
    }
  }
}

export default api
