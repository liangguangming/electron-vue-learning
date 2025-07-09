<template>
  <div class="components">
    <header class="page-header">
      <h1>组件通信学习</h1>
      <p>学习Props、Emit、Provide/Inject等通信方式</p>
    </header>
    
    <main class="page-content">
      <ParentComponent />
    </main>
  </div>
</template>

<script setup lang="ts">
import ParentComponent from '../components/ParentComponent.vue'
</script>

<style scoped>
.components {
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