# Auto-Vulcan API Documentation

This document describes the API contract for the Auto-Vulcan vulnerability mining platform.

## Base URL

- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

## Authentication

Currently, the API does not require authentication. When implementing a backend, consider adding:
- API key authentication
- JWT tokens for user sessions
- OAuth2 for enterprise integrations

---

## Endpoints

### 1. Run Scan

Start a new vulnerability scan analysis.

**Endpoint:** `POST /api/run-scan`

**Request Body:**
```json
{
  "repository": "example-repo",
  "commit": "a1b2c3d",
  "files": [
    {
      "path": "src/com/example/App.java",
      "content": "public class App { public static void main(String[] args){ System.out.println(\"hi\"); } }"
    }
  ],
  "scanOptions": {
    "targetCVE": "CVE-2024-XXXX",
    "timeoutSeconds": 120,
    "enableExploitGen": true
  }
}
```

**Request Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `repository` | string | Yes | Name of the repository being scanned |
| `commit` | string | Yes | Git commit hash or identifier |
| `files` | array | No | Array of file objects to analyze |
| `files[].path` | string | Yes | File path relative to repository root |
| `files[].content` | string | Yes | File content (Java source code) |
| `scanOptions` | object | No | Scan configuration options |
| `scanOptions.targetCVE` | string | No | Specific CVE to target |
| `scanOptions.timeoutSeconds` | number | No | Maximum scan duration (default: 120) |
| `scanOptions.enableExploitGen` | boolean | No | Enable exploit generation (default: true) |

**Response (Success - 200):**
```json
{
  "jobId": "job-abc123",
  "status": "running"
}
```

**Response (Error - 400):**
```json
{
  "error": "Invalid request",
  "message": "Missing required field: repository"
}
```

---

### 2. Get Job Status

Check the status of a running scan job.

**Endpoint:** `GET /api/job/{jobId}`

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `jobId` | string | The job identifier returned from run-scan |

**Response (Running - 200):**
```json
{
  "jobId": "job-abc123",
  "status": "running",
  "progress": 45,
  "duration": 12500
}
```

**Response (Success - 200):**
```json
{
  "jobId": "job-abc123",
  "status": "success",
  "progress": 100,
  "duration": 45230,
  "artifactId": "art-xyz789",
  "cves": ["CVE-2024-1234", "CVE-2024-5678"]
}
```

**Response (Failed - 200):**
```json
{
  "jobId": "job-abc123",
  "status": "failed",
  "progress": 75,
  "duration": 120000,
  "error": "Timeout reached: unable to find exploitation path within time limit"
}
```

**Status Values:**

| Status | Description |
|--------|-------------|
| `pending` | Job is queued but not started |
| `running` | Analysis is in progress |
| `finalizing` | Analysis complete, generating reports |
| `success` | Analysis completed successfully |
| `failed` | Analysis failed or timed out |

---

### 3. Get Artifact Details

Retrieve the full artifact details including vulnerability localization, evidence, and call graph.

**Endpoint:** `GET /api/artifact/{artifactId}`

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `artifactId` | string | The artifact identifier |

**Response (Success - 200):**
```json
{
  "id": "art-xyz789",
  "repository": "example-repo",
  "commit": "a1b2c3d",
  "status": "Success",
  "cves": ["CVE-2024-1234"],
  "durationMs": 45230,
  "createdAt": "2025-11-28T14:30:00Z",
  "artifactJson": {
    "localization": {
      "className": "com.example.VulnerableClass",
      "method": "processInput",
      "line": 42
    },
    "evidence": {
      "executionTrace": [
        "App.main(String[])",
        "VulnerableClass.initialize()",
        "VulnerableClass.processInput(Object)",
        "UnsafeLib.execute(String)"
      ],
      "coverage": 87.5,
      "exploitSuccess": true
    },
    "callGraph": {
      "nodes": [
        { "id": "n1", "label": "App.main()", "type": "entry" },
        { "id": "n2", "label": "VulnerableClass.initialize()", "type": "intermediate" },
        { "id": "n3", "label": "VulnerableClass.processInput()", "type": "intermediate" },
        { "id": "n4", "label": "UnsafeLib.execute()", "type": "vulnerable" }
      ],
      "edges": [
        { "source": "n1", "target": "n2" },
        { "source": "n2", "target": "n3" },
        { "source": "n3", "target": "n4" }
      ]
    }
  },
  "downloadUrl": "/api/artifact/art-xyz789/download"
}
```

