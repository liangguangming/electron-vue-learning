<template>
  <div class="parent-component">
    <h2>父组件 - 组件通信学习</h2>
    
    <!-- Props 和 Emit 示例 -->
    <section class="demo-section">
      <h3>1. Props 和 Emit - 父子通信</h3>
      <div class="demo-content">
        <p>父组件数据: {{ parentData }}</p>
        <button @click="parentData++">父组件数据+1</button>
        
        <ChildComponent 
          :message="parentData"
          :user="userInfo"
          @update-message="handleMessageUpdate"
          @user-change="handleUserChange"
        />
      </div>
    </section>

    <!-- Provide/Inject 示例 -->
    <section class="demo-section">
      <h3>2. Provide/Inject - 跨层级通信</h3>
      <div class="demo-content">
        <p>全局主题: {{ theme }}</p>
        <button @click="toggleTheme">切换主题</button>
        
        <GrandChildComponent />
      </div>
    </section>

    <!-- 事件总线示例 -->
    <section class="demo-section">
      <h3>3. 事件总线 - 任意组件通信</h3>
      <div class="demo-content">
        <p>事件总线消息: {{ busMessage }}</p>
        <button @click="sendBusMessage">发送事件总线消息</button>
        
        <SiblingComponent />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
import ChildComponent from './ChildComponent.vue'
import GrandChildComponent from './GrandChildComponent.vue'
import SiblingComponent from './SiblingComponent.vue'

// Props 和 Emit 相关数据
const parentData = ref(100)
const userInfo = ref({
  name: '父组件用户',
  age: 30
})

const handleMessageUpdate = (newMessage: number) => {
  console.log('子组件发送的消息:', newMessage)
  parentData.value = newMessage
}

const handleUserChange = (newUser: { name: string; age: number }) => {
  console.log('子组件发送的用户信息:', newUser)
  userInfo.value = newUser
}

// Provide/Inject 相关数据
const theme = ref('light')
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// 提供数据给后代组件
provide('theme', theme)
provide('globalData', {
  appName: 'Vue Electron Learning',
  version: '1.0.0'
})

// 事件总线相关数据
const busMessage = ref('')

// 模拟事件总线
const eventBus = {
  listeners: {} as Record<string, Function[]>,
  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  },
  emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data))
    }
  }
}

// 提供事件总线给所有组件
provide('eventBus', eventBus)

const sendBusMessage = () => {
  const message = `来自父组件的消息: ${Date.now()}`
  eventBus.emit('custom-event', message)
}

onMounted(() => {
  // 监听事件总线消息
  eventBus.on('sibling-message', (message: string) => {
    busMessage.value = message
  })
})
</script>

<style scoped>
.parent-component {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.demo-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.demo-section h3 {
  color: #42b883;
  margin-bottom: 15px;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}

button:hover {
  background-color: #369870;
}

p {
  margin: 5px 0;
}
</style> 