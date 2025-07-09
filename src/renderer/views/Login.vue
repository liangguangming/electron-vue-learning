<template>
  <div class="login">
    <header class="page-header">
      <h1>登录页面</h1>
      <p>测试路由守卫和认证功能</p>
    </header>
    
    <main class="page-content">
      <div class="login-form">
        <h3>用户登录</h3>
        
        <div class="form-group">
          <label for="username">用户名:</label>
          <input 
            id="username"
            v-model="form.username" 
            type="text" 
            placeholder="请输入用户名"
            @keyup.enter="handleLogin"
          >
        </div>
        
        <div class="form-group">
          <label for="password">密码:</label>
          <input 
            id="password"
            v-model="form.password" 
            type="password" 
            placeholder="请输入密码"
            @keyup.enter="handleLogin"
          >
        </div>
        
        <div class="form-group">
          <label>
            <input type="checkbox" v-model="form.remember">
            记住我
          </label>
        </div>
        
        <div class="form-actions">
          <button @click="handleLogin" class="btn primary">登录</button>
          <button @click="handleDemoLogin" class="btn secondary">演示登录</button>
        </div>
        
        <div class="login-info">
          <p><strong>演示账号:</strong></p>
          <p>用户名: demo</p>
          <p>密码: 123456</p>
        </div>
      </div>
      
      <div class="auth-status">
        <h3>认证状态</h3>
        <div class="status-info">
          <p><strong>当前状态:</strong> {{ isAuthenticated ? '已登录' : '未登录' }}</p>
          <p><strong>重定向地址:</strong> {{ redirectPath || '无' }}</p>
        </div>
        
        <div class="status-actions">
          <button @click="checkAuth" class="btn">检查认证状态</button>
          <button @click="clearAuth" class="btn danger">清除认证</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 表单数据
const form = reactive({
  username: '',
  password: '',
  remember: false
})

// 认证状态
const isAuthenticated = computed(() => {
  return localStorage.getItem('isAuthenticated') === 'true'
})

// 重定向路径
const redirectPath = computed(() => {
  return route.query.redirect as string
})

const handleLogin = () => {
  if (!form.username || !form.password) {
    alert('请输入用户名和密码')
    return
  }
  
  // 简单的认证逻辑
  if (form.username === 'demo' && form.password === '123456') {
    localStorage.setItem('isAuthenticated', 'true')
    if (form.remember) {
      localStorage.setItem('rememberUser', form.username)
    }
    
    alert('登录成功！')
    
    // 重定向到之前的页面或首页
    const targetPath = redirectPath.value || '/'
    router.push(targetPath)
  } else {
    alert('用户名或密码错误！')
  }
}

const handleDemoLogin = () => {
  form.username = 'demo'
  form.password = '123456'
  handleLogin()
}

const checkAuth = () => {
  const status = localStorage.getItem('isAuthenticated')
  alert(`当前认证状态: ${status === 'true' ? '已登录' : '未登录'}`)
}

const clearAuth = () => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('rememberUser')
  alert('认证状态已清除')
}

onMounted(() => {
  // 如果之前记住了用户，自动填充用户名
  const rememberedUser = localStorage.getItem('rememberUser')
  if (rememberedUser) {
    form.username = rememberedUser
    form.remember = true
  }
})
</script>

<style scoped>
.login {
  max-width: 600px;
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

.login-form {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.login-form h3 {
  color: #42b883;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-group input[type="text"],
.form-group input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group input[type="checkbox"] {
  margin-right: 8px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  flex: 1;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn.primary {
  background-color: #42b883;
  color: white;
}

.btn.primary:hover {
  background-color: #369870;
}

.btn.secondary {
  background-color: #6c757d;
  color: white;
}

.btn.secondary:hover {
  background-color: #5a6268;
}

.btn.danger {
  background-color: #dc3545;
  color: white;
}

.btn.danger:hover {
  background-color: #c82333;
}

.login-info {
  margin-top: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.login-info p {
  margin: 5px 0;
  color: #666;
}

.login-info strong {
  color: #42b883;
}

.auth-status {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.auth-status h3 {
  color: #42b883;
  margin-bottom: 15px;
}

.status-info {
  margin-bottom: 15px;
}

.status-info p {
  margin: 5px 0;
  color: #666;
}

.status-info strong {
  color: #42b883;
}

.status-actions {
  display: flex;
  gap: 10px;
}
</style> 