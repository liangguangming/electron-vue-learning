<template>
  <div class="home">
    <header class="hero">
      <h1>Vue Electron Learning</h1>
      <p>Vue 3 + TypeScript + Electron 学习项目</p>
      <div class="platform-info">
        <p>当前平台: {{ platform }}</p>
        <p>Electron版本: {{ electronVersion }}</p>
      </div>
    </header>

    <main class="content">
      <section class="learning-sections">
        <h2>学习内容</h2>
        <div class="section-grid">
          <div class="section-card" @click="navigateTo('/template-syntax')">
            <h3>模板语法</h3>
            <p>学习Vue的模板语法、指令系统和数据绑定</p>
            <span class="status completed">已完成</span>
          </div>
          
          <div class="section-card" @click="navigateTo('/reactive')">
            <h3>响应式数据</h3>
            <p>掌握ref、reactive、computed、watch等响应式API</p>
            <span class="status completed">已完成</span>
          </div>
          
          <div class="section-card" @click="navigateTo('/components')">
            <h3>组件通信</h3>
            <p>学习Props、Emit、Provide/Inject等通信方式</p>
            <span class="status completed">已完成</span>
          </div>
          
          <div class="section-card" @click="navigateTo('/lifecycle')">
            <h3>生命周期</h3>
            <p>了解Vue组件的生命周期钩子函数</p>
            <span class="status completed">已完成</span>
          </div>
          
          <div class="section-card" @click="navigateTo('/electron-demo')">
            <h3>Electron功能</h3>
            <p>学习IPC通信、文件操作、系统API等</p>
            <span class="status in-progress">进行中</span>
          </div>
          
          <div class="section-card" @click="navigateTo('/router-demo')">
            <h3>路由管理</h3>
            <p>学习Vue Router的路由配置和导航</p>
            <span class="status completed">已完成</span>
          </div>
          
          <div class="section-card" @click="navigateTo('/dynamic/123')">
            <h3>动态路由</h3>
            <p>体验动态路由参数和路由守卫</p>
            <span class="status in-progress">进行中</span>
          </div>
          
          <div class="section-card" @click="navigateTo('/pinia-demo')">
            <h3>Pinia状态管理</h3>
            <p>学习Vue 3官方推荐的状态管理库</p>
            <span class="status completed">已完成</span>
          </div>
          
          <div class="section-card" @click="navigateTo('/performance-demo')">
            <h3>性能优化</h3>
            <p>学习组件懒加载、虚拟滚动、内存管理等优化技巧</p>
            <span class="status completed">已完成</span>
          </div>
        </div>
      </section>

      <section class="quick-actions">
        <h2>快速操作</h2>
        <div class="action-buttons">
          <button @click="navigateTo('/electron-demo')" class="btn primary">
            Electron功能演示
          </button>
          <button @click="navigateTo('/pinia-demo')" class="btn secondary">
            Pinia状态管理
          </button>
          <button @click="navigateTo('/performance-demo')" class="btn accent">
            性能优化
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const platform = ref('')
const electronVersion = ref('')

onMounted(() => {
  // 从Electron API获取信息
  if (window.electronAPI) {
    platform.value = window.electronAPI.platform
    electronVersion.value = window.electronAPI.getVersion()
  }
})

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 20px;
  opacity: 0.9;
}

.platform-info {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 0.9rem;
  opacity: 0.8;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.learning-sections h2,
.quick-actions h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.section-card {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #42b883;
}

.section-card h3 {
  color: #42b883;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.section-card p {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.status {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.status.completed {
  background-color: #4caf50;
  color: white;
}

.status.in-progress {
  background-color: #ff9800;
  color: white;
}

.action-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
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

.btn.accent {
  background-color: #ff6b6b;
  color: white;
}

.btn.accent:hover {
  background-color: #ff5252;
}
</style> 