<template>
  <div class="child-component">
    <h4>子组件</h4>
    <div class="child-content">
      <p>接收到的消息: {{ message }}</p>
      <p>接收到的用户: {{ user.name }} ({{ user.age }}岁)</p>
      
      <button @click="sendMessage">发送消息给父组件</button>
      <button @click="updateUser">更新用户信息</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 定义 Props
interface Props {
  message: number
  user: {
    name: string
    age: number
  }
}

const props = defineProps<Props>()

// 定义 Emits
interface Emits {
  (e: 'update-message', value: number): void
  (e: 'user-change', user: { name: string; age: number }): void
}

const emit = defineEmits<Emits>()

// 子组件内部状态
const localCounter = ref(0)

const sendMessage = () => {
  localCounter.value++
  emit('update-message', props.message + localCounter.value)
}

const updateUser = () => {
  const newUser = {
    name: `子组件用户${Date.now()}`,
    age: Math.floor(Math.random() * 50) + 20
  }
  emit('user-change', newUser)
}
</script>

<style scoped>
.child-component {
  margin: 15px 0;
  padding: 15px;
  border: 2px solid #42b883;
  border-radius: 8px;
  background-color: #e8f5e8;
}

.child-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin: 2px;
}

button:hover {
  background-color: #369870;
}

p {
  margin: 5px 0;
}
</style> 