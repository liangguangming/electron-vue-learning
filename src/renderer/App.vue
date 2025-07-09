<template>
  <div id="app">
    <header>
      <h1>Vue Electron Learning</h1>
      <p>当前平台: {{ platform }}</p>
      <p>Electron版本: {{ electronVersion }}</p>
    </header>
    <main>
      <LifecycleDemo />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LifecycleDemo from './components/LifecycleDemo.vue'

const platform = ref('')
const electronVersion = ref('')

onMounted(() => {
  // 从Electron API获取信息
  if (window.electronAPI) {
    platform.value = window.electronAPI.platform
    electronVersion.value = window.electronAPI.getVersion()
  }
})
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
}

header {
  margin-bottom: 30px;
}

h1 {
  color: #42b883;
}
</style> 