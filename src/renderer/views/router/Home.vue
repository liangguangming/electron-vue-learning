<template>
  <div class="router-home">
    <h2>路由首页</h2>
    <p>这是嵌套路由的首页内容</p>
    
    <div class="content-section">
      <h3>路由功能演示</h3>
      <ul>
        <li>点击上方导航可以切换不同的子路由</li>
        <li>观察下方路由信息的变化</li>
        <li>体验路由参数和查询参数</li>
        <li>测试路由守卫功能</li>
      </ul>
    </div>
    
    <div class="demo-section">
      <h3>编程式导航示例</h3>
      <div class="button-group">
        <button @click="goToAbout" class="btn">跳转到关于页面</button>
        <button @click="goToUser(3)" class="btn">跳转到用户3</button>
        <button @click="goToSettings" class="btn">跳转到设置页面</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAbout = () => {
  router.push('/router-demo/about')
}

const goToUser = (id: number) => {
  router.push(`/router-demo/user/${id}`)
}

const goToSettings = () => {
  router.push('/router-demo/settings')
}
</script>

<style scoped>
.router-home {
  text-align: center;
}

.router-home h2 {
  color: #42b883;
  margin-bottom: 15px;
}

.router-home p {
  color: #666;
  margin-bottom: 20px;
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
  margin-bottom: 10px;
}

.content-section ul {
  margin: 0;
  padding-left: 20px;
}

.content-section li {
  margin-bottom: 5px;
  color: #666;
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
</style> 