<template>
  <div class="reactive">
    <header class="page-header">
      <h1>响应式数据学习</h1>
      <p>掌握ref、reactive、computed、watch等响应式API</p>
    </header>
    
    <main class="page-content">
      <ReactiveDemo />
    </main>
  </div>
</template>

<script setup lang="ts">
import ReactiveDemo from '../components/ReactiveDemo.vue'
</script>

<style scoped>
.reactive {
  max-width: 800px;
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