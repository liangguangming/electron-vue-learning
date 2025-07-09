<template>
  <div class="electron-demo">
    <header class="page-header">
      <h1>Electron 主进程开发学习</h1>
      <p>学习IPC通信、文件系统操作、系统API等Electron功能</p>
    </header>
    
    <main class="page-content">
      <!-- 系统信息 -->
      <section class="demo-section">
        <h3>系统信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <strong>平台:</strong> {{ systemInfo.platform }}
          </div>
          <div class="info-item">
            <strong>架构:</strong> {{ systemInfo.arch }}
          </div>
          <div class="info-item">
            <strong>Node版本:</strong> {{ systemInfo.nodeVersion }}
          </div>
          <div class="info-item">
            <strong>Electron版本:</strong> {{ systemInfo.electronVersion }}
          </div>
          <div class="info-item">
            <strong>Chrome版本:</strong> {{ systemInfo.chromeVersion }}
          </div>
          <div class="info-item">
            <strong>应用名称:</strong> {{ appInfo.name }}
          </div>
          <div class="info-item">
            <strong>应用版本:</strong> {{ appInfo.version }}
          </div>
          <div class="info-item">
            <strong>语言:</strong> {{ appInfo.locale }}
          </div>
        </div>
        <button @click="refreshSystemInfo" class="btn">刷新系统信息</button>
      </section>

      <!-- 窗口操作 -->
      <section class="demo-section">
        <h3>窗口操作</h3>
        <div class="button-group">
          <button @click="minimizeWindow" class="btn">最小化</button>
          <button @click="maximizeWindow" class="btn">最大化/还原</button>
          <button @click="closeWindow" class="btn danger">关闭窗口</button>
        </div>
      </section>

      <!-- 剪贴板操作 -->
      <section class="demo-section">
        <h3>剪贴板操作</h3>
        <div class="clipboard-demo">
          <div class="input-group">
            <label>要复制的文本:</label>
            <input v-model="clipboardText" placeholder="输入要复制到剪贴板的文本" />
            <button @click="writeToClipboard" class="btn">复制到剪贴板</button>
          </div>
          <div class="input-group">
            <label>剪贴板内容:</label>
            <textarea v-model="clipboardContent" readonly placeholder="剪贴板内容将显示在这里"></textarea>
            <button @click="readFromClipboard" class="btn">读取剪贴板</button>
          </div>
        </div>
      </section>

      <!-- 文件操作 -->
      <section class="demo-section">
        <h3>文件操作</h3>
        <div class="file-demo">
          <div class="file-input">
            <label>文件路径:</label>
            <input v-model="filePath" placeholder="输入要读取的文件路径" />
            <button @click="readFile" class="btn">读取文件</button>
          </div>
          <div class="file-content">
            <label>文件内容:</label>
            <textarea v-model="fileContent" placeholder="文件内容将显示在这里" rows="6"></textarea>
          </div>
          <div class="file-actions">
            <button @click="saveFileContent" class="btn">保存内容</button>
            <button @click="clearFileContent" class="btn secondary">清空内容</button>
          </div>
        </div>
      </section>

      <!-- 对话框 -->
      <section class="demo-section">
        <h3>对话框</h3>
        <div class="dialog-demo">
          <div class="button-group">
            <button @click="showInfoDialog" class="btn">信息对话框</button>
            <button @click="showWarningDialog" class="btn warning">警告对话框</button>
            <button @click="showErrorDialog" class="btn danger">错误对话框</button>
            <button @click="showConfirmDialog" class="btn">确认对话框</button>
          </div>
        </div>
      </section>

      <!-- 外部链接 -->
      <section class="demo-section">
        <h3>外部链接</h3>
        <div class="external-links">
          <button @click="openVueWebsite" class="btn">打开Vue官网</button>
          <button @click="openElectronWebsite" class="btn">打开Electron官网</button>
          <button @click="openGitHub" class="btn">打开GitHub</button>
        </div>
      </section>

      <!-- IPC通信日志 -->
      <section class="demo-section">
        <h3>IPC通信日志</h3>
        <div class="log-container">
          <div class="log-list">
            <div 
              v-for="(log, index) in ipcLogs" 
              :key="index"
              class="log-item"
              :class="log.type"
            >
              <span class="log-time">{{ log.time }}</span>
              <span class="log-message">{{ log.message }}</span>
            </div>
          </div>
          <button @click="clearLogs" class="btn secondary">清空日志</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// 响应式数据
