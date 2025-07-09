<template>
  <div class="lifecycle">
    <header class="page-header">
      <h1>生命周期学习</h1>
      <p>了解Vue组件的生命周期钩子函数</p>
    </header>
    
    <main class="page-content">
      <LifecycleDemo />
    </main>
  </div>
</template>

<script setup lang="ts">
import LifecycleDemo from '../components/LifecycleDemo.vue'
</script>

<style scoped>
.lifecycle {
  max-width: 900px;
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
</style> 