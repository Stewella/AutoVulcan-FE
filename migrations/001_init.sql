-- VulnShield Labs - Auto-Vulcan Database Schema
-- Migration: 001_init.sql
-- Description: Initial schema for artifact storage and repository management

-- Repositories table
CREATE TABLE repositories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Artifacts table for storing scan results
CREATE TABLE artifacts (
  id SERIAL PRIMARY KEY,
  repository_id INT REFERENCES repositories(id) ON DELETE CASCADE,
  commit_hash TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Running', 'Success', 'Failed')),
  cves TEXT[],                    -- Array of CVE identifiers
  duration_ms INT,                -- Execution duration in milliseconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  artifact_json JSONB             -- Full artifact data including localization, evidence, call graph
);

-- Index for efficient querying by creation time (most recent first)
CREATE INDEX idx_artifacts_created_at ON artifacts(created_at DESC);

-- Index for efficient status filtering
CREATE INDEX idx_artifacts_status ON artifacts(status);

-- Index for repository lookup
CREATE INDEX idx_artifacts_repository_id ON artifacts(repository_id);

-- Composite index for common query patterns
CREATE INDEX idx_artifacts_repo_status ON artifacts(repository_id, status);

-- Jobs table for tracking running analyses
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  job_id TEXT NOT NULL UNIQUE,
  artifact_id INT REFERENCES artifacts(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'success', 'failed', 'cancelled')),
  progress INT DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  error_message TEXT,
  input_json JSONB,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Index for job status queries
CREATE INDEX idx_jobs_status ON jobs(status);

-- Index for job lookup by job_id
CREATE INDEX idx_jobs_job_id ON jobs(job_id);

-- ============================================
-- SAMPLE SEED DATA
-- ============================================

-- Insert sample repositories
INSERT INTO repositories (name, description) VALUES
  ('commons-collections', 'Apache Commons Collections library'),
  ('log4j-core', 'Apache Log4j 2 Core'),
  ('spring-beans', 'Spring Framework Beans module');

-- Insert sample artifacts
INSERT INTO artifacts (repository_id, commit_hash, status, cves, duration_ms, artifact_json) VALUES
(
  1, -- commons-collections
  'e585cd0',
  'Success',
  ARRAY['CVE-2015-6420', 'CVE-2015-7501'],
  45230,
  '{
    "localization": {
      "className": "org.apache.commons.collections.functors.InvokerTransformer",
      "method": "transform",
      "line": 125
    },
    "evidence": {
      "executionTrace": [
        "InvokerTransformer.transform(Object)",
        "ChainedTransformer.transform(Object)",
        "LazyMap.get(Object)",
        "AnnotationInvocationHandler.invoke(Object, Method, Object[])"
      ],
      "coverage": 87.5,
      "exploitSuccess": true
    },
    "callGraph": {
      "nodes": [
        {"id": "n1", "label": "Main.main()", "type": "entry"},
        {"id": "n2", "label": "LazyMap.get()", "type": "intermediate"},
        {"id": "n3", "label": "ChainedTransformer.transform()", "type": "intermediate"},
        {"id": "n4", "label": "InvokerTransformer.transform()", "type": "vulnerable"}
      ],
      "edges": [
        {"source": "n1", "target": "n2"},
        {"source": "n2", "target": "n3"},
        {"source": "n3", "target": "n4"}
      ]
    }
  }'::jsonb
),
(
  2, -- log4j-core
  '3b9fca8',
  'Success',
  ARRAY['CVE-2021-44228', 'CVE-2021-45046', 'CVE-2021-45105'],
  62400,
  '{
    "localization": {
      "className": "org.apache.logging.log4j.core.lookup.JndiLookup",
      "method": "lookup",
      "line": 56
    },
    "evidence": {
      "executionTrace": [
        "JndiLookup.lookup(LogEvent, String)",
        "Interpolator.lookup(LogEvent, String)",
        "StrSubstitutor.resolveVariable(LogEvent, String, StringBuilder, int, int)",
        "MessagePatternConverter.format(LogEvent, StringBuilder)"
      ],
      "coverage": 92.3,
      "exploitSuccess": true
    },
    "callGraph": {
      "nodes": [
        {"id": "n1", "label": "Logger.error()", "type": "entry"},
        {"id": "n2", "label": "MessagePatternConverter.format()", "type": "intermediate"},
        {"id": "n3", "label": "StrSubstitutor.replace()", "type": "intermediate"},
        {"id": "n4", "label": "Interpolator.lookup()", "type": "intermediate"},
        {"id": "n5", "label": "JndiLookup.lookup()", "type": "vulnerable"}
      ],
      "edges": [
        {"source": "n1", "target": "n2"},
        {"source": "n2", "target": "n3"},
        {"source": "n3", "target": "n4"},
        {"source": "n4", "target": "n5"}
      ]
    }
  }'::jsonb
),
(
  3, -- spring-beans
  'a2d8e1f',
  'Failed',
  ARRAY['CVE-2022-22965'],
  38500,
  '{
    "localization": {
      "className": "org.springframework.beans.CachedIntrospectionResults",
      "method": "getPropertyDescriptor",
      "line": 289
    },
    "evidence": {
      "executionTrace": [
        "DataBinder.bind(PropertyValues)",
        "BeanWrapperImpl.setPropertyValues(PropertyValues)",
        "CachedIntrospectionResults.getPropertyDescriptor(String)"
      ],
      "coverage": 45.2,
      "exploitSuccess": false,
      "failureReason": "Timeout reached before exploitation path found"
    },
    "callGraph": {
      "nodes": [
        {"id": "n1", "label": "Controller.handleRequest()", "type": "entry"},
        {"id": "n2", "label": "DataBinder.bind()", "type": "intermediate"},
        {"id": "n3", "label": "BeanWrapperImpl.setPropertyValues()", "type": "intermediate"},
        {"id": "n4", "label": "CachedIntrospectionResults.getPropertyDescriptor()", "type": "vulnerable"}
      ],
      "edges": [
        {"source": "n1", "target": "n2"},
        {"source": "n2", "target": "n3"},
        {"source": "n3", "target": "n4"}
      ]
    }
  }'::jsonb
);

-- ============================================
-- USEFUL QUERIES (for reference)
-- ============================================

-- Get all artifacts with repository names
-- SELECT a.*, r.name as repository_name
-- FROM artifacts a
-- JOIN repositories r ON a.repository_id = r.id
-- ORDER BY a.created_at DESC;

-- Get vulnerability localization for an artifact
-- SELECT artifact_json->'localization' as localization
-- FROM artifacts
-- WHERE id = 1;

-- Get all successful exploits
-- SELECT * FROM artifacts
-- WHERE status = 'Success'
-- AND (artifact_json->'evidence'->>'exploitSuccess')::boolean = true;
