import { contextBridge, ipcRenderer } from 'electron'

// 定义暴露给渲染进程的API类型
interface ElectronAPI {
  // 基础信息
  getVersion: () => string
  platform: string
  
  // 系统信息
  getSystemInfo: () => Promise<any>
  getAppInfo: () => Promise<any>
  
  // 窗口操作
  windowMinimize: () => Promise<void>
  windowMaximize: () => Promise<void>
  windowClose: () => Promise<void>
  
  // 剪贴板操作
  clipboardReadText: () => Promise<string>
  clipboardWriteText: (text: string) => Promise<boolean>
  
  // 文件系统操作
  readFile: (filePath: string) => Promise<any>
  writeFile: (filePath: string, content: string) => Promise<any>
  saveFileContent: (content: string) => Promise<any>
  
  // 外部链接
  openExternal: (url: string) => Promise<any>
  
  // 对话框
  showMessageBox: (options: any) => Promise<any>
  showErrorBox: (title: string, content: string) => Promise<void>
  
  // 事件监听
  onFileOpened: (callback: (data: any) => void) => void
  onRequestSaveContent: (callback: () => void) => void
  removeAllListeners: (channel: string) => void
}

// 创建API对象
const electronAPI: ElectronAPI = {
  // 基础信息
  getVersion: () => process.versions.electron,
  platform: process.platform,
  
  // 系统信息
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  getAppInfo: () => ipcRenderer.invoke('get-app-info'),
  
  // 窗口操作
  windowMinimize: () => ipcRenderer.invoke('window-minimize'),
  windowMaximize: () => ipcRenderer.invoke('window-maximize'),
  windowClose: () => ipcRenderer.invoke('window-close'),
  
  // 剪贴板操作
  clipboardReadText: () => ipcRenderer.invoke('clipboard-read-text'),
  clipboardWriteText: (text: string) => ipcRenderer.invoke('clipboard-write-text', text),
  
  // 文件系统操作
  readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath: string, content: string) => ipcRenderer.invoke('write-file', filePath, content),
  saveFileContent: (content: string) => ipcRenderer.invoke('save-file-content', content),
  
  // 外部链接
  openExternal: (url: string) => ipcRenderer.invoke('open-external', url),
  
  // 对话框
  showMessageBox: (options: any) => ipcRenderer.invoke('show-message-box', options),
  showErrorBox: (title: string, content: string) => ipcRenderer.invoke('show-error-box', title, content),
  
  // 事件监听
  onFileOpened: (callback: (data: any) => void) => {
    ipcRenderer.on('file-opened', (event, data) => callback(data))
  },
  onRequestSaveContent: (callback: () => void) => {
    ipcRenderer.on('request-save-content', () => callback())
  },
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel)
  }
}

// 暴露API到渲染进程
contextBridge.exposeInMainWorld('electronAPI', electronAPI)

// 为TypeScript声明全局类型
declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export {} 