<template>
  <div class="reactive-demo">
    <h2>Vue 3 响应式数据学习</h2>
    
    <!-- ref 示例 -->
    <section class="demo-section">
      <h3>1. ref() - 基础响应式</h3>
      <div class="demo-content">
        <p>计数器: {{ count }}</p>
        <button @click="increment">增加</button>
        <button @click="decrement">减少</button>
        <button @click="reset">重置</button>
      </div>
    </section>

    <!-- reactive 示例 -->
    <section class="demo-section">
      <h3>2. reactive() - 对象响应式</h3>
      <div class="demo-content">
        <p>用户信息:</p>
        <input v-model="user.name" placeholder="姓名" />
        <input v-model="user.age" type="number" placeholder="年龄" />
        <p>姓名: {{ user.name }}, 年龄: {{ user.age }}</p>
        <button @click="updateUser">更新用户</button>
      </div>
    </section>

    <!-- computed 示例 -->
    <section class="demo-section">
      <h3>3. computed() - 计算属性</h3>
      <div class="demo-content">
        <p>价格: {{ price }}</p>
        <p>数量: {{ quantity }}</p>
        <p>总价: {{ totalPrice }}</p>
        <button @click="price += 10">价格+10</button>
        <button @click="quantity += 1">数量+1</button>
      </div>
    </section>

    <!-- watch 示例 -->
    <section class="demo-section">
      <h3>4. watch() - 侦听器</h3>
      <div class="demo-content">
        <p>监听值: {{ watchValue }}</p>
        <p>变化记录: {{ watchLog }}</p>
        <button @click="watchValue = Math.random()">随机值</button>
        <button @click="watchLog = []">清空记录</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'

// 1. ref() - 基础响应式
const count = ref(0)
const increment = () => count.value++
const decrement = () => count.value--
const reset = () => count.value = 0

// 2. reactive() - 对象响应式
const user = reactive({
  name: '张三',
  age: 25
})

const updateUser = () => {
  user.name = '李四'
  user.age = 30
}

// 3. computed() - 计算属性
const price = ref(100)
const quantity = ref(2)
const totalPrice = computed(() => price.value * quantity.value)

// 4. watch() - 侦听器
const watchValue = ref(0)
const watchLog = ref<string[]>([])

watch(watchValue, (newValue, oldValue) => {
  watchLog.value.push(`值从 ${oldValue} 变为 ${newValue}`)
}, { immediate: true })
</script>

<style scoped>
.reactive-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.demo-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.demo-section h3 {
  color: #42b883;
  margin-bottom: 15px;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.demo-content input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 5px 0;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}

button:hover {
  background-color: #369870;
}

p {
  margin: 5px 0;
}
</style> 