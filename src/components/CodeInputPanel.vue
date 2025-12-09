<template>
  <div class="code-input-panel">
    <div class="input-mode-tabs">

      <button 
        :class="['tab', { active: inputMode === 'form' }]"
        @click="inputMode = 'form'"
      >
        {{ t.codeInput.formInput }}
      </button>
      <button 
        :class="['tab', { active: inputMode === 'upload' }]"
        @click="inputMode = 'upload'"
      >
        {{ t.codeInput.uploadFile }}
      </button>
    </div>



    <div v-if="inputMode === 'form'" class="form-input">
      <div class="form-group">
        <label for="repository" class="input-label">{{ t.codeInput.repositoryName }} *</label>
        <input 
          id="repository"
          v-model="formData.repository" 
          type="text" 
          class="form-control"
          placeholder="example-repo"
        />
      </div>
      
      <div class="form-group">
        <label for="targetCVE" class="input-label">{{ t.codeInput.targetCve }}</label>
        <div class="autocomplete-wrapper">
          <input 
            id="targetCVE"
            v-model="formData.targetCVE" 
            type="text" 
            class="form-control"
            placeholder="CVE-2024-XXXX"
            @focus="showFormCveDropdown = true"
            @input="filterFormCveOptions"
            @blur="hideFormCveDropdownDelayed"
            autocomplete="off"
          />
          <div v-if="showFormCveDropdown && filteredFormCveOptions.length > 0" class="autocomplete-dropdown">
            <div 
              v-for="option in filteredFormCveOptions" 
              :key="option"
              class="autocomplete-option"
              @mousedown.prevent="selectFormCve(option)"
            >
              {{ option }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label for="targetMethod" class="input-label">{{ t.codeInput.targetMethod }}</label>
        <input 
          id="targetMethod"
          v-model="formData.targetMethod" 
          type="text" 
          class="form-control"
          placeholder="com.example.ClassName.methodName"
        />
      </div>
      
      <div class="form-group">
        <label for="targetLine" class="input-label">{{ t.codeInput.targetLine }}</label>
        <input 
          id="targetLine"
          v-model.number="formData.targetLine" 
          type="number" 
          class="form-control"
          min="1"
          placeholder="42"
        />
      </div>
      
      <div class="form-group">
        <label for="timeout" class="input-label">{{ t.codeInput.timeout }}</label>
        <input 
          id="timeout"
          v-model.number="formData.timeoutSeconds" 
          type="number" 
          class="form-control"
          min="30"
          max="600"
        />
      </div>
      
    </div>

    <div v-if="inputMode === 'upload'" class="upload-input">
      <label class="input-label">{{ t.codeInput.uploadZip }}</label>
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
          accept=".zip"
          @change="handleFileSelect"
          class="file-input"
        />
        <div class="upload-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <p>{{ t.codeInput.dragDrop }}</p>
        </div>
      </div>
      <div v-if="uploadedFile" class="uploaded-file">
        <span>{{ uploadedFile.name }}</span>
        <button @click="clearUploadedFile" class="clear-btn">&times;</button>
      </div>
      
      <div class="upload-options">
        <div class="form-group">
          <label for="uploadTargetCVE" class="input-label">{{ t.codeInput.targetCve }}</label>
          <div class="autocomplete-wrapper">
            <input 
              id="uploadTargetCVE"
              v-model="uploadData.targetCVE" 
              type="text" 
              class="form-control"
              placeholder="CVE-2024-XXXX"
              @focus="showUploadCveDropdown = true"
              @input="filterUploadCveOptions"
              @blur="hideUploadCveDropdownDelayed"
              autocomplete="off"
            />
            <div v-if="showUploadCveDropdown && filteredUploadCveOptions.length > 0" class="autocomplete-dropdown">
              <div 
                v-for="option in filteredUploadCveOptions" 
                :key="option"
                class="autocomplete-option"
                @mousedown.prevent="selectUploadCve(option)"
              >
                {{ option }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label for="uploadTargetMethod" class="input-label">{{ t.codeInput.targetMethod }}</label>
          <input 
            id="uploadTargetMethod"
            v-model="uploadData.targetMethod" 
            type="text" 
            class="form-control"
            placeholder="com.example.ClassName.methodName"
          />
        </div>
        
        <div class="form-group">
          <label for="uploadTargetLine" class="input-label">{{ t.codeInput.targetLine }}</label>
          <input 
            id="uploadTargetLine"
            v-model.number="uploadData.targetLine" 
            type="number" 
            class="form-control"
            min="1"
            placeholder="42"
          />
        </div>
        <div class="form-group">
          <label for="uploadTimeout" class="input-label">{{ t.codeInput.timeout }}</label>
          <input 
            id="uploadTimeout"
            v-model.number="uploadData.timeoutSeconds" 
            type="number" 
            class="form-control"
            min="30"
            max="600"
          />
        </div>
      </div>
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
      {{ disabled ? t.codeInput.runningAnalysis : t.codeInput.runAnalysis }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../composables/useI18n'
import { submitRepoAnalysis, submitZipAnalysis } from '../services/api'

const { t } = useI18n()

const emit = defineEmits(['run'])

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const inputMode = ref('form')
const jsonError = ref('')
const isDragging = ref(false)
const uploadedFile = ref(null)
const fileInput = ref(null)

const cveOptions = [
  'CVE-2024-22262',
  'CVE-2024-22243',
  'CVE-2023-34035',
  'CVE-2023-20863',
  'CVE-2022-22965'
]

const showFormCveDropdown = ref(false)
const showUploadCveDropdown = ref(false)
const filteredFormCveOptions = ref([...cveOptions])
const filteredUploadCveOptions = ref([...cveOptions])

function filterFormCveOptions() {
  const query = (formData.value.targetCVE || '').toLowerCase()
  if (!query) {
    filteredFormCveOptions.value = [...cveOptions]
  } else {
    filteredFormCveOptions.value = cveOptions.filter(opt => 
      opt.toLowerCase().includes(query)
    )
  }
}

function filterUploadCveOptions() {
  const query = (uploadData.value.targetCVE || '').toLowerCase()
  if (!query) {
    filteredUploadCveOptions.value = [...cveOptions]
  } else {
    filteredUploadCveOptions.value = cveOptions.filter(opt => 
      opt.toLowerCase().includes(query)
    )
  }
}

function selectFormCve(option) {
  formData.value.targetCVE = option
  showFormCveDropdown.value = false
}

function selectUploadCve(option) {
  uploadData.value.targetCVE = option
  showUploadCveDropdown.value = false
}

function hideFormCveDropdownDelayed() {
  setTimeout(() => {
    showFormCveDropdown.value = false
  }, 150)
}

function hideUploadCveDropdownDelayed() {
  setTimeout(() => {
    showUploadCveDropdown.value = false
  }, 150)
}

const formData = ref({
  repository: '',
  targetCVE: '',
  targetMethod: '',
  targetLine: null,
  timeoutSeconds: 120
})

const uploadData = ref({
  targetCVE: '',
  targetMethod: '',
  targetLine: null,
  timeoutSeconds: 600
})

const sampleJson = {
  repository: "https://github.com/githubtraining/hellogitworld.git",
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

  if (inputMode.value === 'form') {
    return formData.value.repository
  } else if (inputMode.value === 'upload') {
    return uploadedFile.value !== null
  }
  return false
})



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

async function handleRun() {
  let inputData = null
  
  if (inputMode.value === 'form') {
    const repoUrl = (formData.value.repository || '').trim()
    const targetCve = (formData.value.targetCVE || 'OTHER').trim()
    const targetMethod = (formData.value.targetMethod || '').trim()
    const targetLine = formData.value.targetLine ?? null
    const timeout = formData.value.timeoutSeconds

    let execId = null
    try {
      const res = await submitRepoAnalysis({
        repository_url: repoUrl,
        target_cve: targetCve,
        target_method: targetMethod,
        target_line: targetLine,
        timeout_seconds: timeout
      })
      if (res.ok && res.data?.execution_id) execId = res.data.execution_id
    } catch (_) {}

    inputData = {
      repository: repoUrl,
      executionId: execId,
      files: [],
      scanOptions: {
        targetCVE: targetCve || null,
        targetMethod: targetMethod || null,
        targetLine: targetLine || null,
        timeoutSeconds: timeout
      }
    }
  } else if (inputMode.value === 'upload' && uploadedFile.value) {
    let execId = null
    try {
      const res = await submitZipAnalysis({
        file: uploadedFile.value,
        target_cve: uploadData.value.targetCVE || null,
        target_method: uploadData.value.targetMethod || null,
        target_line: uploadData.value.targetLine ?? null,
        timeout_seconds: uploadData.value.timeoutSeconds
      })
      if (res.ok && res.data?.execution_id) execId = res.data.execution_id
    } catch (_) {}

    inputData = {
      repository: uploadedFile.value.name,
      executionId: execId,
      files: [],
      scanOptions: {
        targetCVE: uploadData.value.targetCVE || null,
        targetMethod: uploadData.value.targetMethod || null,
        targetLine: uploadData.value.targetLine || null,
        timeoutSeconds: uploadData.value.timeoutSeconds
      }
    }
  }
  
  if (inputData) {
    emit('run', inputData)
  }
}

function handleFileSelect(event) {
  const file = event.target.files[0]
  if (file && (file.name?.toLowerCase().endsWith('.zip') || (file.type && file.type.includes('zip')))) {
    uploadedFile.value = file
  }
}

function handleFileDrop(event) {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file && (file.name?.toLowerCase().endsWith('.zip') || (file.type && file.type.includes('zip')))) {
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

.autocomplete-wrapper {
  position: relative;
  width: 100%;
}

.autocomplete-wrapper .form-control {
  width: 100%;
}

.autocomplete-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-top: none;
  border-radius: 0 0 0.5rem 0.5rem;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.autocomplete-option {
  padding: 0.75rem;
  font-size: 0.875rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: background 0.15s ease;
}

.autocomplete-option:hover {
  background: rgba(14, 165, 233, 0.1);
  color: var(--primary);
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

.upload-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
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
