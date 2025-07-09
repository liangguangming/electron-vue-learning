<template>
  <div class="router-demo">
    <header class="page-header">
      <h1>Vue Router 路由管理学习</h1>
      <p>学习路由配置、导航、参数传递和路由守卫</p>
    </header>
    
    <main class="page-content">
      <!-- 导航菜单 -->
      <nav class="router-nav">
        <router-link to="/router-demo" class="nav-link" active-class="active">
          首页
        </router-link>
        <router-link to="/router-demo/about" class="nav-link" active-class="active">
          关于
        </router-link>
        <router-link to="/router-demo/user/1" class="nav-link" active-class="active">
          用户1
        </router-link>
        <router-link to="/router-demo/user/2" class="nav-link" active-class="active">
          用户2
        </router-link>
        <router-link to="/router-demo/settings" class="nav-link" active-class="active">
          设置
        </router-link>
      </nav>
      
      <!-- 路由视图 -->
      <div class="router-view-container">
        <router-view />
      </div>
      
      <!-- 路由信息显示 -->
      <div class="route-info">
        <h3>当前路由信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <strong>路径:</strong> {{ $route.path }}
          </div>
          <div class="info-item">
            <strong>名称:</strong> {{ $route.name }}
          </div>
          <div class="info-item">
            <strong>参数:</strong> {{ JSON.stringify($route.params) }}
          </div>
          <div class="info-item">
            <strong>查询:</strong> {{ JSON.stringify($route.query) }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.router-demo {
  max-width: 1000px;
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

.router-nav {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
  flex-wrap: wrap;
}

.nav-link {
  padding: 8px 16px;
  text-decoration: none;
  color: #666;
  border-radius: 4px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.nav-link:hover {
  background-color: #e9ecef;
  color: #42b883;
}

.nav-link.active {
  background-color: #42b883;
  color: white;
  border-color: #42b883;
}

.router-view-container {
  min-height: 300px;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background-color: #fafafa;
}

.route-info {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.route-info h3 {
  color: #42b883;
  margin-bottom: 15px;
  font-size: 1.1rem;
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
</style> 