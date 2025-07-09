<template>
  <div class="lifecycle-demo">
    <h2>Vue 3 生命周期学习</h2>
    
    <!-- 生命周期状态显示 -->
    <section class="demo-section">
      <h3>生命周期状态</h3>
      <div class="lifecycle-status">
        <p>组件状态: {{ componentStatus }}</p>
        <p>数据: {{ data }}</p>
        <p>DOM 元素: {{ domElement ? '已挂载' : '未挂载' }}</p>
      </div>
    </section>

    <!-- 生命周期日志 -->
    <section class="demo-section">
      <h3>生命周期日志</h3>
      <div class="lifecycle-logs">
        <div 
          v-for="(log, index) in lifecycleLogs" 
          :key="index"
          class="log-item"
          :class="log.type"
        >
          <span class="log-time">{{ log.time }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
      </div>
      <button @click="clearLogs">清空日志</button>
    </section>

    <!-- 交互控制 -->
    <section class="demo-section">
      <h3>交互控制</h3>
      <div class="controls">
        <button @click="updateData">更新数据</button>
        <button @click="toggleComponent" :class="{ 'danger': isVisible }">
          {{ isVisible ? '销毁组件' : '创建组件' }}
        </button>
        <button @click="forceUpdate">强制更新</button>
      </div>
    </section>

    <!-- 移除子组件部分，避免导入错误 -->
         <!-- 子组件示例 -->
    <section class="demo-section" v-if="isVisible">
      <h3>子组件生命周期</h3>
      <ChildLifecycle 
        :key="childKey"
        :message="data"
        @child-mounted="onChildMounted"
        @child-updated="onChildUpdated"
        @child-unmounted="onChildUnmounted"
      />
    </section>

  </div>
</template>

<script setup lang="ts">
import { 
  ref, 
  onMounted, 
  onUpdated, 
  onUnmounted, 
  onBeforeMount, 
  onBeforeUpdate, 
  onBeforeUnmount,
  nextTick
} from 'vue'

import ChildLifecycle from './ChildLifecycle.vue'


// 响应式数据
const componentStatus = ref('初始化中...')
const data = ref('初始数据')
const domElement = ref<HTMLElement | null>(null)
const isVisible = ref(true)
const childKey = ref(0)

// 生命周期日志
const lifecycleLogs = ref<Array<{
  time: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
}>>([])

// 添加日志的辅助函数
const addLog = (message: string, type: 'info' | 'warning' | 'success' | 'error' = 'info') => {
  const time = new Date().toLocaleTimeString()
  lifecycleLogs.value.push({ time, message, type })
  console.log(`[${time}] ${message}`)
}

// 清空日志
const clearLogs = () => {
  lifecycleLogs.value = []
}

// 更新数据
const updateData = () => {
  data.value = `更新后的数据 ${Date.now()}`
  addLog('数据已更新', 'success')
}

// 切换组件显示
const toggleComponent = () => {
  isVisible.value = !isVisible.value
  if (isVisible.value) {
    childKey.value++ // 强制重新创建子组件
    addLog('子组件已创建', 'success')
  } else {
    addLog('子组件即将销毁', 'warning')
  }
}

// 强制更新
const forceUpdate = async () => {
  addLog('强制更新开始', 'info')
  await nextTick()
  addLog('强制更新完成', 'success')
}

// 子组件事件处理
const onChildMounted = () => {
  addLog('子组件已挂载', 'success')
}

const onChildUpdated = () => {
  addLog('子组件已更新', 'info')
}

const onChildUnmounted = () => {
  addLog('子组件已卸载', 'warning')
}

// ========== 生命周期钩子 ==========

// 1. 创建阶段
console.log('组件开始创建')

// 2. 挂载前
onBeforeMount(() => {
  console.log('onBeforeMount: 组件即将挂载')
  componentStatus.value = '挂载中...'
})

// 3. 挂载后
onMounted(() => {
  console.log('onMounted: 组件已挂载到DOM')
  componentStatus.value = '已挂载'
  domElement.value = document.querySelector('.lifecycle-demo')
  
  // 在 onMounted 中添加初始日志
  addLog('组件开始创建', 'info')
  addLog('onBeforeMount: 组件即将挂载', 'info')
  addLog('onMounted: 组件已挂载到DOM', 'success')
  
  // 模拟异步操作
  setTimeout(() => {
    addLog('异步操作完成', 'info')
  }, 1000)
})

// 4. 更新前 - 只使用 console.log，避免递归
onBeforeUpdate(() => {
  console.log('onBeforeUpdate: 组件即将更新')
})

// 5. 更新后 - 只使用 console.log，避免递归
onUpdated(() => {
  console.log('onUpdated: 组件已更新')
})

// 6. 卸载前
onBeforeUnmount(() => {
  console.log('onBeforeUnmount: 组件即将卸载')
  addLog('onBeforeUnmount: 组件即将卸载', 'warning')
  componentStatus.value = '卸载中...'
})

// 7. 卸载后
onUnmounted(() => {
  console.log('onUnmounted: 组件已卸载')
  addLog('onUnmounted: 组件已卸载', 'error')
  componentStatus.value = '已卸载'
  domElement.value = null
})
</script>

<style scoped>
.lifecycle-demo {
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

.lifecycle-status {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.lifecycle-logs {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
}

.log-item {
  display: flex;
  gap: 10px;
  padding: 5px;
  border-radius: 4px;
  margin-bottom: 5px;
  font-family: monospace;
  font-size: 12px;
}

.log-item.info {
  background-color: #e3f2fd;
  color: #1976d2;
}

.log-item.warning {
  background-color: #fff3e0;
  color: #f57c00;
}

.log-item.success {
  background-color: #e8f5e8;
  color: #388e3c;
}

.log-item.error {
  background-color: #ffebee;
  color: #d32f2f;
}

.log-time {
  font-weight: bold;
  min-width: 80px;
}

.controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #369870;
}

button.danger {
  background-color: #ff6b6b;
}

button.danger:hover {
  background-color: #ee5a52;
}

p {
  margin: 5px 0;
}
</style>
