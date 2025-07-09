<template>
  <div 
    class="virtual-list"
    :style="{ height: containerHeight + 'px' }"
    @scroll="handleScroll"
    ref="containerRef"
  >
    <!-- 总高度占位 -->
    <div 
      class="virtual-list-spacer"
      :style="{ height: totalHeight + 'px' }"
    ></div>
    
    <!-- 可见项容器 -->
    <div 
      class="virtual-list-content"
      :style="{ transform: `translateY(${offsetY}px)` }"
    >
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="virtual-list-item"
        :style="{ height: itemHeight + 'px' }"
        @click="handleItemClick(item)"
      >
        <div class="item-main">
          <div class="item-header">
            <span class="item-title">{{ item.name }}</span>
            <span class="item-id">#{{ item.id }}</span>
          </div>
          <div class="item-desc">{{ item.description }}</div>
          <div class="item-footer">
            <span class="item-priority" :class="'priority-' + item.priority">{{ item.priority }}</span>
            <div class="item-footer-right">
              <span class="item-status" :class="'status-' + (Array.isArray(item.status) ? item.status[0] : item.status)">
                {{ Array.isArray(item.status) ? item.status[0] : item.status }}
              </span>
              <span class="item-date">
                {{ Array.isArray(item.createdAt) ? formatDate(item.createdAt[0]) : formatDate(item.createdAt) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 滚动指示器 -->
    <div class="scroll-indicator" v-if="showScrollIndicator">
      <div class="indicator-content">
        <span>滚动中...</span>
        <div class="indicator-progress">
          <div 
            class="indicator-fill"
            :style="{ width: scrollProgress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

// Props
interface Props {
  items: any[]
  itemHeight: number
  containerHeight: number
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'item-click': [item: any]
}>()

// 响应式数据
const containerRef = ref<HTMLElement>()
const scrollTop = ref(0)
const showScrollIndicator = ref(false)
const scrollIndicatorTimer = ref<number | null>(null)

// 计算属性
const totalHeight = computed(() => {
  return props.items.length * props.itemHeight
})

const startIndex = computed(() => {
  return Math.floor(scrollTop.value / props.itemHeight)
})

const endIndex = computed(() => {
  const visibleCount = Math.ceil(props.containerHeight / props.itemHeight)
  return Math.min(startIndex.value + visibleCount + 2, props.items.length)
})

const visibleItems = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value)
})

const offsetY = computed(() => {
  return startIndex.value * props.itemHeight
})

const scrollProgress = computed(() => {
  if (totalHeight.value <= props.containerHeight) return 0
  return (scrollTop.value / (totalHeight.value - props.containerHeight)) * 100
})

// 方法
const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement
  scrollTop.value = target.scrollTop
  
  // 显示滚动指示器
  showScrollIndicator.value = true
  
  // 清除之前的定时器
  if (scrollIndicatorTimer.value) {
    clearTimeout(scrollIndicatorTimer.value)
  }
  
  // 3秒后隐藏指示器
  scrollIndicatorTimer.value = window.setTimeout(() => {
    showScrollIndicator.value = false
  }, 3000)
}

const handleItemClick = (item: any) => {
  emit('item-click', item)
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 滚动到指定项
const scrollToItem = (index: number) => {
  if (!containerRef.value) return
  
  const targetScrollTop = index * props.itemHeight
  containerRef.value.scrollTop = targetScrollTop
}

// 滚动到顶部
const scrollToTop = () => {
  if (!containerRef.value) return
  containerRef.value.scrollTop = 0
}

// 滚动到底部
const scrollToBottom = () => {
  if (!containerRef.value) return
  containerRef.value.scrollTop = totalHeight.value - props.containerHeight
}

// 暴露方法
defineExpose({
  scrollToItem,
  scrollToTop,
  scrollToBottom
})

// 监听数据变化
watch(() => props.items, () => {
  // 数据变化时，如果滚动到底部，自动滚动到新的底部
  nextTick(() => {
    if (containerRef.value) {
      const isAtBottom = containerRef.value.scrollTop + props.containerHeight >= totalHeight.value - 10
      if (isAtBottom) {
        scrollToBottom()
      }
    }
  })
}, { deep: true })

// 生命周期
onMounted(() => {
  // 初始化
})

onUnmounted(() => {
  if (scrollIndicatorTimer.value) {
    clearTimeout(scrollIndicatorTimer.value)
  }
})
</script>

<style scoped>
.virtual-list {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: white;
}

.virtual-list-spacer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
}

