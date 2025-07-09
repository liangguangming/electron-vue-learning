<template>
  <div class="heavy-component">
    <h3>重型组件</h3>
    <p>这是一个模拟的重型组件，包含大量数据和复杂计算。</p>
    
    <!-- 复杂的数据表格 -->
    <div class="data-table">
      <h4>数据表格 ({{ tableData.length }} 行)</h4>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>状态</th>
            <th>进度</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>
              <span class="status-badge" :class="item.status">
                {{ item.status }}
              </span>
            </td>
            <td>
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  :style="{ width: item.progress + '%' }"
                  :class="{ 'completed': item.progress === 100 }"
                ></div>
              </div>
              <span class="progress-text">{{ item.progress }}%</span>
            </td>
            <td>{{ formatDate(item.createdAt) }}</td>
            <td>
              <button @click="handleAction(item)" class="action-btn">
                操作
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- 图表展示 -->
    <div class="charts-section">
      <h4>图表展示</h4>
      <div class="charts-grid">
        <div class="chart-container">
          <h5>月度统计</h5>
          <div class="chart">
            <div 
              v-for="(value, month) in monthlyStats" 
              :key="month"
              class="chart-bar"
              :style="{ height: (value / maxMonthlyValue) * 100 + '%' }"
            >
              <span class="chart-label">{{ month }}</span>
              <span class="chart-value">{{ value }}</span>
            </div>
          </div>
        </div>
        
        <div class="chart-container">
          <h5>分类分布</h5>
          <div class="pie-chart">
            <div 
              v-for="(value, category) in categoryStats" 
              :key="category"
              class="pie-segment"
              :style="{ 
                transform: `rotate(${getPieAngle(category)}deg)`,
                background: getCategoryColor(category)
              }"
            ></div>
          </div>
          <div class="pie-legend">
            <div 
              v-for="(value, category) in categoryStats" 
              :key="category"
              class="legend-item"
            >
              <span 
                class="legend-color" 
                :style="{ background: getCategoryColor(category) }"
              ></span>
              <span class="legend-label">{{ category }}</span>
              <span class="legend-value">{{ value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 实时数据更新 -->
    <div class="realtime-section">
      <h4>实时数据</h4>
      <div class="realtime-grid">
        <div class="metric-card">
          <h5>活跃用户</h5>
          <div class="metric-value">{{ realtimeData.activeUsers }}</div>
          <div class="metric-trend" :class="realtimeData.userTrend">
            {{ realtimeData.userTrend === 'up' ? '↑' : '↓' }}
          </div>
        </div>
        
        <div class="metric-card">
          <h5>处理任务</h5>
          <div class="metric-value">{{ realtimeData.processingTasks }}</div>
          <div class="metric-trend" :class="realtimeData.taskTrend">
            {{ realtimeData.taskTrend === 'up' ? '↑' : '↓' }}
          </div>
        </div>
        
        <div class="metric-card">
          <h5>系统负载</h5>
          <div class="metric-value">{{ realtimeData.systemLoad }}%</div>
          <div class="load-bar">
            <div 
              class="load-fill" 
              :style="{ width: realtimeData.systemLoad + '%' }"
              :class="{ 'high-load': realtimeData.systemLoad > 80 }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 组件状态 -->
    <div class="component-status">
      <p>组件加载时间: {{ loadTime }}ms</p>
      <p>数据更新时间: {{ lastUpdateTime }}</p>
      <p>内存使用: {{ memoryUsage }}MB</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// 组件状态
const loadTime = ref(0)
const lastUpdateTime = ref('')
const memoryUsage = ref(0)

// 表格数据
const tableData = ref<any[]>([])

// 月度统计数据
const monthlyStats = reactive({
  '1月': 120,
  '2月': 180,
  '3月': 150,
  '4月': 220,
  '5月': 280,
  '6月': 320,
  '7月': 290,
  '8月': 350,
  '9月': 380,
  '10月': 420,
  '11月': 450,
  '12月': 500
})

// 分类统计数据
const categoryStats = reactive({
  '技术': 35,
  '设计': 25,
  '产品': 20,
  '运营': 15,
  '其他': 5
})

// 实时数据
const realtimeData = reactive({
  activeUsers: 0,
  userTrend: 'up' as 'up' | 'down',
  processingTasks: 0,
  taskTrend: 'up' as 'up' | 'down',
  systemLoad: 0
})

// 计算最大月度值
const maxMonthlyValue = Math.max(...Object.values(monthlyStats))

// 生成表格数据
const generateTableData = () => {
  const data = []
  for (let i = 1; i <= 100; i++) {
    data.push({
      id: i,
      name: `项目 ${i}`,
      status: ['进行中', '已完成', '暂停', '取消'][Math.floor(Math.random() * 4)],
      progress: Math.floor(Math.random() * 101),
      createdAt: new Date(Date.now() - Math.random() * 10000000000)
    })
  }
  tableData.value = data
}

// 格式化日期
const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 处理操作
const handleAction = (item: any) => {
  console.log('操作项目:', item)
  // 模拟操作处理
  item.progress = Math.min(100, item.progress + 10)
}

// 获取饼图角度
const getPieAngle = (category: string) => {
  const total = Object.values(categoryStats).reduce((sum, val) => sum + val, 0)
  const value = categoryStats[category as keyof typeof categoryStats]
  const percentage = value / total
  return percentage * 360
}

// 获取分类颜色
const getCategoryColor = (category: string) => {
  const colors = {
    '技术': '#42b883',
    '设计': '#ff6b6b',
    '产品': '#4ecdc4',
    '运营': '#45b7d1',
    '其他': '#96ceb4'
  }
  return colors[category as keyof typeof colors] || '#666'
}

// 更新实时数据
const updateRealtimeData = () => {
  realtimeData.activeUsers = Math.floor(Math.random() * 1000) + 100
  realtimeData.userTrend = Math.random() > 0.5 ? 'up' : 'down'
  
  realtimeData.processingTasks = Math.floor(Math.random() * 50) + 10
  realtimeData.taskTrend = Math.random() > 0.5 ? 'up' : 'down'
  
  realtimeData.systemLoad = Math.floor(Math.random() * 100)
  
  lastUpdateTime.value = new Date().toLocaleTimeString()
  
  // 模拟内存使用
  memoryUsage.value = Math.round(Math.random() * 50) + 20
}

// 定时器
let updateTimer: number | null = null

// 组件挂载
onMounted(() => {
  const startTime = performance.now()
  
  // 模拟重型组件的初始化
  setTimeout(() => {
    generateTableData()
    updateRealtimeData()
    
    const endTime = performance.now()
    loadTime.value = Math.round(endTime - startTime)
    
    // 启动实时数据更新
    updateTimer = window.setInterval(updateRealtimeData, 3000)
  }, 1000)
})

// 组件卸载
onUnmounted(() => {
  if (updateTimer) {
    clearInterval(updateTimer)
  }
})
</script>

<style scoped>
.heavy-component {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.heavy-component h3 {
  color: #42b883;
  margin-bottom: 15px;
}

/* 数据表格样式 */
.data-table {
  margin-bottom: 30px;
}

.data-table h4 {
  margin-bottom: 15px;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

th {
  background: #f8f9fa;
  font-weight: bold;
  color: #333;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.status-badge.进行中 {
  background: #fff3cd;
  color: #856404;
}

.status-badge.已完成 {
  background: #d4edda;
  color: #155724;
}

.status-badge.暂停 {
  background: #f8d7da;
  color: #721c24;
}

.status-badge.取消 {
  background: #e2e3e5;
  color: #383d41;
}

.progress-bar {
  width: 100px;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  margin-right: 8px;
}

.progress-fill {
  height: 100%;
  background: #42b883;
  transition: width 0.3s ease;
}

.progress-fill.completed {
  background: #28a745;
}

.progress-text {
  font-size: 0.8rem;
  color: #666;
}

.action-btn {
  padding: 4px 8px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.action-btn:hover {
  background: #369870;
}

/* 图表样式 */
.charts-section {
  margin-bottom: 30px;
}

.charts-section h4 {
  margin-bottom: 15px;
  color: #333;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.chart-container {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.chart-container h5 {
  margin-bottom: 15px;
  color: #333;
  text-align: center;
}

.chart {
  height: 200px;
  display: flex;
  align-items: end;
  gap: 8px;
  padding: 10px 0;
}

.chart-bar {
  flex: 1;
  background: #42b883;
  border-radius: 4px 4px 0 0;
  position: relative;
  min-height: 10px;
  transition: height 0.3s ease;
}

.chart-label {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  color: #666;
}

.chart-value {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  font-weight: bold;
  color: #333;
}

/* 饼图样式 */
.pie-chart {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: relative;
  margin: 0 auto 20px;
  background: conic-gradient(
    #42b883 0deg 126deg,
    #ff6b6b 126deg 216deg,
    #4ecdc4 216deg 288deg,
    #45b7d1 288deg 324deg,
    #96ceb4 324deg 360deg
  );
}

.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-value {
  margin-left: auto;
  font-weight: bold;
}

/* 实时数据样式 */
.realtime-section {
  margin-bottom: 30px;
}

.realtime-section h4 {
  margin-bottom: 15px;
  color: #333;
}

.realtime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.metric-card {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.metric-card h5 {
  margin-bottom: 10px;
  color: #333;
  font-size: 0.9rem;
}

.metric-value {
  font-size: 2rem;
  font-weight: bold;
  color: #42b883;
  margin-bottom: 5px;
}

.metric-trend {
  font-size: 1.2rem;
  font-weight: bold;
}

.metric-trend.up {
  color: #28a745;
}

.metric-trend.down {
  color: #dc3545;
}

.load-bar {
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 10px;
}

.load-fill {
  height: 100%;
  background: #42b883;
  transition: width 0.3s ease;
}

.load-fill.high-load {
  background: #ff6b6b;
}

/* 组件状态样式 */
.component-status {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #42b883;
}

.component-status p {
  margin: 5px 0;
  font-size: 0.9rem;
  color: #666;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .realtime-grid {
    grid-template-columns: 1fr;
  }
  
  table {
    font-size: 0.8rem;
  }
  
  th, td {
    padding: 8px 6px;
  }
}
</style> 