import { 
  app, 
  BrowserWindow, 
  ipcMain, 
  dialog, 
  clipboard, 
  shell,
  Menu,
  Tray,
  nativeImage
} from 'electron'
import * as path from 'path'
import * as fs from 'fs'

// 全局变量
let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Vue Electron Learning',
    icon: path.join(__dirname, '../assets/icon.png'), // 如果有图标的话
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    show: false // 先不显示，等准备好再显示
  })

  // 窗口准备好后显示
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
  })

  // 根据环境加载不同的内容
  if (process.env.NODE_ENV === 'development') {
    // 开发环境：加载本地开发服务器
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    // 生产环境：加载构建后的静态文件
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  // 窗口关闭事件
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 创建应用菜单
  createMenu()
}

// 创建应用菜单
function createMenu(): void {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: '文件',
      submenu: [
        {
          label: '打开文件',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            openFileDialog()
          }
        },
        {
          label: '保存文件',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            saveFileDialog()
          }
        },
        { type: 'separator' },
        {
          label: '退出',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit()
          }
        }
      ]
    },
    {
      label: '编辑',
      submenu: [
        { role: 'undo', label: '撤销' },
        { role: 'redo', label: '重做' },
        { type: 'separator' },
        { role: 'cut', label: '剪切' },
        { role: 'copy', label: '复制' },
        { role: 'paste', label: '粘贴' }
      ]
    },
    {
      label: '视图',
      submenu: [
        { role: 'reload', label: '重新加载' },
        { role: 'forceReload', label: '强制重新加载' },
        { role: 'toggleDevTools', label: '开发者工具' },
        { type: 'separator' },
        { role: 'resetZoom', label: '实际大小' },
        { role: 'zoomIn', label: '放大' },
        { role: 'zoomOut', label: '缩小' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: '全屏' }
      ]
    },
    {
      label: '窗口',
      submenu: [
        { role: 'minimize', label: '最小化' },
        { role: 'close', label: '关闭' }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

// 创建系统托盘
function createTray(): void {
  // 创建托盘图标（使用默认图标）
  const iconPath = path.join(__dirname, '../assets/icon.png')
  const icon = fs.existsSync(iconPath) 
    ? nativeImage.createFromPath(iconPath) 
    : nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
  
  tray = new Tray(icon)
  tray.setToolTip('Vue Electron Learning')
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示应用',
      click: () => {
        mainWindow?.show()
      }
    },
    {
      label: '隐藏应用',
      click: () => {
        mainWindow?.hide()
      }
    },
    { type: 'separator' },
    {
      label: '退出',
      click: () => {
        app.quit()
      }
    }
  ])
  
  tray.setContextMenu(contextMenu)
  
  // 托盘图标点击事件
  tray.on('click', () => {
    if (mainWindow?.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow?.show()
    }
  })
}

// 文件对话框功能
async function openFileDialog(): Promise<void> {
  if (!mainWindow) return
  
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: '文本文件', extensions: ['txt', 'md', 'json'] },
      { name: '所有文件', extensions: ['*'] }
    ]
  })
  
  if (!result.canceled && result.filePaths.length > 0) {
    try {
      const filePath = result.filePaths[0]
      const content = fs.readFileSync(filePath, 'utf8')
      
      // 发送文件内容到渲染进程
      mainWindow.webContents.send('file-opened', {
        path: filePath,
        content: content
      })
    } catch (error: any) {
      console.error('读取文件失败:', error)
      dialog.showErrorBox('错误', '读取文件失败')
    }
  }
}

async function saveFileDialog(): Promise<void> {
  if (!mainWindow) return
  
  const result = await dialog.showSaveDialog(mainWindow, {
    filters: [
      { name: '文本文件', extensions: ['txt'] },
      { name: '所有文件', extensions: ['*'] }
    ]
  })
  
  if (!result.canceled && result.filePath) {
    // 请求渲染进程提供要保存的内容
    mainWindow.webContents.send('request-save-content')
  }
}

// IPC 通信处理
function setupIPC(): void {
  // 获取系统信息
  ipcMain.handle('get-system-info', () => {
    return {
      platform: process.platform,
      arch: process.arch,
      version: process.version,
      electronVersion: process.versions.electron,
      chromeVersion: process.versions.chrome,
      nodeVersion: process.versions.node
    }
  })

  // 获取应用信息
  ipcMain.handle('get-app-info', () => {
    return {
      name: app.getName(),
      version: app.getVersion(),
      locale: app.getLocale(),
      isPackaged: app.isPackaged
    }
  })

  // 窗口操作
  ipcMain.handle('window-minimize', () => {
    mainWindow?.minimize()
  })

  ipcMain.handle('window-maximize', () => {
    if (mainWindow?.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow?.maximize()
    }
  })

  ipcMain.handle('window-close', () => {
    mainWindow?.close()
  })

  // 剪贴板操作
  ipcMain.handle('clipboard-read-text', () => {
    return clipboard.readText()
  })

  ipcMain.handle('clipboard-write-text', (event, text: string) => {
    clipboard.writeText(text)
    return true
  })

  // 文件系统操作
  ipcMain.handle('read-file', async (event, filePath: string) => {
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      return { success: true, content }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('write-file', async (event, filePath: string, content: string) => {
    try {
      fs.writeFileSync(filePath, content, 'utf8')
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // 保存文件内容
  ipcMain.handle('save-file-content', async (event, content: string) => {
    if (!mainWindow) return { success: false, error: '窗口未创建' }
    
    const result = await dialog.showSaveDialog(mainWindow, {
      filters: [
        { name: '文本文件', extensions: ['txt'] },
        { name: '所有文件', extensions: ['*'] }
      ]
    })
    
    if (result.canceled || !result.filePath) {
      return { success: false, error: '用户取消' }
    }
    
    try {
      fs.writeFileSync(result.filePath, content, 'utf8')
      return { success: true, path: result.filePath }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // 打开外部链接
  ipcMain.handle('open-external', async (event, url: string) => {
    try {
      await shell.openExternal(url)
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // 显示对话框
  ipcMain.handle('show-message-box', async (event, options: any) => {
    if (!mainWindow) return { success: false, error: '窗口未创建' }
    
    try {
      const result = await dialog.showMessageBox(mainWindow, options)
      return { success: true, result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // 显示错误对话框
  ipcMain.handle('show-error-box', (event, title: string, content: string) => {
    dialog.showErrorBox(title, content)
  })
}

// 应用生命周期
app.whenReady().then(() => {
  createWindow()
  createTray()
  setupIPC()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  // 清理托盘
  if (tray) {
    tray.destroy()
    tray = null
  }
})

// 安全：阻止新窗口创建
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window' as any, (event: any, navigationUrl: string) => {
    event.preventDefault()
    shell.openExternal(navigationUrl)
  })
}) 