<template>
  <div class="performance-demo">
    <h1>性能优化演示</h1>
    
    <!-- 组件懒加载演示 -->
    <section class="demo-section">
      <h2>组件懒加载</h2>
      <div class="lazy-loading-demo">
        <div class="demo-controls">
          <button @click="showHeavyComponent = !showHeavyComponent" class="btn-primary">
            {{ showHeavyComponent ? '隐藏' : '显示' }} 重型组件
          </button>
          <button @click="showMultipleComponents = !showMultipleComponents" class="btn-secondary">
            {{ showMultipleComponents ? '隐藏' : '显示' }} 多个组件
          </button>
        </div>
        
        <div class="component-container">
          <!-- 懒加载的重型组件 -->
          <Suspense v-if="showHeavyComponent">
            <template #default>
              <HeavyComponent />
            </template>
            <template #fallback>
              <div class="loading-placeholder">
                <div class="spinner"></div>
                <p>重型组件加载中...</p>
              </div>
            </template>
          </Suspense>
          
          <!-- 多个懒加载组件 -->
          <div v-if="showMultipleComponents" class="multiple-components">
            <Suspense v-for="i in 3" :key="i">
              <template #default>
                <LazyComponent :id="i" />
              </template>
              <template #fallback>
                <div class="loading-placeholder">
                  <div class="spinner"></div>
                  <p>组件 {{ i }} 加载中...</p>
                </div>
              </template>
            </Suspense>
          </div>
        </div>
      </div>
    </section>

    <!-- 虚拟滚动演示 -->
    <section class="demo-section">
      <h2>虚拟滚动</h2>
      <div class="virtual-scroll-demo">
        <div class="demo-controls">
          <label>数据量:
            <select v-model="virtualScrollDataSize">
              <option value="1000">1,000 条</option>
              <option value="5000">5,000 条</option>
              <option value="10000">10,000 条</option>
              <option value="50000">50,000 条</option>
            </select>
          </label>
          <button @click="generateVirtualData" class="btn-primary">生成数据</button>
          <button @click="clearVirtualData" class="btn-secondary">清空数据</button>
        </div>
        
        <div class="virtual-scroll-container">
          <VirtualList 
            :items="virtualScrollData" 
            :item-height="60"
            :container-height="400"
            @item-click="handleVirtualItemClick"
          />
        </div>
        
        <div class="performance-info">
          <p>渲染性能: {{ virtualScrollPerformance.renderTime }}ms</p>
          <p>内存使用: {{ virtualScrollPerformance.memoryUsage }}MB</p>
          <p>DOM节点数: {{ virtualScrollPerformance.domNodes }}</p>
        </div>
      </div>
    </section>

    <!-- 内存管理演示 -->
    <section class="demo-section">
      <h2>内存管理</h2>
      <div class="memory-management-demo">
        <div class="demo-controls">
          <button @click="createMemoryLeak" class="btn-danger">创建内存泄漏</button>
          <button @click="clearMemoryLeaks" class="btn-primary">清理内存泄漏</button>
          <button @click="forceGarbageCollection" class="btn-secondary">强制垃圾回收</button>
        </div>
        
        <div class="memory-info">
          <h3>内存使用情况</h3>
          <div class="memory-stats">
            <div class="stat-item">
              <span class="stat-label">已用内存:</span>
              <span class="stat-value">{{ memoryInfo.usedMemory }}MB</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">总内存:</span>
              <span class="stat-value">{{ memoryInfo.totalMemory }}MB</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">内存使用率:</span>
              <span class="stat-value">{{ memoryInfo.memoryUsagePercent }}%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">泄漏对象数:</span>
              <span class="stat-value">{{ memoryInfo.leakCount }}</span>
            </div>
          </div>
          
          <div class="memory-chart">
            <div class="memory-bar">
              <div 
                class="memory-fill" 
                :style="{ width: memoryInfo.memoryUsagePercent + '%' }"
                :class="{ 'high-usage': memoryInfo.memoryUsagePercent > 80 }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 缓存策略演示 -->
    <section class="demo-section">
      <h2>缓存策略</h2>
      <div class="cache-demo">
        <div class="demo-controls">
          <button @click="fetchDataWithCache" class="btn-primary">获取数据(带缓存)</button>
          <button @click="fetchDataWithoutCache" class="btn-secondary">获取数据(无缓存)</button>
          <button @click="clearCache" class="btn-danger">清空缓存</button>
        </div>
        
        <div class="cache-info">
          <h3>缓存状态</h3>
          <div class="cache-stats">
            <div class="stat-item">
              <span class="stat-label">缓存命中率:</span>
              <span class="stat-value">{{ cacheInfo.hitRate }}%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">缓存大小:</span>
              <span class="stat-value">{{ cacheInfo.size }} 项</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">平均响应时间:</span>
              <span class="stat-value">{{ cacheInfo.avgResponseTime }}ms</span>
            </div>
          </div>
          
          <div class="cache-results">
            <h4>最近请求结果</h4>
            <div v-for="result in cacheResults" :key="result.id" class="cache-result">
              <span class="result-id">{{ result.id }}</span>
              <span class="result-time">{{ result.time }}ms</span>
              <span class="result-cache" :class="result.fromCache ? 'hit' : 'miss'">
                {{ result.fromCache ? '缓存命中' : '缓存未命中' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 性能监控 -->
    <section class="demo-section">
      <h2>性能监控</h2>
      <div class="performance-monitor">
        <div class="monitor-controls">
          <button @click="startMonitoring" :disabled="isMonitoring" class="btn-primary">
            开始监控
          </button>
          <button @click="stopMonitoring" :disabled="!isMonitoring" class="btn-secondary">
            停止监控
          </button>
          <button @click="exportPerformanceData" class="btn-accent">
            导出数据
          </button>
        </div>
        
        <div class="performance-metrics">
          <div class="metric-card">
            <h4>FPS (帧率)</h4>
            <div class="metric-value">{{ performanceMetrics.fps }}</div>
            <div class="metric-chart">
              <div 
                v-for="(fps, index) in performanceMetrics.fpsHistory" 
                :key="index"
                class="fps-bar"
                :style="{ height: (fps / 60) * 100 + '%' }"
                :class="{ 'low-fps': fps < 30 }"
              ></div>
            </div>
          </div>
          
          <div class="metric-card">
            <h4>内存使用</h4>
            <div class="metric-value">{{ performanceMetrics.memory }}MB</div>
            <div class="metric-trend" :class="performanceMetrics.memoryTrend">
              {{ performanceMetrics.memoryTrend === 'up' ? '↑' : '↓' }}
            </div>
          </div>
          
          <div class="metric-card">
            <h4>CPU使用率</h4>
            <div class="metric-value">{{ performanceMetrics.cpu }}%</div>
            <div class="cpu-bar">
              <div 
                class="cpu-fill" 
                :style="{ width: performanceMetrics.cpu + '%' }"
                :class="{ 'high-cpu': performanceMetrics.cpu > 80 }"
              ></div>
            </div>
          </div>
        </div>
        
        <div class="performance-log">
          <h4>性能日志</h4>
          <div class="log-container">
            <div v-for="log in performanceLogs" :key="log.id" class="log-entry" :class="log.level">
              <span class="log-time">{{ log.time }}</span>
              <span class="log-message">{{ log.message }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { defineAsyncComponent } from 'vue'

// 懒加载组件
const HeavyComponent = defineAsyncComponent(() => import('../components/HeavyComponent.vue'))
const LazyComponent = defineAsyncComponent(() => import('../components/LazyComponent.vue'))
const VirtualList = defineAsyncComponent(() => import('../components/VirtualList.vue'))

// 组件懒加载状态
const showHeavyComponent = ref(false)
const showMultipleComponents = ref(false)

// 虚拟滚动数据
const virtualScrollDataSize = ref(1000)
const virtualScrollData = ref<any[]>([])
const virtualScrollPerformance = reactive({
  renderTime: 0,
  memoryUsage: 0,
  domNodes: 0
})

// 内存管理
const memoryInfo = reactive({
  usedMemory: 0,
  totalMemory: 0,
  memoryUsagePercent: 0,
  leakCount: 0
})

// 缓存策略
const cacheInfo = reactive({
  hitRate: 0,
  size: 0,
  avgResponseTime: 0
})
const cacheResults = ref<any[]>([])

// 性能监控
const isMonitoring = ref(false)
const performanceMetrics = reactive({
  fps: 0,
  fpsHistory: [] as number[],
  memory: 0,
  memoryTrend: 'stable' as 'up' | 'down' | 'stable',
  cpu: 0
})
const performanceLogs = ref<any[]>([])

// 内存泄漏对象
let memoryLeaks: any[] = []

// 生成虚拟滚动数据
const generateVirtualData = () => {
  const startTime = performance.now()
  const size = parseInt(virtualScrollDataSize.value.toString())
  
  virtualScrollData.value = Array.from({ length: size }, (_, index) => ({
    id: index + 1,
    name: `项目 ${index + 1}`,
    description: `这是第 ${index + 1} 个项目的详细描述`,
    status: ['活跃', '暂停', '完成'][Math.floor(Math.random() * 3)],
    priority: ['高', '中', '低'][Math.floor(Math.random() * 3)],
    createdAt: new Date(Date.now() - Math.random() * 10000000000)
  }))
  
  const endTime = performance.now()
  virtualScrollPerformance.renderTime = Math.round(endTime - startTime)
  
  // 模拟内存使用
  virtualScrollPerformance.memoryUsage = Math.round(size * 0.1)
  virtualScrollPerformance.domNodes = Math.min(size, 20) // 虚拟滚动只渲染可见项
  
  addPerformanceLog('info', `生成了 ${size} 条虚拟滚动数据，耗时 ${virtualScrollPerformance.renderTime}ms`)
}

// 清空虚拟滚动数据
const clearVirtualData = () => {
  virtualScrollData.value = []
  virtualScrollPerformance.renderTime = 0
  virtualScrollPerformance.memoryUsage = 0
  virtualScrollPerformance.domNodes = 0
  addPerformanceLog('info', '清空了虚拟滚动数据')
}

// 处理虚拟列表项点击
const handleVirtualItemClick = (item: any) => {
  addPerformanceLog('info', `点击了项目: ${item.name}`)
}

// 创建内存泄漏
const createMemoryLeak = () => {
  // 创建循环引用
  const leakObject = {
    data: new Array(10000).fill('memory leak data'),
    circular: null as any
  }
  leakObject.circular = leakObject
  
  memoryLeaks.push(leakObject)
  memoryInfo.leakCount = memoryLeaks.length
  
  addPerformanceLog('warning', `创建了内存泄漏对象 ${memoryInfo.leakCount}`)
  updateMemoryInfo()
}

// 清理内存泄漏
const clearMemoryLeaks = () => {
  memoryLeaks = []
  memoryInfo.leakCount = 0
  addPerformanceLog('info', '清理了所有内存泄漏对象')
  updateMemoryInfo()
}

// 强制垃圾回收
const forceGarbageCollection = () => {
  if (window.gc) {
    window.gc()
    addPerformanceLog('info', '执行了强制垃圾回收')
  } else {
    addPerformanceLog('warning', '当前环境不支持强制垃圾回收')
  }
  updateMemoryInfo()
}

// 更新内存信息
const updateMemoryInfo = () => {
  if ((performance as any).memory) {
    const memory = (performance as any).memory
    memoryInfo.usedMemory = Math.round(memory.usedJSHeapSize / 1024 / 1024)
    memoryInfo.totalMemory = Math.round(memory.totalJSHeapSize / 1024 / 1024)
    memoryInfo.memoryUsagePercent = Math.round((memoryInfo.usedMemory / memoryInfo.totalMemory) * 100)
  }
}

// 缓存相关
const cache = new Map<string, any>()
let cacheHits = 0
let cacheMisses = 0

const fetchDataWithCache = async () => {
  const key = `data_${Date.now()}`
  const startTime = performance.now()
  
  if (cache.has(key)) {
    cacheHits++
    const result = cache.get(key)
    const endTime = performance.now()
    
    cacheResults.value.unshift({
      id: key,
      time: Math.round(endTime - startTime),
      fromCache: true
    })
    
    addPerformanceLog('info', `缓存命中: ${key}`)
  } else {
    cacheMisses++
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500))
    
    const data = { id: key, content: `数据内容 ${key}` }
    cache.set(key, data)
    
    const endTime = performance.now()
    cacheResults.value.unshift({
      id: key,
      time: Math.round(endTime - startTime),
      fromCache: false
    })
    
    addPerformanceLog('info', `缓存未命中: ${key}`)
  }
  
  // 更新缓存统计
  cacheInfo.hitRate = Math.round((cacheHits / (cacheHits + cacheMisses)) * 100)
  cacheInfo.size = cache.size
  cacheInfo.avgResponseTime = Math.round(
    cacheResults.value.slice(0, 10).reduce((sum, r) => sum + r.time, 0) / 
    Math.min(cacheResults.value.length, 10)
  )
  
  // 限制缓存结果数量
  if (cacheResults.value.length > 20) {
    cacheResults.value = cacheResults.value.slice(0, 20)
  }
}

const fetchDataWithoutCache = async () => {
  const key = `data_${Date.now()}`
  const startTime = performance.now()
  
  // 模拟API调用
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500))
  
  const endTime = performance.now()
  cacheResults.value.unshift({
    id: key,
    time: Math.round(endTime - startTime),
    fromCache: false
  })
  
  addPerformanceLog('info', `无缓存请求: ${key}`)
}

