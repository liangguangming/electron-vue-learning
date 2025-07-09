import { contextBridge } from 'electron'

// 定义暴露给渲染进程的API类型
interface ElectronAPI {
  getVersion: () => string
  platform: string
}

contextBridge.exposeInMainWorld('electronAPI', {
  getVersion: () => process.versions.electron,
  platform: process.platform
} as ElectronAPI)

// 为TypeScript声明全局类型
declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export {} 