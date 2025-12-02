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

## Run with PostgreSQL (docker-compose)

I added a Postgres service to the repository's docker-compose files so you can run the frontend and a local PostgreSQL instance together.

Important notes:
- The project `.env` contains DATABASE_URL="postgresql://seige:secretpassword@localhost:5432/seige_db" — when you run PostgreSQL with docker-compose the proper host for containers is `db`, so the compose setups set DATABASE_URL to `postgresql://seige:secretpassword@db:5432/seige_db`.

Production (build + nginx) example:

```bash
# Build+start the production image + postgres in background
docker compose up --build -d

# The web app: http://localhost:8080
# Postgres port (host): 5432
```

Development (Vite dev server + postgres):

```bash
# Start the dev server and a postgres container
docker compose -f docker-compose.dev.yml up --build

# The dev server: http://localhost:5000
# Postgres port (host): 5432
```

Testing / connecting to the DB (quick checks)

1) Connect from the host using psql (if installed):

```bash
# connect to the local container-published port
psql postgresql://seige:secretpassword@localhost:5432/seige_db
```

2) Or open a psql shell inside the running db container:

```bash
docker compose exec db psql -U seige -d seige_db
```

3) Run the SQL migration bundle from inside the container (if needed):

```bash
docker compose exec -T db psql -U seige -d seige_db -f /workdir/migrations/001_init.sql
```

Note: the migration path above assumes you mount or copy the repo into the container that needs access to it — adjust paths if you run migrations from a different container/service that has your code mounted.


## License

Proprietary - VulnShield Labs

---

*Auto-Vulcan with SIEGE Technology - Evidence-based validation for a safer digital future*
