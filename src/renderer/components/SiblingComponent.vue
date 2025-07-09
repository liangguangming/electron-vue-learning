<template>
  <div class="sibling-component">
    <h4>兄弟组件 (事件总线)</h4>
    <div class="sibling-content">
      <p>接收到的消息: {{ receivedMessage }}</p>
      <button @click="sendToParent">发送消息给父组件</button>
      <button @click="sendToSibling">发送消息给兄弟组件</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'

// 注入事件总线
const eventBus = inject<any>('eventBus')

const receivedMessage = ref('')

const sendToParent = () => {
  const message = `来自兄弟组件的消息: ${Date.now()}`
  eventBus.emit('sibling-message', message)
}

const sendToSibling = () => {
  const message = `兄弟组件内部消息: ${Date.now()}`
  eventBus.emit('custom-event', message)
}

onMounted(() => {
  // 监听事件总线消息
  eventBus.on('custom-event', (message: string) => {
    receivedMessage.value = message
  })
})
</script>

<style scoped>
.sibling-component {
  margin: 15px 0;
  padding: 15px;
  border: 2px solid #4ecdc4;
  border-radius: 8px;
  background-color: #e8f8f5;
}

.sibling-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  background-color: #4ecdc4;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin: 2px;
}

button:hover {
  background-color: #45b7aa;
}

p {
  margin: 5px 0;
}
</style> 