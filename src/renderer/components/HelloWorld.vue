<template>
  <div class="hello-world">
    <h2>{{ title }}</h2>
    <p>{{ message }}</p>
    <button @click="incrementCount">点击次数: {{ count }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref('欢迎使用Vue 3 + TypeScript + Electron!')
const message = ref('这是一个学习项目，用于掌握Vue和Electron的基础知识。')
const count = ref(0)

const incrementCount = (): void => {
  count.value++
}
</script>

<style scoped>
.hello-world {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #369870;
}
</style> 