const clearCache = () => {
  cache.clear()
  cacheHits = 0
  cacheMisses = 0
  cacheInfo.hitRate = 0
  cacheInfo.size = 0
  cacheResults.value = []
  addPerformanceLog('info', '清空了所有缓存')
}

// 性能监控
let monitoringInterval: number | null = null
let frameCount = 0
let lastTime = performance.now()

const startMonitoring = () => {
  isMonitoring.value = true
  addPerformanceLog('info', '开始性能监控')
  
  monitoringInterval = window.setInterval(() => {
    updatePerformanceMetrics()
  }, 1000)
  
  // 监控FPS
  const monitorFPS = () => {
    frameCount++
    const currentTime = performance.now()
    
    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
      performanceMetrics.fps = fps
      performanceMetrics.fpsHistory.push(fps)
      
      if (performanceMetrics.fpsHistory.length > 60) {
        performanceMetrics.fpsHistory.shift()
      }
      
      frameCount = 0
      lastTime = currentTime
    }
    
    if (isMonitoring.value) {
      requestAnimationFrame(monitorFPS)
    }
  }
  
  requestAnimationFrame(monitorFPS)
}

const stopMonitoring = () => {
  isMonitoring.value = false
  if (monitoringInterval) {
    clearInterval(monitoringInterval)
    monitoringInterval = null
  }
  addPerformanceLog('info', '停止性能监控')
}

