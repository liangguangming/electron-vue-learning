<template>
  <div class="child-lifecycle">
    <h4>子组件生命周期</h4>
    <div class="child-content">
      <p>接收到的消息: {{ message }}</p>
      <p>子组件数据: {{ childData }}</p>
      <button @click="updateChildData">更新子组件数据</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

// Props
interface Props {
  message: string
}

const props = defineProps<Props>()

// Emits
interface Emits {
  (e: 'child-mounted'): void
  (e: 'child-updated'): void
  (e: 'child-unmounted'): void
}

const emit = defineEmits<Emits>()

// 子组件数据
const childData = ref('子组件初始数据')

const updateChildData = () => {
  childData.value = `子组件数据 ${Date.now()}`
}

// 生命周期钩子
onMounted(() => {
  console.log('子组件 onMounted')
  emit('child-mounted')
})

onUpdated(() => {
  console.log('子组件 onUpdated')
  emit('child-updated')
})

onUnmounted(() => {
  console.log('子组件 onUnmounted')
  emit('child-unmounted')
})
</script>

<style scoped>
.child-lifecycle {
  margin: 15px 0;
  padding: 15px;
  border: 2px solid #9c27b0;
  border-radius: 8px;
  background-color: #f3e5f5;
}

.child-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  background-color: #9c27b0;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #7b1fa2;
}

p {
  margin: 5px 0;
}
</style>