**Response (Not Found - 404):**
```json
{
  "error": "Not found",
  "message": "Artifact art-xyz789 not found"
}
```

---

### 4. Download Artifact Bundle

Download the complete artifact as a JSON file.

**Endpoint:** `GET /api/artifact/{artifactId}/download`

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `artifactId` | string | The artifact identifier |

**Response Headers:**
```
Content-Type: application/json
Content-Disposition: attachment; filename="artifact-art-xyz789.json"
```

**Response Body:** Full artifact JSON (same as GET /api/artifact/{artifactId})

---

### 5. List Artifacts

Retrieve a paginated list of artifacts with optional filtering.

**Endpoint:** `GET /api/artifacts`

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Items per page (max: 100) |
| `status` | string | - | Filter by status (Success/Failed/Running) |
| `repository` | string | - | Filter by repository name |
| `sort` | string | createdAt | Sort field |
| `order` | string | desc | Sort order (asc/desc) |

**Response (Success - 200):**
```json
{
  "data": [
    {
      "id": "art-xyz789",
      "repository": "example-repo",
      "commit": "a1b2c3d",
      "status": "Success",
      "cves": ["CVE-2024-1234"],
      "durationMs": 45230,
      "createdAt": "2025-11-28T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

---

## Data Models

### Artifact

```typescript
interface Artifact {
  id: string;
  repository: string;
  commit: string;
  status: 'Running' | 'Success' | 'Failed';
  cves: string[];
  durationMs: number;
  createdAt: string; // ISO 8601 timestamp
  artifactJson: {
    localization: Localization;
    evidence: Evidence;
    callGraph: CallGraph;
  };
}
```

### Localization

```typescript
interface Localization {
  className: string;  // Full class name including package
  method: string;     // Method name where vulnerability exists
  line: number;       // Line number of vulnerable code
}
```

### Evidence

```typescript
interface Evidence {
  executionTrace: string[];  // Array of method calls in execution order
  coverage: number;          // Code coverage percentage (0-100)
  exploitSuccess: boolean;   // Whether exploit reached vulnerable code
  failureReason?: string;    // Reason for failure (if exploitSuccess is false)
}
```

### CallGraph

```typescript
interface CallGraph {
  nodes: CallGraphNode[];
  edges: CallGraphEdge[];
}

interface CallGraphNode {
  id: string;
  label: string;                              // Method signature
  type: 'entry' | 'intermediate' | 'vulnerable';
}

interface CallGraphEdge {
  source: string;  // Node ID
  target: string;  // Node ID
}
```

---

## Error Handling

All endpoints return errors in a consistent format:

```json
{
  "error": "Error Type",
  "message": "Human-readable error message",
  "details": {} // Optional additional details
}
```

**HTTP Status Codes:**

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |
| 503 | Service Unavailable - Backend overloaded |

---

## Rate Limiting

When implementing the backend, consider these rate limits:

- `POST /api/run-scan`: 10 requests per minute per IP
- `GET` endpoints: 100 requests per minute per IP

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1635724800
```

---

## Backend Implementation Notes

When implementing a real backend:

1. **Job Queue**: Use a message queue (Redis, RabbitMQ) for scan jobs
2. **Worker Service**: Separate worker processes for running EvoSuite/Soot analysis
3. **Database**: Use PostgreSQL with the provided schema (see migrations/001_init.sql)
4. **File Storage**: Store large artifacts in object storage (S3, GCS)
5. **WebSocket**: Consider WebSocket for real-time job status updates
6. **Caching**: Cache artifact results for frequently accessed items

---

## Example Usage

### JavaScript/Fetch

```javascript
// Start a scan
const response = await fetch('/api/run-scan', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    repository: 'my-app',
    commit: 'abc123',
    files: [{ path: 'App.java', content: '...' }],
    scanOptions: { enableExploitGen: true }
  })
});

const { jobId } = await response.json();

// Poll for status
const pollStatus = async () => {
  const status = await fetch(`/api/job/${jobId}`).then(r => r.json());
  if (status.status === 'running') {
    setTimeout(pollStatus, 1000);
  } else {
    console.log('Complete:', status);
  }
};

pollStatus();
```

### cURL

```bash
# Start a scan
curl -X POST http://localhost:5000/api/run-scan \
  -H "Content-Type: application/json" \
  -d '{"repository":"test","commit":"abc123"}'

# Check job status
curl http://localhost:5000/api/job/job-abc123

# Get artifact details
curl http://localhost:5000/api/artifact/art-xyz789
```