const updatePerformanceMetrics = () => {
  // 更新内存信息
  updateMemoryInfo()
  performanceMetrics.memory = memoryInfo.usedMemory
  
  // 模拟CPU使用率
  performanceMetrics.cpu = Math.round(Math.random() * 100)
  
  // 更新内存趋势
  const prevMemory = performanceMetrics.memory
  if (performanceMetrics.memory > prevMemory) {
    performanceMetrics.memoryTrend = 'up'
  } else if (performanceMetrics.memory < prevMemory) {
    performanceMetrics.memoryTrend = 'down'
  } else {
    performanceMetrics.memoryTrend = 'stable'
  }
}

const exportPerformanceData = () => {
  const data = {
    timestamp: new Date().toISOString(),
    metrics: performanceMetrics,
    logs: performanceLogs.value,
    memoryInfo,
    cacheInfo
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `performance-data-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
  
  addPerformanceLog('info', '导出了性能数据')
}

const addPerformanceLog = (level: 'info' | 'warning' | 'error', message: string) => {
  performanceLogs.value.unshift({
    id: Date.now(),
    time: new Date().toLocaleTimeString(),
    level,
    message
  })
  
  if (performanceLogs.value.length > 100) {
    performanceLogs.value = performanceLogs.value.slice(0, 100)
  }
}

// 生命周期
onMounted(() => {
  generateVirtualData()
  updateMemoryInfo()
  addPerformanceLog('info', '性能优化演示页面已加载')
})

onUnmounted(() => {
  stopMonitoring()
  clearMemoryLeaks()
})
</script>

<style scoped>
.performance-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 8px;
  background: var(--bg-secondary, #f5f5f5);
}

.demo-section h2 {
  margin-top: 0;
  color: var(--text-primary, #333);
  border-bottom: 2px solid var(--border-color, #e0e0e0);
  padding-bottom: 10px;
}

/* 组件懒加载样式 */
.demo-controls {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-primary {
  background: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-danger {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-accent {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.component-container {
  min-height: 200px;
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 4px;
  padding: 20px;
  background: white;
}

.loading-placeholder {
  text-align: center;
  padding: 40px;
  color: var(--text-secondary, #666);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.multiple-components {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

/* 虚拟滚动样式 */
.virtual-scroll-container {
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 4px;
  background: white;
  overflow: hidden;
}

.performance-info {
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.performance-info p {
  background: white;
  padding: 10px;
  border-radius: 4px;
  margin: 0;
  text-align: center;
  font-weight: bold;
}

/* 内存管理样式 */
.memory-info {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.memory-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

.stat-label {
  font-weight: bold;
  color: var(--text-primary, #333);
}

.stat-value {
  color: #42b883;
  font-weight: bold;
}

.memory-chart {
  margin-top: 20px;
}

.memory-bar {
  width: 100%;
  height: 20px;
  background: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
}

.memory-fill {
  height: 100%;
  background: linear-gradient(90deg, #42b883, #369870);
  transition: width 0.3s ease;
}

.memory-fill.high-usage {
  background: linear-gradient(90deg, #ff6b6b, #ff5252);
}

/* 缓存策略样式 */
.cache-info {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.cache-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.cache-results {
  max-height: 300px;
  overflow-y: auto;
}

.cache-result {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #e9ecef;
}

.result-cache.hit {
  color: #28a745;
  font-weight: bold;
}

.result-cache.miss {
  color: #dc3545;
  font-weight: bold;
}

/* 性能监控样式 */
.performance-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.metric-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.metric-value {
  font-size: 2rem;
  font-weight: bold;
  color: #42b883;
  margin: 10px 0;
}

.metric-chart {
  height: 60px;
  display: flex;
  align-items: end;
  gap: 2px;
  margin-top: 10px;
}

.fps-bar {
  flex: 1;
  background: #42b883;
  min-height: 2px;
  border-radius: 1px;
}

.fps-bar.low-fps {
  background: #ff6b6b;
}

.metric-trend {
  font-size: 1.5rem;
  margin-top: 10px;
}

.metric-trend.up {
  color: #ff6b6b;
}

.metric-trend.down {
  color: #42b883;
}

.cpu-bar {
  width: 100%;
  height: 10px;
  background: #e9ecef;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 10px;
}

.cpu-fill {
  height: 100%;
  background: #42b883;
  transition: width 0.3s ease;
}

.cpu-fill.high-cpu {
  background: #ff6b6b;
}

.performance-log {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.log-container {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 10px;
}

.log-entry {
  padding: 5px 0;
  border-bottom: 1px solid #f8f9fa;
  font-family: monospace;
  font-size: 0.9rem;
}

.log-entry.info {
  color: #17a2b8;
}

.log-entry.warning {
  color: #ffc107;
}

.log-entry.error {
  color: #dc3545;
}

.log-time {
  color: #6c757d;
  margin-right: 10px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .demo-controls {
    flex-direction: column;
  }
  
  .memory-stats,
  .cache-stats,
  .performance-metrics {
    grid-template-columns: 1fr;
  }
  
  .multiple-components {
    grid-template-columns: 1fr;
  }
}
</style> 