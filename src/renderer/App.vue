<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <router-link to="/" class="brand-link">
            Vue Electron Learning
          </router-link>
        </div>
        
        <div class="nav-menu">
          <router-link to="/" class="nav-link" active-class="active">首页</router-link>
          <router-link to="/template-syntax" class="nav-link" active-class="active">模板语法</router-link>
          <router-link to="/reactive" class="nav-link" active-class="active">响应式数据</router-link>
          <router-link to="/components" class="nav-link" active-class="active">组件通信</router-link>
          <router-link to="/lifecycle" class="nav-link" active-class="active">生命周期</router-link>
          <router-link to="/router-demo" class="nav-link" active-class="active">路由演示</router-link>
        </div>
        
        <div class="nav-info">
          <span class="platform-info">{{ platform }}</span>
          <span class="version-info">v{{ electronVersion }}</span>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2024 Vue Electron Learning. 学习项目，用于掌握Vue和Electron的基础知识。</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const platform = ref('')
const electronVersion = ref('')

onMounted(() => {
  // 从Electron API获取信息
  if (window.electronAPI) {
    platform.value = window.electronAPI.platform
    electronVersion.value = window.electronAPI.getVersion()
  }
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
}

.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.nav-brand {
  font-size: 1.2rem;
  font-weight: bold;
}

.brand-link {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.brand-link:hover {
  opacity: 0.8;
}

.nav-menu {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: bold;
}

.nav-info {
  display: flex;
  gap: 15px;
  font-size: 0.8rem;
  opacity: 0.8;
}

.platform-info,
.version-info {
  padding: 4px 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.main-content {
  flex: 1;
  background-color: #f5f5f5;
  min-height: calc(100vh - 120px);
}

.footer {
  background-color: #333;
  color: white;
  padding: 20px 0;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    height: auto;
    padding: 15px 20px;
  }
  
  .nav-menu {
    margin: 15px 0;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-info {
    margin-top: 10px;
  }
}
</style>

<style>
/* 全局样式 */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style> 