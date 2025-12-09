const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const generateId = () => Math.random().toString(36).substring(2, 9)

const mockJobs = new Map()
const mockArtifacts = new Map()

const JOB_PROGRESS_STEPS = [
  { progress: 10, delay: 800, status: 'running' },
  { progress: 25, delay: 1200, status: 'running' },
  { progress: 50, delay: 1500, status: 'running' },
  { progress: 75, delay: 1000, status: 'running' },
  { progress: 90, delay: 800, status: 'running' },
  { progress: 100, delay: 500, status: 'finalizing' }
]

async function runScan(inputData) {
  await delay(500)
  const jobId = `job-${generateId()}`
  const artifactId = `art-${generateId()}`
  const job = {
    id: jobId,
    artifactId,
    status: 'running',
    inputData,
    startTime: Date.now(),
    progress: 0
  }
  mockJobs.set(jobId, job)
  simulateJobProgress(jobId, inputData)
  return { jobId, status: 'running' }
}

async function getJobStatus(jobId) {
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
}

async function getArtifact(artifactId) {
  await delay(300)
  const artifact = mockArtifacts.get(artifactId)
  if (!artifact) {
    throw new Error(`Artifact ${artifactId} not found`)
  }
  return artifact
}

export const api = { runScan, getJobStatus, getArtifact }

async function simulateJobProgress(jobId, inputData) {
  const job = mockJobs.get(jobId)
  if (!job) return
  for (const step of JOB_PROGRESS_STEPS) {
    await delay(step.delay)
    job.progress = step.progress
    job.status = step.status
  }
  const success = Math.random() > 0.15
  if (success) {
    job.status = 'success'
    job.cves = generateCVEs(inputData)
    const artifact = buildArtifact(job.artifactId, inputData, job)
    mockArtifacts.set(job.artifactId, artifact)
    job.artifact = artifact
  } else {
    job.status = 'failed'
    job.error = 'Timeout reached: unable to find exploitation path within time limit'
  }
}

function generateCVEs(inputData) {
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

function buildArtifact(artifactId, inputData, job) {
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
function joinUrl(base, path) {
  if (typeof base !== 'string' || !base) {
    throw new Error('API_BASE_URL is not set')
  }
  const b = base.endsWith('/') ? base.slice(0, -1) : base
  const p = path.startsWith('/') ? path : '/' + path
  return b + p
}
const endpoints = { register: '/api/v1/auth/register', token: '/api/v1/auth/token', submitRepo: '/api/v1/analysis/submit/repo', submitZip: '/api/v1/analysis/submit/zip', graph: '/api/v1/analysis/graph' }

export async function registerUser(fields) {
  const form = new FormData()
  form.append('full_name', fields.full_name)
  form.append('email', fields.email)
  form.append('password', fields.password)
  form.append('confirm_password', fields.confirm_password)
  const res = await fetch(joinUrl(API_BASE_URL, endpoints.register), {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: form
  })
  let data = null
  try { data = await res.json() } catch (_) {}
  return { ok: res.ok, status: res.status, data }
}

let authToken = null
let authTokenType = 'bearer'

export function setAuthToken(token, type = 'bearer') {
  authToken = token
  authTokenType = type || 'bearer'
}

export function getAuthHeaders() {
  return authToken ? { Authorization: `Bearer ${authToken}` } : {}
}

export async function loginUser({ email, password }) {
  const body = new URLSearchParams()
  body.set('email', email)
  body.set('password', password)
  const res = await fetch(joinUrl(API_BASE_URL, endpoints.token), {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body
  })
  let data = null
  try { data = await res.json() } catch (_) {}
  return { ok: res.ok, status: res.status, data }
}

export async function submitRepoAnalysis({ repository_url, target_cve, target_method, target_line, timeout_seconds }) {
  console.log('submitRepoAnalysis', { repository_url, target_cve, target_method, target_line, timeout_seconds })
  const form = new FormData()
  if (repository_url != null) form.append('repository_url', repository_url)
  if (target_cve != null) form.append('target_cve', target_cve)
  if (target_method != null) form.append('target_method', target_method)
  if (target_line != null) form.append('target_line', String(target_line))
  if (timeout_seconds != null) form.append('timeout_seconds', String(timeout_seconds))
  try {
    const res = await fetch(joinUrl(API_BASE_URL, endpoints.submitRepo), {
      method: 'POST',
      headers: { Accept: 'application/json', ...getAuthHeaders() },
      body: form
    })
    let data = null
    try { data = await res.json() } catch (e) { console.error('submitRepoAnalysis parse', e) }
    console.log('submitRepoAnalysis', { ok: res.ok, status: res.status, data })
    return { ok: res.ok, status: res.status, data }
  } catch (e) {
    console.error('submitRepoAnalysis fetch', e)
    const result = { ok: false, status: 0, data: null }
    console.log('submitRepoAnalysis', result)
    return result
  }
}

export async function submitZipAnalysis({ file, target_cve, target_method, target_line, timeout_seconds }) {
  const form = new FormData()
  if (file) form.append('file', file)
  if (target_cve != null) form.append('target_cve', target_cve)
  if (target_method != null) form.append('target_method', target_method)
  if (target_line != null) form.append('target_line', String(target_line))
  if (timeout_seconds != null) form.append('timeout_seconds', String(timeout_seconds))
  try {
    const res = await fetch(joinUrl(API_BASE_URL, endpoints.submitZip), {
      method: 'POST',
      headers: { Accept: 'application/json', ...getAuthHeaders() },
      body: form
    })
    let data = null
    try { data = await res.json() } catch (_) {}
    return { ok: res.ok, status: res.status, data }
  } catch (_) {
    return { ok: false, status: 0, data: null }
  }
}

export async function getExecutionGraph(executionId) {
  const url = joinUrl(API_BASE_URL, endpoints.graph) + `?execution_id=${encodeURIComponent(executionId)}`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  let data = null
  try { data = await res.json() } catch (_) {}
  return { ok: res.ok, status: res.status, data }
}

export async function getUserExecutions(userId) {
  const url = joinUrl(API_BASE_URL, `/api/v1/analysis/status/user/${encodeURIComponent(userId)}/executions`)
  const res = await fetch(url, { headers: { Accept: 'application/json', ...getAuthHeaders() } })
  let data = null
  try { data = await res.json() } catch (_) {}
  return { ok: res.ok, status: res.status, data }
}

export async function getMyExecutions() {
  const url = joinUrl(API_BASE_URL, '/api/v1/analysis/status/user/executions')
  const res = await fetch(url, { headers: { Accept: 'application/json', ...getAuthHeaders() } })
  let data = null
  try { data = await res.json() } catch (_) {}
  return { ok: res.ok, status: res.status, data }
}

export async function getExecutionProgress(executionId) {
  const url = joinUrl(API_BASE_URL, `/api/v1/analysis/status/${encodeURIComponent(executionId)}/progress`)
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  let data = null
  try { data = await res.json() } catch (_) {}
  return { ok: res.ok, status: res.status, data }
}

export default api
