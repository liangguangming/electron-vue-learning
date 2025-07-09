<template>
  <div class="router-user">
    <h2>用户详情页面</h2>
    <p>这是动态路由页面，展示用户ID: {{ id }}</p>
    
    <div class="content-section">
      <h3>路由参数信息</h3>
      <div class="info-grid">
        <div class="info-item">
          <strong>用户ID:</strong> {{ id }}
        </div>
        <div class="info-item">
          <strong>参数类型:</strong> {{ typeof id }}
        </div>
        <div class="info-item">
          <strong>路由路径:</strong> {{ $route.path }}
        </div>
        <div class="info-item">
          <strong>完整路径:</strong> {{ $route.fullPath }}
        </div>
      </div>
    </div>
    
    <div class="content-section">
      <h3>模拟用户数据</h3>
      <div class="user-card">
        <div class="user-avatar">
          <span>{{ userInfo.name.charAt(0) }}</span>
        </div>
        <div class="user-details">
          <h4>{{ userInfo.name }}</h4>
          <p><strong>邮箱:</strong> {{ userInfo.email }}</p>
          <p><strong>角色:</strong> {{ userInfo.role }}</p>
          <p><strong>注册时间:</strong> {{ userInfo.joinDate }}</p>
        </div>
      </div>
    </div>
    
    <div class="demo-section">
      <h3>动态路由测试</h3>
      <div class="button-group">
        <button @click="goToUser(1)" class="btn">用户1</button>
        <button @click="goToUser(2)" class="btn">用户2</button>
        <button @click="goToUser(3)" class="btn">用户3</button>
        <button @click="goToUser(999)" class="btn">用户999</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 定义Props接收路由参数
interface Props {
  id: string
}

const props = defineProps<Props>()
const route = useRoute()
const router = useRouter()

// 模拟用户数据
const userData = {
  '1': {
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    joinDate: '2023-01-15'
  },
  '2': {
    name: '李四',
    email: 'lisi@example.com',
    role: '用户',
    joinDate: '2023-03-20'
  },
  '3': {
    name: '王五',
    email: 'wangwu@example.com',
    role: '编辑',
    joinDate: '2023-06-10'
  },
  '999': {
    name: '测试用户',
    email: 'test@example.com',
    role: '访客',
    joinDate: '2023-12-01'
  }
}

// 根据ID获取用户信息
const userInfo = computed(() => {
  return userData[props.id as keyof typeof userData] || {
    name: '未知用户',
    email: 'unknown@example.com',
    role: '未知',
    joinDate: '未知'
  }
})

const goToUser = (userId: number) => {
  router.push(`/router-demo/user/${userId}`)
}
</script>

<style scoped>
.router-user {
  text-align: center;
}

.router-user h2 {
  color: #42b883;
  margin-bottom: 15px;
}

.router-user p {
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
  margin-bottom: 15px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.info-item {
  padding: 8px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.info-item strong {
  color: #42b883;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.user-avatar {
  width: 60px;
  height: 60px;
  background-color: #42b883;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.user-details {
  flex: 1;
  text-align: left;
}

.user-details h4 {
  color: #42b883;
  margin-bottom: 8px;
  font-size: 1.2rem;
}

.user-details p {
  margin: 5px 0;
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