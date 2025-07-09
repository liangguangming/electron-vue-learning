<template>
  <div class="grand-child-component">
    <h4>孙组件 (使用 Inject)</h4>
    <div class="grand-child-content">
      <p>当前主题: {{ theme }}</p>
      <p>应用名称: {{ globalData.appName }}</p>
      <p>版本: {{ globalData.version }}</p>
      
      <div class="theme-indicator" :class="theme">
        主题指示器
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'

// 注入数据
const theme = inject<Ref<string>>('theme', ref('light'))
const globalData = inject<{
  appName: string
  version: string
}>('globalData', {
  appName: 'Unknown',
  version: '0.0.0'
})
</script>

<style scoped>
.grand-child-component {
  margin: 15px 0;
  padding: 15px;
  border: 2px solid #ff6b6b;
  border-radius: 8px;
  background-color: #ffe8e8;
}

.grand-child-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.theme-indicator {
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
}

.theme-indicator.light {
  background-color: #f0f0f0;
  color: #333;
}

.theme-indicator.dark {
  background-color: #333;
  color: #fff;
}

p {
  margin: 5px 0;
}
</style> 