<template>
  <div class="lazy-component">
    <h3>懒加载组件 {{ id }}</h3>
    <p>这是一个通过懒加载方式加载的组件。</p>
    
    <div class="component-content">
      <div class="info-card">
        <h4>组件信息</h4>
        <ul>
          <li><strong>组件ID:</strong> {{ id }}</li>
          <li><strong>加载时间:</strong> {{ loadTime }}ms</li>
          <li><strong>加载状态:</strong> {{ loadStatus }}</li>
          <li><strong>创建时间:</strong> {{ createdAt }}</li>
        </ul>
      </div>
      
      <div class="action-card">
        <h4>组件操作</h4>
        <div class="action-buttons">
          <button @click="incrementCounter" class="btn-primary">
            计数器: {{ counter }}
          </button>
          <button @click="toggleTheme" class="btn-secondary">
            切换主题
          </button>
          <button @click="showMessage" class="btn-accent">
            显示消息
          </button>
        </div>
      </div>
      
      <div class="data-card">
        <h4>模拟数据</h4>
        <div class="data-grid">
          <div 
            v-for="item in dataItems" 
            :key="item.id"
            class="data-item"
            :class="{ 'highlighted': item.highlighted }"
            @click="toggleHighlight(item)"
          >
            <span class="item-id">{{ item.id }}</span>
            <span class="item-name">{{ item.name }}</span>
            <span class="item-value">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="component-footer">
      <p>组件已加载并正常运行</p>
      <small>懒加载组件示例 - 用于演示组件懒加载功能</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

// Props
interface Props {
  id: number
}

const props = defineProps<Props>()

// 组件状态
const loadTime = ref(0)
const loadStatus = ref('加载中...')
const createdAt = ref('')
const counter = ref(0)
const theme = ref('light')

// 模拟数据
const dataItems = ref<any[]>([])

// 组件挂载
onMounted(() => {
  const startTime = performance.now()
  
  // 模拟异步加载
  setTimeout(() => {
    // 生成模拟数据
    dataItems.value = Array.from({ length: 6 }, (_, index) => ({
      id: index + 1,
      name: `数据项 ${index + 1}`,
      value: Math.floor(Math.random() * 100),
      highlighted: false
    }))
    
    const endTime = performance.now()
    loadTime.value = Math.round(endTime - startTime)
    loadStatus.value = '已加载'
    createdAt.value = new Date().toLocaleString()
  }, Math.random() * 1000 + 500) // 随机延迟500-1500ms
})

// 组件方法
const incrementCounter = () => {
  counter.value++
}

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const showMessage = () => {
  alert(`这是来自组件 ${props.id} 的消息！`)
}

const toggleHighlight = (item: any) => {
  item.highlighted = !item.highlighted
}
</script>

<style scoped>
.lazy-component {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-left: 4px solid #42b883;
}

.lazy-component h3 {
  color: #42b883;
  margin-bottom: 10px;
}

.lazy-component p {
  color: #666;
  margin-bottom: 20px;
}

.component-content {
  display: grid;
  gap: 20px;
  margin-bottom: 20px;
}

.info-card,
.action-card,
.data-card {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
}

.info-card h4,
.action-card h4,
.data-card h4 {
  margin-bottom: 10px;
  color: #333;
  font-size: 1rem;
}

.info-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-card li {
  padding: 5px 0;
  border-bottom: 1px solid #e9ecef;
}

.info-card li:last-child {
  border-bottom: none;
}

.action-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary,
.btn-accent {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #42b883;
  color: white;
}

.btn-primary:hover {
  background: #369870;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-accent {
  background: #ff6b6b;
  color: white;
}

.btn-accent:hover {
  background: #ff5252;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.data-item {
  background: white;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.data-item:hover {
  border-color: #42b883;
  transform: translateY(-1px);
}

.data-item.highlighted {
  background: #e8f5e8;
  border-color: #42b883;
}

.item-id {
  font-size: 0.8rem;
  color: #666;
}

.item-name {
  font-weight: bold;
  color: #333;
}

.item-value {
  font-size: 1.2rem;
  color: #42b883;
  font-weight: bold;
}

.component-footer {
  text-align: center;
  padding-top: 15px;
  border-top: 1px solid #e9ecef;
}

.component-footer p {
  margin: 0 0 5px 0;
  color: #333;
}

.component-footer small {
  color: #666;
  font-size: 0.8rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .action-buttons {
    flex-direction: column;
  }
  
  .data-grid {
    grid-template-columns: 1fr;
  }
}
</style> 