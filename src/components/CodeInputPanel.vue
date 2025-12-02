<template>
  <div class="code-input-panel">
    <div class="input-mode-tabs">
      <button 
        :class="['tab', { active: inputMode === 'json' }]"
        @click="inputMode = 'json'"
      >
        JSON Input
      </button>
      <button 
        :class="['tab', { active: inputMode === 'form' }]"
        @click="inputMode = 'form'"
      >
        Form Input
      </button>
      <button 
        :class="['tab', { active: inputMode === 'upload' }]"
        @click="inputMode = 'upload'"
      >
        Upload File
      </button>
    </div>

    <div v-if="inputMode === 'json'" class="json-input">
      <label for="json-textarea" class="input-label">Paste JSON Configuration</label>
      <textarea
        id="json-textarea"
        v-model="jsonInput"
        class="json-textarea"
        placeholder='{"repository": "example-repo", "commit": "a1b2c3d", ...}'
        rows="12"
      ></textarea>
      <div v-if="jsonError" class="error-message">{{ jsonError }}</div>
    </div>

    <div v-if="inputMode === 'form'" class="form-input">
      <div class="form-group">
        <label for="repository" class="input-label">Repository Name *</label>
        <input 
          id="repository"
          v-model="formData.repository" 
          type="text" 
          class="form-control"
          placeholder="example-repo"
        />
      </div>
      
      <div class="form-group">
        <label for="commit" class="input-label">Commit Hash *</label>
        <input 
          id="commit"
          v-model="formData.commit" 
          type="text" 
          class="form-control"
          placeholder="a1b2c3d"
        />
      </div>
      
      <div class="form-group">
        <label for="targetCVE" class="input-label">Target CVE</label>
        <input 
          id="targetCVE"
          v-model="formData.targetCVE" 
          type="text" 
          class="form-control"
          placeholder="CVE-2024-XXXX"
        />
      </div>
      
      <div class="form-group">
        <label for="timeout" class="input-label">Timeout (seconds)</label>
        <input 
          id="timeout"
          v-model.number="formData.timeoutSeconds" 
          type="number" 
          class="form-control"
          min="30"
          max="600"
        />
      </div>
      
      <div class="form-group">
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            v-model="formData.enableExploitGen"
          />
          <span>Enable Exploit Generation</span>
        </label>
      </div>
      
      <div class="form-group">
        <label for="code-content" class="input-label">Java Code</label>
        <textarea
          id="code-content"
          v-model="formData.codeContent"
          class="form-control code-textarea"
          placeholder="public class App { ... }"
          rows="6"
        ></textarea>
      </div>
    </div>

    <div v-if="inputMode === 'upload'" class="upload-input">
      <label class="input-label">Upload JSON File</label>
      <div 
        class="upload-area"
        :class="{ 'drag-over': isDragging }"
        @dragover.prevent="isDragging = true"
        @dragleave="isDragging = false"
        @drop.prevent="handleFileDrop"
      >
        <input 
          type="file" 
          ref="fileInput"
          accept=".json"
          @change="handleFileSelect"
          class="file-input"
        />
        <div class="upload-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <p>Drag & drop JSON file here or click to browse</p>
        </div>
      </div>
      <div v-if="uploadedFile" class="uploaded-file">
        <span>{{ uploadedFile.name }}</span>
        <button @click="clearUploadedFile" class="clear-btn">&times;</button>
      </div>
    </div>

    <div class="sample-json">
      <button @click="loadSampleJson" class="btn btn-secondary btn-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
        Load Sample JSON
      </button>
    </div>

    <button 
      @click="handleRun" 
      :disabled="disabled || !isValid"
      class="btn btn-primary run-btn"
    >
      <svg v-if="!disabled" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
      <span v-else class="spinner"></span>
      {{ disabled ? 'Running Analysis...' : 'Run Analysis' }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['run'])

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const inputMode = ref('json')
const jsonInput = ref('')
const jsonError = ref('')
const isDragging = ref(false)
const uploadedFile = ref(null)
const fileInput = ref(null)

const formData = ref({
  repository: '',
  commit: '',
  targetCVE: '',
  timeoutSeconds: 120,
  enableExploitGen: true,
  codeContent: ''
})

