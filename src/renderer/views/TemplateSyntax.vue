<template>
  <div class="template-syntax">
    <header class="page-header">
      <h1>模板语法学习</h1>
      <p>学习Vue的模板语法、指令系统和数据绑定</p>
    </header>
    
    <main class="page-content">
      <HelloWorld />
    </main>
  </div>
</template>

<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue'
</script>

<style scoped>
.template-syntax {
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