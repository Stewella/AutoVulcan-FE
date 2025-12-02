# VulnShield Labs - Auto-Vulcan

Automated Vulnerability Mining for a Safer Digital Future

## Overview

Auto-Vulcan is the flagship platform from VulnShield Labs for automated vulnerability mining. Using SIEGE (Simulated Exploit & Guided Emulation) technology, it detects, validates, and helps mitigate security vulnerabilities in Java applications, especially those using Open-Source Software (OSS) components.

## Features

- **Vulnerability Localization** - Pinpoints exact class, method, and line of vulnerabilities from CVE databases
- **Call Graph & Control Flow Graph** - Builds comprehensive graphs to map reachable paths
- **Exploit Generation** - Uses genetic algorithms to automatically find exploitation scenarios
- **Execution & Validation** - Runs exploits in controlled sandbox environments
- **Evidence Reporting** - Provides execution traces, coverage metrics, and proof of exploitation

## Tech Stack

- **Frontend**: Vue 3 + Vite
- **Routing**: Vue Router 4
- **State Management**: Pinia with localStorage persistence
- **Styling**: Custom CSS with CSS variables
- **Database**: PostgreSQL (schema provided)

## Project Structure

```
Code/
├── src/
│   ├── assets/          # CSS styles
│   ├── components/      # Vue components
│   │   ├── TeamCard.vue
│   │   ├── CodeInputPanel.vue
│   │   ├── ArtifactTable.vue
│   │   ├── ArtifactDetailModal.vue
│   │   └── CallGraphModal.vue
│   ├── views/           # Page components
│   │   ├── Landing.vue
│   │   ├── Dashboard.vue
│   │   └── Features.vue
│   ├── router/          # Vue Router config
│   ├── store/           # Pinia stores
│   ├── services/        # API services (mock)
│   ├── App.vue
│   └── main.js
├── migrations/          # PostgreSQL migrations
│   └── 001_init.sql
├── docs/
│   └── API.md           # API documentation
├── public/
│   └── favicon.svg
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd Code

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5000`

### Available Routes

- `/` - Landing page with company info and feature overview
- `/dashboard` - Auto-Vulcan dashboard for running scans
- `/features` - Detailed feature documentation

## Running a Scan

1. Navigate to the Dashboard (`/dashboard`)
2. Choose input method:
   - **JSON Input**: Paste full configuration JSON
   - **Form Input**: Fill in individual fields
   - **Upload**: Upload a JSON configuration file
3. Click "Run Analysis" to start the simulated scan
4. View results in the Artifact History table
5. Click "View" to see detailed vulnerability information
6. Click "Graph" to visualize the call graph

### Sample Input JSON

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

## Database Setup

The application includes PostgreSQL schema for backend integration. To set up the database:

```bash
# Create database
createdb vulnshield

# Run migrations
psql -d vulnshield -f migrations/001_init.sql
```

See `migrations/001_init.sql` for the complete schema including:
- `repositories` - Repository metadata
- `artifacts` - Scan results and evidence
- `jobs` - Running job tracking

## API Documentation

See `docs/API.md` for the complete API contract including:

- `POST /api/run-scan` - Start a vulnerability scan
- `GET /api/job/{jobId}` - Check job status
- `GET /api/artifact/{artifactId}` - Get artifact details
- `GET /api/artifacts` - List all artifacts

## Connecting a Real Backend

The frontend uses mock API handlers in `src/services/api.js`. To connect a real backend:

1. Implement the API endpoints described in `docs/API.md`
2. Update `src/services/api.js` to call your backend:

```javascript
// Replace mock implementation
export const api = {
  async runScan(inputData) {
    const response = await fetch('/api/run-scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputData)
    });
    return response.json();
  },
  
  async getJobStatus(jobId) {
    const response = await fetch(`/api/job/${jobId}`);
    return response.json();
  },
  
  async getArtifact(artifactId) {
    const response = await fetch(`/api/artifact/${artifactId}`);
    return response.json();
  }
};
```

3. Configure CORS on your backend for the frontend origin

## Development Team

- **Marcel Suandi Tambing** - Team Leader & Frontend
- **Steffany Harwella** - Data Scientist & Core
- **Marde Fasma'ul Aza** - Full-stack Engineer (Backend)

## Build for Production

```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` directory.

## Docker (Production)

You can build a production Docker image using the multi-stage Dockerfile included in this repo.

1. Build the Docker image (run this in the repo root):

```bash
docker build -t autovulcan-fe:latest .
```

2. Run the container and publish port 80 on the container to port 8080 on the host:

```bash
docker run -d -p 8080:80 --name autovulcan-fe autovulcan-fe:latest
```

3. Open http://localhost:8080 in your browser to view the app.

This image uses a multi-stage build to generate optimized static assets with Node/Vite and serves them with Nginx.

### Using docker-compose (production)

If you prefer docker-compose, there's a `docker-compose.yml` included that builds and runs the same production image.

```bash
# Build & start
docker compose up --build -d

# Open http://localhost:8080

# Stop and remove
docker compose down
```

### Development with docker-compose

If you'd like to run the Vite dev server inside Docker (hot-reload), a `docker-compose.dev.yml` is included.

```bash
# Start development container (bind mounts your source)
docker compose -f docker-compose.dev.yml up

# The dev server will be available at http://localhost:5000

# Stop
docker compose -f docker-compose.dev.yml down
```


## License

Proprietary - VulnShield Labs

---

*Auto-Vulcan with SIEGE Technology - Evidence-based validation for a safer digital future*
