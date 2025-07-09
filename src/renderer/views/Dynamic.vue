<template>
  <div class="dynamic">
    <header class="page-header">
      <h1>动态路由学习</h1>
      <p>学习动态路由参数和路由守卫</p>
    </header>
    
    <main class="page-content">
      <div class="content-section">
        <h3>动态路由参数</h3>
        <div class="info-grid">
          <div class="info-item">
            <strong>路由ID:</strong> {{ id }}
          </div>
          <div class="info-item">
            <strong>参数类型:</strong> {{ typeof id }}
          </div>
          <div class="info-item">
            <strong>当前路径:</strong> {{ $route.path }}
          </div>
          <div class="info-item">
            <strong>完整路径:</strong> {{ $route.fullPath }}
          </div>
        </div>
      </div>
      
      <div class="content-section">
        <h3>动态内容</h3>
        <div class="dynamic-content">
          <p>这是ID为 <strong>{{ id }}</strong> 的动态内容</p>
          <div class="content-box">
            <h4>内容详情</h4>
            <p>动态路由允许我们根据URL参数动态生成页面内容。</p>
            <p>当前ID: {{ id }} 对应的内容正在加载...</p>
          </div>
        </div>
      </div>
      
      <div class="demo-section">
        <h3>动态路由测试</h3>
        <div class="button-group">
          <button @click="goToDynamic(123)" class="btn">ID: 123</button>
          <button @click="goToDynamic(456)" class="btn">ID: 456</button>
          <button @click="goToDynamic(789)" class="btn">ID: 789</button>
          <button @click="goToDynamic('test')" class="btn">ID: test</button>
        </div>
      </div>
      
      <div class="content-section">
        <h3>路由守卫演示</h3>
        <div class="guard-info">
          <p>这个页面演示了路由守卫的功能：</p>
          <ul>
            <li>全局前置守卫会检查路由跳转</li>
            <li>动态设置页面标题</li>
            <li>记录路由跳转日志</li>
            <li>处理认证和权限检查</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

// 定义Props接收路由参数
interface Props {
  id: string
}

const props = defineProps<Props>()
const router = useRouter()

const goToDynamic = (newId: string | number) => {
  router.push(`/dynamic/${newId}`)
}
</script>

<style scoped>
.dynamic {
  max-width: 800px;
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

.content-section {
  margin-bottom: 25px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.content-section h3 {
  color: #42b883;
  margin-bottom: 15px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.info-item {
  padding: 8px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  font-size: 0.9rem;
}

.info-item strong {
  color: #42b883;
}

.dynamic-content {
  text-align: center;
}

.dynamic-content p {
  margin-bottom: 15px;
  color: #666;
}

.content-box {
  background-color: white;
  padding: 20px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  margin-top: 15px;
}

.content-box h4 {
  color: #42b883;
  margin-bottom: 10px;
}

.content-box p {
  margin: 8px 0;
  color: #666;
}

.demo-section {
  margin-bottom: 25px;
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
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #369870;
}

.guard-info {
  background-color: white;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.guard-info p {
  margin-bottom: 10px;
  color: #666;
}

.guard-info ul {
  margin: 0;
  padding-left: 20px;
}

.guard-info li {
  margin-bottom: 5px;
  color: #666;
}
</style> 