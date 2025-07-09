<template>
  <div class="not-found">
    <header class="page-header">
      <h1>404 - 页面未找到</h1>
      <p>抱歉，您访问的页面不存在</p>
    </header>
    
    <main class="page-content">
      <div class="error-content">
        <div class="error-icon">🔍</div>
        <h2>页面不存在</h2>
        <p>您访问的路径 <code>{{ $route.path }}</code> 不存在</p>
        
        <div class="suggestions">
          <h3>可能的解决方案：</h3>
          <ul>
            <li>检查URL拼写是否正确</li>
            <li>返回首页重新导航</li>
            <li>使用搜索功能查找内容</li>
          </ul>
        </div>
        
        <div class="actions">
          <button @click="goHome" class="btn primary">返回首页</button>
          <button @click="goBack" class="btn secondary">返回上一页</button>
        </div>
        
        <div class="quick-links">
          <h3>快速链接</h3>
          <div class="link-grid">
            <router-link to="/template-syntax" class="link-item">模板语法</router-link>
            <router-link to="/reactive" class="link-item">响应式数据</router-link>
            <router-link to="/components" class="link-item">组件通信</router-link>
            <router-link to="/lifecycle" class="link-item">生命周期</router-link>
            <router-link to="/router-demo" class="link-item">路由演示</router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.not-found {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  color: #dc3545;
  margin-bottom: 10px;
  font-size: 2rem;
}

.page-header p {
  color: #666;
  font-size: 1.1rem;
}

.page-content {
  background: white;
  border-radius: 8px;
  padding: 40px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.error-content {
  max-width: 600px;
  margin: 0 auto;
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.error-content h2 {
  color: #dc3545;
  margin-bottom: 15px;
}

.error-content p {
  color: #666;
  margin-bottom: 20px;
}

.error-content code {
  background-color: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  font-family: monospace;
  color: #dc3545;
}

.suggestions {
  text-align: left;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.suggestions h3 {
  color: #42b883;
  margin-bottom: 15px;
}

.suggestions ul {
  margin: 0;
  padding-left: 20px;
}

.suggestions li {
  margin-bottom: 8px;
  color: #666;
}

.actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
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
  text-decoration: none;
  display: inline-block;
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

.quick-links {
  text-align: left;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.quick-links h3 {
  color: #42b883;
  margin-bottom: 15px;
  text-align: center;
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.link-item {
  padding: 10px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  text-decoration: none;
  color: #42b883;
  text-align: center;
  transition: all 0.3s ease;
}

.link-item:hover {
  background-color: #42b883;
  color: white;
  border-color: #42b883;
}
</style> 