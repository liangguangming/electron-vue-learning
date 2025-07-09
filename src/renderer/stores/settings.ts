import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// 主题类型
type Theme = 'light' | 'dark' | 'auto'

// 语言类型
type Language = 'zh-CN' | 'en-US'

// 通知设置接口
interface NotificationSettings {
  enabled: boolean
  sound: boolean
  desktop: boolean
  duration: number
}

// 应用设置接口
interface AppSettings {
  theme: Theme
  language: Language
  notifications: NotificationSettings
  autoSave: boolean
  compactMode: boolean
  sidebarCollapsed: boolean
  animations: boolean
}

// 定义设置Store
export const useSettingsStore = defineStore('settings', () => {
  // 默认设置
  const defaultSettings: AppSettings = {
    theme: 'auto',
    language: 'zh-CN',
    notifications: {
      enabled: true,
      sound: true,
      desktop: true,
      duration: 5000
    },
    autoSave: true,
    compactMode: false,
    sidebarCollapsed: false,
    animations: true
  }

  // 状态
  const settings = ref<AppSettings>({ ...defaultSettings })
  const isInitialized = ref(false)

  // 计算属性
  const currentTheme = computed(() => {
    if (settings.value.theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return settings.value.theme
  })

  const isDarkMode = computed(() => {
    return currentTheme.value === 'dark'
  })

  const themeClass = computed(() => {
    return `theme-${currentTheme.value}`
  })

  // 从localStorage加载设置
  const loadSettings = () => {
    try {
      const stored = localStorage.getItem('appSettings')
      if (stored) {
        const parsed = JSON.parse(stored)
        settings.value = { ...defaultSettings, ...parsed }
      }
    } catch (error) {
      console.error('加载设置失败:', error)
    }
    isInitialized.value = true
  }

  // 保存设置到localStorage
  const saveSettings = () => {
    try {
      localStorage.setItem('appSettings', JSON.stringify(settings.value))
    } catch (error) {
      console.error('保存设置失败:', error)
    }
  }

  // 重置设置
  const resetSettings = () => {
    settings.value = { ...defaultSettings }
    saveSettings()
  }

  // 更新设置
  const updateSettings = (updates: Partial<AppSettings>) => {
    settings.value = { ...settings.value, ...updates }
    saveSettings()
  }

  // 更新主题
  const setTheme = (theme: Theme) => {
    settings.value.theme = theme
    saveSettings()
    applyTheme()
  }

  // 应用主题到DOM
  const applyTheme = () => {
    const root = document.documentElement
    const body = document.body

    // 移除所有主题类
    root.classList.remove('theme-light', 'theme-dark')
    body.classList.remove('theme-light', 'theme-dark')

    // 添加当前主题类
    const theme = currentTheme.value
    root.classList.add(`theme-${theme}`)
    body.classList.add(`theme-${theme}`)

    // 设置CSS变量
    if (theme === 'dark') {
      root.style.setProperty('--bg-primary', '#1a1a1a')
      root.style.setProperty('--bg-secondary', '#2d2d2d')
      root.style.setProperty('--text-primary', '#ffffff')
      root.style.setProperty('--text-secondary', '#b0b0b0')
      root.style.setProperty('--border-color', '#404040')
    } else {
      root.style.setProperty('--bg-primary', '#ffffff')
      root.style.setProperty('--bg-secondary', '#f5f5f5')
      root.style.setProperty('--text-primary', '#333333')
      root.style.setProperty('--text-secondary', '#666666')
      root.style.setProperty('--border-color', '#e0e0e0')
    }
  }

  // 切换侧边栏
  const toggleSidebar = () => {
    settings.value.sidebarCollapsed = !settings.value.sidebarCollapsed
    saveSettings()
  }

  // 切换紧凑模式
  const toggleCompactMode = () => {
    settings.value.compactMode = !settings.value.compactMode
    saveSettings()
  }

  // 切换动画
  const toggleAnimations = () => {
    settings.value.animations = !settings.value.animations
    saveSettings()
  }

  // 更新通知设置
  const updateNotificationSettings = (updates: Partial<NotificationSettings>) => {
    settings.value.notifications = { ...settings.value.notifications, ...updates }
    saveSettings()
  }

  // 显示通知
  const showNotification = (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    if (!settings.value.notifications.enabled) return

    // 创建通知元素
    const notification = document.createElement('div')
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <div class="notification-header">
        <span class="notification-title">${title}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
      <div class="notification-message">${message}</div>
    `

    // 添加到页面
    const container = document.getElementById('notification-container') || createNotificationContainer()
    container.appendChild(notification)

    // 播放声音
    if (settings.value.notifications.sound) {
      playNotificationSound()
    }

    // 自动移除
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove()
      }
    }, settings.value.notifications.duration)
  }

  // 创建通知容器
  const createNotificationContainer = () => {
    const container = document.createElement('div')
    container.id = 'notification-container'
    container.className = 'notification-container'
    document.body.appendChild(container)
    return container
  }

  // 播放通知声音
  const playNotificationSound = () => {
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT')
      audio.play()
    } catch (error) {
      console.error('播放通知声音失败:', error)
    }
  }

  // 监听系统主题变化
  const watchSystemTheme = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
      if (settings.value.theme === 'auto') {
        applyTheme()
      }
    })
  }

  // 初始化
  const init = () => {
    loadSettings()
    applyTheme()
    watchSystemTheme()
  }

  // 监听设置变化
  watch(settings, () => {
    if (isInitialized.value) {
      saveSettings()
    }
  }, { deep: true })

  return {
    // 状态
    settings,
    isInitialized,

    // 计算属性
    currentTheme,
    isDarkMode,
    themeClass,

    // 动作
    loadSettings,
    saveSettings,
    resetSettings,
    updateSettings,
    setTheme,
    applyTheme,
    toggleSidebar,
    toggleCompactMode,
    toggleAnimations,
    updateNotificationSettings,
    showNotification,
    init
  }
}) 