const sampleJson = {
  repository: "example-repo",
  commit: "a1b2c3d",
  files: [
    {
      path: "src/com/example/App.java",
      content: "public class App { public static void main(String[] args){ System.out.println(\"hi\"); } }"
    }
  ],
  scanOptions: {
    targetCVE: "CVE-2024-XXXX",
    timeoutSeconds: 120,
    enableExploitGen: true
  }
}

const isValid = computed(() => {
  if (inputMode.value === 'json') {
    try {
      const parsed = JSON.parse(jsonInput.value)
      return parsed.repository && parsed.commit
    } catch {
      return false
    }
  } else if (inputMode.value === 'form') {
    return formData.value.repository && formData.value.commit
  } else if (inputMode.value === 'upload') {
    return uploadedFile.value !== null
  }
  return false
})

function loadSampleJson() {
  jsonInput.value = JSON.stringify(sampleJson, null, 2)
  jsonError.value = ''
  inputMode.value = 'json'
}

function validateJson(input) {
  try {
    const parsed = JSON.parse(input)
    if (!parsed.repository) {
      return { valid: false, error: 'Missing required field: repository' }
    }
    if (!parsed.commit) {
      return { valid: false, error: 'Missing required field: commit' }
    }
    return { valid: true, data: parsed }
  } catch (e) {
    return { valid: false, error: 'Invalid JSON: ' + e.message }
  }
}

function handleRun() {
  let inputData = null
  
  if (inputMode.value === 'json') {
    const result = validateJson(jsonInput.value)
    if (!result.valid) {
      jsonError.value = result.error
      return
    }
    jsonError.value = ''
    inputData = result.data
  } else if (inputMode.value === 'form') {
    inputData = {
      repository: formData.value.repository,
      commit: formData.value.commit,
      files: formData.value.codeContent ? [{
        path: `src/com/example/${formData.value.repository.replace(/[^a-zA-Z]/g, '')}.java`,
        content: formData.value.codeContent
      }] : [],
      scanOptions: {
        targetCVE: formData.value.targetCVE || null,
        timeoutSeconds: formData.value.timeoutSeconds,
        enableExploitGen: formData.value.enableExploitGen
      }
    }
  } else if (inputMode.value === 'upload' && uploadedFile.value) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = validateJson(e.target.result)
      if (result.valid) {
        emit('run', result.data)
      } else {
        jsonError.value = result.error
      }
    }
    reader.readAsText(uploadedFile.value)
    return
  }
  
  if (inputData) {
    emit('run', inputData)
  }
}

function handleFileSelect(event) {
  const file = event.target.files[0]
  if (file) {
    uploadedFile.value = file
  }
}

function handleFileDrop(event) {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type === 'application/json') {
    uploadedFile.value = file
  }
}

function clearUploadedFile() {
  uploadedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<style scoped>
.code-input-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-mode-tabs {
  display: flex;
  background: var(--bg-input);
  border-radius: 0.5rem;
  padding: 0.25rem;
}

.tab {
  flex: 1;
  padding: 0.5rem;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.tab.active {
  background: var(--bg-card);
  color: var(--primary);
}

.tab:hover:not(.active) {
  color: var(--text-primary);
}

.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.json-textarea {
  width: 100%;
  padding: 1rem;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  color: var(--text-primary);
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.8125rem;
  resize: vertical;
  min-height: 200px;
}

.json-textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.error-message {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 0.25rem;
  color: var(--error);
  font-size: 0.8125rem;
}

.form-input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-control {
  padding: 0.75rem;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary);
}

.code-textarea {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.8125rem;
  min-height: 120px;
  resize: vertical;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.checkbox-label input {
  width: 18px;
  height: 18px;
  accent-color: var(--primary);
}

.upload-area {
  position: relative;
  border: 2px dashed var(--border);
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s ease;
}

.upload-area.drag-over {
  border-color: var(--primary);
  background: rgba(14, 165, 233, 0.05);
}

.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--text-secondary);
}

.upload-content svg {
  color: var(--primary);
}

.upload-content p {
  font-size: 0.875rem;
}

.uploaded-file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: var(--bg-input);
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.uploaded-file span {
  font-size: 0.875rem;
  color: var(--text-primary);
}

.clear-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 1.25rem;
  line-height: 1;
  padding: 0.25rem;
  cursor: pointer;
}

.clear-btn:hover {
  color: var(--error);
}

.sample-json {
  text-align: center;
}

.run-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
}
</style>
