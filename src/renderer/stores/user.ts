import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 用户信息接口
interface UserInfo {
  id: string
  username: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
  permissions: string[]
}

// 登录表单接口
interface LoginForm {
  username: string
  password: string
  remember: boolean
}

// 定义用户Store
export const useUserStore = defineStore('user', () => {
  // 状态
  const userInfo = ref<UserInfo | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const loginError = ref('')
  const token = ref('')

  // 计算属性
  const isAdmin = computed(() => {
    return userInfo.value?.role === 'admin'
  })

  const hasPermission = computed(() => {
    return (permission: string) => {
      return userInfo.value?.permissions.includes(permission) || false
    }
  })

  const displayName = computed(() => {
    return userInfo.value?.username || '未登录'
  })

  // 模拟用户数据
  const mockUsers = {
    'admin': {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin' as const,
      permissions: ['read', 'write', 'delete', 'admin']
    },
    'user': {
      id: '2',
      username: 'user',
      email: 'user@example.com',
      role: 'user' as const,
      permissions: ['read', 'write']
    },
    'demo': {
      id: '3',
      username: 'demo',
      email: 'demo@example.com',
      role: 'user' as const,
      permissions: ['read']
    }
  }

  // 动作
  const login = async (form: LoginForm) => {
    isLoading.value = true
    loginError.value = ''

    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000))

      const user = mockUsers[form.username as keyof typeof mockUsers]
      
      if (!user || form.password !== '123456') {
        throw new Error('用户名或密码错误')
      }

      // 设置用户信息
      userInfo.value = user
      isAuthenticated.value = true
      token.value = `token_${user.id}_${Date.now()}`

      // 保存到localStorage
      if (form.remember) {
        localStorage.setItem('userInfo', JSON.stringify(user))
        localStorage.setItem('token', token.value)
      }

      // 设置认证状态
      localStorage.setItem('isAuthenticated', 'true')

      return { success: true, user }
    } catch (error: any) {
      loginError.value = error.message
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    userInfo.value = null
    isAuthenticated.value = false
    token.value = ''
    loginError.value = ''

    // 清除localStorage
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('rememberUser')
  }

  const checkAuth = () => {
    const storedUser = localStorage.getItem('userInfo')
    const storedToken = localStorage.getItem('token')
    const authStatus = localStorage.getItem('isAuthenticated')

    if (storedUser && storedToken && authStatus === 'true') {
      userInfo.value = JSON.parse(storedUser)
      token.value = storedToken
      isAuthenticated.value = true
      return true
    }

    return false
  }

  const updateProfile = async (updates: Partial<UserInfo>) => {
    if (!userInfo.value) return { success: false, error: '用户未登录' }

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500))

      // 更新用户信息
      userInfo.value = { ...userInfo.value, ...updates }

      // 更新localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value))

      return { success: true, user: userInfo.value }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const refreshToken = async () => {
    if (!userInfo.value) return { success: false, error: '用户未登录' }

    try {
      // 模拟token刷新
      await new Promise(resolve => setTimeout(resolve, 300))
      
      token.value = `token_${userInfo.value.id}_${Date.now()}`
      localStorage.setItem('token', token.value)

      return { success: true, token: token.value }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  // 初始化时检查认证状态
  const init = () => {
    checkAuth()
  }

  return {
    // 状态
    userInfo,
    isAuthenticated,
    isLoading,
    loginError,
    token,

    // 计算属性
    isAdmin,
    hasPermission,
    displayName,

    // 动作
    login,
    logout,
    checkAuth,
    updateProfile,
    refreshToken,
    init
  }
}) 