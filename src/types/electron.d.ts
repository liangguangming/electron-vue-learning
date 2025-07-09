// Electron API类型声明
interface ElectronAPI {
  getVersion: () => string
  platform: string
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export {} 