const systemInfo = reactive({
  platform: '',
  arch: '',
  nodeVersion: '',
  electronVersion: '',
  chromeVersion: ''
})

const appInfo = reactive({
  name: '',
  version: '',
  locale: ''
})

const clipboardText = ref('')
const clipboardContent = ref('')
const filePath = ref('')
const fileContent = ref('')
const ipcLogs = ref<Array<{
  time: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
}>>([])

// 添加日志
const addLog = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
  const time = new Date().toLocaleTimeString()
  ipcLogs.value.push({ time, message, type })
  console.log(`[${time}] ${message}`)
}

// 清空日志
const clearLogs = () => {
  ipcLogs.value = []
}

// 刷新系统信息
const refreshSystemInfo = async () => {
  try {
    const sysInfo = await window.electronAPI.getSystemInfo()
    Object.assign(systemInfo, sysInfo)
    
    const app = await window.electronAPI.getAppInfo()
    Object.assign(appInfo, app)
    
    addLog('系统信息已刷新', 'success')
  } catch (error) {
    addLog('获取系统信息失败', 'error')
  }
}

// 窗口操作
const minimizeWindow = async () => {
  try {
    await window.electronAPI.windowMinimize()
    addLog('窗口已最小化', 'info')
  } catch (error) {
    addLog('窗口最小化失败', 'error')
  }
}

const maximizeWindow = async () => {
  try {
    await window.electronAPI.windowMaximize()
    addLog('窗口最大化/还原', 'info')
  } catch (error) {
    addLog('窗口操作失败', 'error')
  }
}

const closeWindow = async () => {
  try {
    await window.electronAPI.windowClose()
    addLog('窗口关闭请求已发送', 'warning')
  } catch (error) {
    addLog('窗口关闭失败', 'error')
  }
}

// 剪贴板操作
const writeToClipboard = async () => {
  if (!clipboardText.value.trim()) {
    addLog('请输入要复制的文本', 'warning')
    return
  }
  
  try {
    await window.electronAPI.clipboardWriteText(clipboardText.value)
    addLog('文本已复制到剪贴板', 'success')
  } catch (error) {
    addLog('复制到剪贴板失败', 'error')
  }
}

const readFromClipboard = async () => {
  try {
    const text = await window.electronAPI.clipboardReadText()
    clipboardContent.value = text
    addLog('已读取剪贴板内容', 'success')
  } catch (error) {
    addLog('读取剪贴板失败', 'error')
  }
}

// 文件操作
const readFile = async () => {
  if (!filePath.value.trim()) {
    addLog('请输入文件路径', 'warning')
    return
  }
  
  try {
    const result = await window.electronAPI.readFile(filePath.value)
    if (result.success) {
      fileContent.value = result.content
      addLog('文件读取成功', 'success')
    } else {
      addLog(`文件读取失败: ${result.error}`, 'error')
    }
  } catch (error) {
    addLog('文件读取失败', 'error')
  }
}

const saveFileContent = async () => {
  if (!fileContent.value.trim()) {
    addLog('没有内容可保存', 'warning')
    return
  }
  
  try {
    const result = await window.electronAPI.saveFileContent(fileContent.value)
    if (result.success) {
      addLog(`文件已保存到: ${result.path}`, 'success')
    } else {
      addLog(`文件保存失败: ${result.error}`, 'error')
    }
  } catch (error) {
    addLog('文件保存失败', 'error')
  }
}

const clearFileContent = () => {
  fileContent.value = ''
  addLog('文件内容已清空', 'info')
}

// 对话框
const showInfoDialog = async () => {
  try {
    await window.electronAPI.showMessageBox({
      type: 'info',
      title: '信息',
      message: '这是一个信息对话框',
      detail: '这是详细信息'
    })
    addLog('信息对话框已显示', 'info')
  } catch (error) {
    addLog('显示对话框失败', 'error')
  }
}

const showWarningDialog = async () => {
  try {
    await window.electronAPI.showMessageBox({
      type: 'warning',
      title: '警告',
      message: '这是一个警告对话框',
      detail: '请注意这个警告信息'
    })
    addLog('警告对话框已显示', 'warning')
  } catch (error) {
    addLog('显示对话框失败', 'error')
  }
}