.virtual-list-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  will-change: transform;
}

.virtual-list-item {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.06);
  margin-bottom: 16px;
  padding: 18px 20px 14px 20px;
  transition: box-shadow 0.2s;
  border: 1px solid #f0f0f0;
}
.virtual-list-item:hover {
  box-shadow: 0 6px 24px rgba(66,184,131,0.10);
  border-color: #42b88333;
}

.item-main {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
}

.item-title {
  font-size: 1.15rem;
  font-weight: bold;
  color: #222;
  letter-spacing: 1px;
}

.item-id {
  font-size: 0.9rem;
  color: #aaa;
  font-weight: 500;
}

.item-desc {
  color: #666;
  font-size: 0.98rem;
  margin-bottom: 2px;
  line-height: 1.6;
  word-break: break-all;
}

.item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  gap: 12px;
}

.item-priority {
  padding: 2px 14px;
  border-radius: 12px;
  font-weight: 500;
  min-width: 36px;
  text-align: center;
  font-size: 0.98rem;
  background: #f5f5f5;
  color: #888;
  border: none;
  letter-spacing: 2px;
}
.priority-高 { background: #fdeaea; color: #dc3545; }
.priority-中 { background: #fff7e6; color: #ff9800; }
.priority-低 { background: #e6f4ea; color: #42b883; }

.item-footer-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-status {
  padding: 2px 12px;
  border-radius: 12px;
  font-size: 0.98rem;
  font-weight: 500;
  border: none;
  background: #e6f0fa;
  color: #3178c6;
}
.status-完成 { background: #e6f0fa; color: #3178c6; }
.status-活跃 { background: #e6f4ea; color: #42b883; }
.status-暂停 { background: #fff7e6; color: #ff9800; }
.status-取消 { background: #fdeaea; color: #dc3545; }

.item-date {
  white-space: nowrap;
  background: #f4f6fa;
  border-radius: 10px;
  padding: 2px 10px;
  font-size: 0.93em;
  color: #aaa;
  font-weight: 400;
  border: none;
}

.status-complete, .status-完成 {
  background: #e6f0fa;
  color: #3178c6;
  border: none;
}
.status-active, .status-活跃 {
  background: #e6f4ea;
  color: #42b883;
  border: none;
}
.status-pause, .status-暂停 {
  background: #fff7e6;
  color: #ff9800;
  border: none;
}
.status-cancel, .status-取消 {
  background: #fdeaea;
  color: #dc3545;
  border: none;
}

/* 滚动指示器 */
.scroll-indicator {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  z-index: 10;
  animation: fadeIn 0.3s ease;
}

.indicator-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.indicator-progress {
  width: 100px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
}

.indicator-fill {
  height: 100%;
  background: #42b883;
  transition: width 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 滚动条样式 */
.virtual-list::-webkit-scrollbar {
  width: 8px;
}

.virtual-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.virtual-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.virtual-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .item-content {
    padding: 12px;
  }
  
  .item-name {
    font-size: 0.9rem;
  }
  
  .item-description {
    font-size: 0.75rem;
  }
  
  .scroll-indicator {
    top: 5px;
    right: 5px;
    padding: 6px 10px;
    font-size: 0.7rem;
  }
  
  .indicator-progress {
    width: 80px;
  }
}
</style> 