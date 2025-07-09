<template>
  <div class="router-settings">
    <h2>设置页面</h2>
    <p>这是需要认证才能访问的设置页面</p>
    
    <div class="auth-status">
      <div class="status-badge success">
        ✅ 已通过路由守卫认证
      </div>
    </div>
    
    <div class="content-section">
      <h3>应用设置</h3>
      <div class="settings-form">
        <div class="setting-item">
          <label>主题模式:</label>
          <select v-model="settings.theme">
            <option value="light">浅色主题</option>
            <option value="dark">深色主题</option>
            <option value="auto">跟随系统</option>
          </select>
        </div>
        
        <div class="setting-item">
          <label>语言:</label>
          <select v-model="settings.language">
            <option value="zh-CN">简体中文</option>
            <option value="en-US">English</option>
            <option value="ja-JP">日本語</option>
          </select>
        </div>
        
        <div class="setting-item">
          <label>
            <input type="checkbox" v-model="settings.notifications">
            启用通知
          </label>
        </div>
        
        <div class="setting-item">
          <label>
            <input type="checkbox" v-model="settings.autoSave">
            自动保存
          </label>
        </div>
      </div>
    </div>
    
    <div class="content-section">
      <h3>用户信息</h3>
      <div class="user-info">
        <p><strong>用户名:</strong> {{ userInfo.username }}</p>
        <p><strong>邮箱:</strong> {{ userInfo.email }}</p>
        <p><strong>登录时间:</strong> {{ userInfo.loginTime }}</p>
      </div>
    </div>
    
    <div class="demo-section">
      <h3>认证测试</h3>
      <div class="button-group">
        <button @click="logout" class="btn danger">退出登录</button>
        <button @click="saveSettings" class="btn">保存设置</button>
        <button @click="resetSettings" class="btn secondary">重置设置</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 设置数据
const settings = reactive({
  theme: 'light',
  language: 'zh-CN',
  notifications: true,
  autoSave: false
})

// 用户信息
const userInfo = reactive({
  username: '测试用户',
  email: 'test@example.com',
  loginTime: new Date().toLocaleString()
})

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  alert('已退出登录，将跳转到登录页面')
  router.push('/login')
}

const saveSettings = () => {
  localStorage.setItem('appSettings', JSON.stringify(settings))
  alert('设置已保存')
}

const resetSettings = () => {
  settings.theme = 'light'
  settings.language = 'zh-CN'
  settings.notifications = true
  settings.autoSave = false
  alert('设置已重置')
}
</script>

<style scoped>
.router-settings {
  text-align: center;
}

.router-settings h2 {
  color: #42b883;
  margin-bottom: 15px;
}

.router-settings p {
  color: #666;
  margin-bottom: 20px;
}

.auth-status {
  margin-bottom: 20px;
}

.status-badge {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
}

.status-badge.success {
  background-color: #4caf50;
  color: white;
}

.content-section {
  text-align: left;
  margin-bottom: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.content-section h3 {
  color: #42b883;
  margin-bottom: 15px;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.setting-item label {
  min-width: 100px;
  font-weight: bold;
  color: #333;
}

.setting-item select,
.setting-item input[type="checkbox"] {
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.setting-item input[type="checkbox"] {
  margin-right: 8px;
}

.user-info {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.user-info p {
  margin: 8px 0;
  color: #666;
}

.user-info strong {
  color: #42b883;
}

.demo-section {
  text-align: left;
  margin-bottom: 20px;
}

.demo-section h3 {
  color: #42b883;
  margin-bottom: 15px;
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
  transition: background-color 0.3s ease;
  font-size: 0.9rem;
}

.btn.danger {
  background-color: #dc3545;
  color: white;
}

.btn.danger:hover {
  background-color: #c82333;
}

.btn.secondary {
  background-color: #6c757d;
  color: white;
}

.btn.secondary:hover {
  background-color: #5a6268;
}

.btn:not(.danger):not(.secondary) {
  background-color: #42b883;
  color: white;
}

.btn:not(.danger):not(.secondary):hover {
  background-color: #369870;
}
</style> 