const showErrorDialog = async () => {
  try {
    await window.electronAPI.showErrorBox('错误', '这是一个错误对话框')
    addLog('错误对话框已显示', 'error')
  } catch (error) {
    addLog('显示对话框失败', 'error')
  }
}

const showConfirmDialog = async () => {
  try {
    const result = await window.electronAPI.showMessageBox({
      type: 'question',
      title: '确认',
      message: '这是一个确认对话框',
      detail: '请选择是或否',
      buttons: ['是', '否'],
      defaultId: 0
    })
    addLog(`确认对话框结果: ${result.response === 0 ? '是' : '否'}`, 'info')
  } catch (error) {
    addLog('显示对话框失败', 'error')
  }
}

// 外部链接
const openVueWebsite = async () => {
  try {
    await window.electronAPI.openExternal('https://vuejs.org')
    addLog('已打开Vue官网', 'success')
  } catch (error) {
    addLog('打开外部链接失败', 'error')
  }
}

const openElectronWebsite = async () => {
  try {
    await window.electronAPI.openExternal('https://electronjs.org')
    addLog('已打开Electron官网', 'success')
  } catch (error) {
    addLog('打开外部链接失败', 'error')
  }
}

const openGitHub = async () => {
  try {
    await window.electronAPI.openExternal('https://github.com')
    addLog('已打开GitHub', 'success')
  } catch (error) {
    addLog('打开外部链接失败', 'error')
  }
}

// 生命周期
onMounted(async () => {
  addLog('Electron演示页面已加载', 'info')
  await refreshSystemInfo()
  
  // 监听文件打开事件
  window.electronAPI.onFileOpened((data) => {
    filePath.value = data.path
    fileContent.value = data.content
    addLog(`文件已打开: ${data.path}`, 'success')
  })
  
  // 监听保存内容请求
  window.electronAPI.onRequestSaveContent(() => {
    addLog('收到保存内容请求', 'info')
    saveFileContent()
  })
})

onUnmounted(() => {
  // 清理事件监听器
  window.electronAPI.removeAllListeners('file-opened')
  window.electronAPI.removeAllListeners('request-save-content')
})
</script>

<style scoped>
.electron-demo {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-header h1 {
  color: #42b883;
  margin-bottom: 10px;
}

.page-header p {
  color: #666;
  font-size: 1.1rem;
}

.page-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.demo-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background-color: #f8f9fa;
}

.demo-section h3 {
  color: #42b883;
  margin-bottom: 15px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 15px;
}

.info-item {
  padding: 8px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  font-size: 0.9rem;
}

.info-item strong {
  color: #42b883;
}

.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.btn:not(.danger):not(.warning):not(.secondary) {
  background-color: #42b883;
  color: white;
}

.btn:not(.danger):not(.warning):not(.secondary):hover {
  background-color: #369870;
}

.btn.danger {
  background-color: #dc3545;
  color: white;
}

.btn.danger:hover {
  background-color: #c82333;
}

.btn.warning {
  background-color: #ffc107;
  color: #212529;
}

.btn.warning:hover {
  background-color: #e0a800;
}

.btn.secondary {
  background-color: #6c757d;
  color: white;
}

.btn.secondary:hover {
  background-color: #5a6268;
}

.clipboard-demo,
.file-demo {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-weight: bold;
  color: #333;
}

.input-group input,
.input-group textarea {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.input-group textarea {
  resize: vertical;
  min-height: 80px;
}

.file-input {
  display: flex;
  gap: 10px;
  align-items: end;
}

.file-input label {
  font-weight: bold;
  color: #333;
  min-width: 80px;
}

.file-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.file-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-content label {
  font-weight: bold;
  color: #333;
}

.file-content textarea {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 120px;
}

.file-actions {
  display: flex;
  gap: 10px;
}

.dialog-demo,
.external-links {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.log-container {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.log-list {
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
}

.log-item {
  display: flex;
  gap: 10px;
  padding: 5px;
  border-radius: 4px;
  margin-bottom: 5px;
  font-family: monospace;
  font-size: 12px;
}

.log-item.info {
  background-color: #e3f2fd;
  color: #1976d2;
}

.log-item.success {
  background-color: #e8f5e8;
  color: #2e7d32;
}

.log-item.warning {
  background-color: #fff3e0;
  color: #f57c00;
}

.log-item.error {
  background-color: #ffebee;
  color: #d32f2f;
}

.log-time {
  font-weight: bold;
  min-width: 80px;
}

.log-message {
  flex: 1;
}
</style> 