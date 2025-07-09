<template>
  <div class="pinia-demo">
    <h1>Pinia 状态管理演示</h1>
    
    <!-- 用户管理 -->
    <section class="demo-section">
      <h2>用户管理</h2>
      <div class="user-info" v-if="userStore.isAuthenticated">
        <div class="user-card">
          <h3>当前用户</h3>
          <p><strong>用户名:</strong> {{ userStore.userInfo?.username }}</p>
          <p><strong>邮箱:</strong> {{ userStore.userInfo?.email }}</p>
          <p><strong>角色:</strong> {{ userStore.userInfo?.role }}</p>
          <p><strong>权限:</strong> {{ userStore.userInfo?.permissions.join(', ') }}</p>
          <p><strong>Token:</strong> {{ userStore.token.substring(0, 20) }}...</p>
          <div class="user-actions">
            <button @click="refreshToken" :disabled="userStore.isLoading">
              {{ userStore.isLoading ? '刷新中...' : '刷新Token' }}
            </button>
            <button @click="userStore.logout" class="btn-danger">退出登录</button>
          </div>
        </div>
      </div>
      
      <div class="login-form" v-else>
        <h3>用户登录</h3>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label>用户名:</label>
            <select v-model="loginForm.username" required>
              <option value="">请选择用户</option>
              <option value="admin">管理员 (admin)</option>
              <option value="user">普通用户 (user)</option>
              <option value="demo">演示用户 (demo)</option>
            </select>
          </div>
          <div class="form-group">
            <label>密码:</label>
            <input type="password" v-model="loginForm.password" placeholder="123456" required />
          </div>
          <div class="form-group">
            <label>
              <input type="checkbox" v-model="loginForm.remember" />
              记住我
            </label>
          </div>
          <button type="submit" :disabled="userStore.isLoading">
            {{ userStore.isLoading ? '登录中...' : '登录' }}
          </button>
          <p v-if="userStore.loginError" class="error">{{ userStore.loginError }}</p>
        </form>
      </div>
    </section>

    <!-- 应用设置 -->
    <section class="demo-section">
      <h2>应用设置</h2>
      <div class="settings-grid">
        <div class="setting-card">
          <h3>主题设置</h3>
          <div class="setting-item">
            <label>主题模式:</label>
            <select v-model="settingsStore.settings.theme" @change="(e) => settingsStore.setTheme((e.target as HTMLSelectElement).value as 'light' | 'dark' | 'auto')">
              <option value="light">浅色模式</option>
              <option value="dark">深色模式</option>
              <option value="auto">跟随系统</option>
            </select>
          </div>
          <div class="setting-item">
            <label>当前主题:</label>
            <span>{{ settingsStore.currentTheme }}</span>
          </div>
        </div>

        <div class="setting-card">
          <h3>界面设置</h3>
          <div class="setting-item">
            <label>
              <input type="checkbox" v-model="settingsStore.settings.compactMode" @change="settingsStore.toggleCompactMode" />
              紧凑模式
            </label>
          </div>
          <div class="setting-item">
            <label>
              <input type="checkbox" v-model="settingsStore.settings.animations" @change="settingsStore.toggleAnimations" />
              启用动画
            </label>
          </div>
          <div class="setting-item">
            <label>
              <input type="checkbox" v-model="settingsStore.settings.sidebarCollapsed" @change="settingsStore.toggleSidebar" />
              收起侧边栏
            </label>
          </div>
        </div>

        <div class="setting-card">
          <h3>通知设置</h3>
          <div class="setting-item">
            <label>
              <input type="checkbox" v-model="settingsStore.settings.notifications.enabled" />
              启用通知
            </label>
          </div>
          <div class="setting-item">
            <label>
              <input type="checkbox" v-model="settingsStore.settings.notifications.sound" />
              通知声音
            </label>
          </div>
          <div class="setting-item">
            <label>通知时长:</label>
            <input type="range" 
                   v-model="settingsStore.settings.notifications.duration" 
                   min="1000" max="10000" step="1000" />
            <span>{{ settingsStore.settings.notifications.duration }}ms</span>
          </div>
          <button @click="testNotification">测试通知</button>
        </div>
      </div>
      
      <div class="settings-actions">
        <button @click="settingsStore.resetSettings" class="btn-secondary">重置设置</button>
        <button @click="showNotification('success', '设置已保存')" class="btn-primary">保存设置</button>
      </div>
    </section>

    <!-- 购物车演示 -->
    <section class="demo-section">
      <h2>购物车演示</h2>
      
      <!-- 商品列表 -->
      <div class="products-section">
        <h3>商品列表</h3>
        <div class="products-grid">
          <div v-for="product in cartStore.getProducts()" :key="product.id" class="product-card">
            <img :src="product.image" :alt="product.name" />
            <h4>{{ product.name }}</h4>
            <p class="price">¥{{ product.price.toFixed(2) }}</p>
            <p class="stock">库存: {{ product.stock }}</p>
            <p class="description">{{ product.description }}</p>
            <button @click="cartStore.addToCart(product, 1)" class="btn-primary">
              加入购物车
            </button>
          </div>
        </div>
      </div>

      <!-- 购物车 -->
      <div class="cart-section">
        <h3>购物车 ({{ cartStore.totalItems }} 件商品)</h3>
        
        <div v-if="cartStore.isEmpty" class="empty-cart">
          <p>购物车为空</p>
        </div>
        
        <div v-else class="cart-items">
          <div v-for="item in cartStore.items" :key="item.product.id" class="cart-item">
            <img :src="item.product.image" :alt="item.product.name" />
            <div class="item-info">
              <h4>{{ item.product.name }}</h4>
              <p class="price">¥{{ item.product.price.toFixed(2) }}</p>
            </div>
            <div class="item-quantity">
              <button @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)">+</button>
            </div>
            <div class="item-total">
              ¥{{ (item.product.price * item.quantity).toFixed(2) }}
            </div>
            <button @click="cartStore.removeFromCart(item.product.id)" class="btn-danger">删除</button>
          </div>
        </div>

        <!-- 优惠券 -->
        <div class="coupon-section">
          <h4>优惠券</h4>
          <div class="coupon-input">
            <input v-model="couponCode" placeholder="输入优惠券代码" />
            <button @click="applyCoupon" :disabled="!couponCode">应用</button>
            <button v-if="cartStore.appliedCoupon" @click="cartStore.removeCoupon()" class="btn-secondary">移除</button>
          </div>
          <p v-if="couponError" class="error">{{ couponError }}</p>
          <p v-if="cartStore.appliedCoupon" class="success">
            已应用优惠券: {{ cartStore.appliedCoupon.code }}
          </p>
          
          <div class="available-coupons">
            <h5>可用优惠券:</h5>
            <ul>
              <li v-for="coupon in cartStore.getAvailableCoupons()" :key="coupon.id">
                {{ coupon.code }} - 
                {{ coupon.type === 'percentage' ? `${coupon.discount}%` : `¥${coupon.discount}` }} 折扣
                (最低消费 ¥{{ coupon.minAmount }})
              </li>
            </ul>
          </div>
        </div>

        <!-- 购物车摘要 -->
        <div class="cart-summary">
          <h4>订单摘要</h4>
          <div class="summary-item">
            <span>商品小计:</span>
            <span>¥{{ cartStore.subtotal.toFixed(2) }}</span>
          </div>
          <div class="summary-item" v-if="cartStore.discount > 0">
            <span>优惠折扣:</span>
            <span>-¥{{ cartStore.discount.toFixed(2) }}</span>
          </div>
          <div class="summary-item total">
            <span>总计:</span>
            <span>¥{{ cartStore.total.toFixed(2) }}</span>
          </div>
          
          <div class="cart-actions">
            <button @click="cartStore.clearCart()" class="btn-secondary">清空购物车</button>
            <button @click="checkout" :disabled="cartStore.isLoading || cartStore.isEmpty" class="btn-primary">
              {{ cartStore.isLoading ? '处理中...' : '结算' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 状态调试 -->
    <section class="demo-section">
      <h2>状态调试</h2>
      <div class="debug-info">
        <div class="debug-card">
          <h3>用户状态</h3>
          <pre>{{ JSON.stringify(userStore.$state, null, 2) }}</pre>
        </div>
        <div class="debug-card">
          <h3>设置状态</h3>
          <pre>{{ JSON.stringify(settingsStore.$state, null, 2) }}</pre>
        </div>
        <div class="debug-card">
          <h3>购物车状态</h3>
          <pre>{{ JSON.stringify(cartStore.$state, null, 2) }}</pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useSettingsStore } from '../stores/settings'
import { useCartStore } from '../stores/cart'

// 使用Store
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const cartStore = useCartStore()

// 登录表单
const loginForm = ref({
  username: '',
  password: '123456',
  remember: false
})

// 优惠券代码
const couponCode = ref('')
const couponError = ref('')

// 处理登录
const handleLogin = async () => {
  const result = await userStore.login(loginForm.value)
  if (result.success && result.user) {
    settingsStore.showNotification('登录成功', `欢迎回来，${result.user.username}！`, 'success')
  }
}

// 刷新Token
const refreshToken = async () => {
  const result = await userStore.refreshToken()
  if (result.success) {
    settingsStore.showNotification('Token刷新成功', '认证令牌已更新', 'success')
  } else {
    settingsStore.showNotification('Token刷新失败', result.error, 'error')
  }
}

// 应用优惠券
const applyCoupon = () => {
  try {
    cartStore.applyCoupon(couponCode.value)
    couponError.value = ''
    settingsStore.showNotification('优惠券应用成功', `已应用优惠券: ${couponCode.value}`, 'success')
    couponCode.value = ''
  } catch (error: any) {
    couponError.value = error.message
    settingsStore.showNotification('优惠券应用失败', error.message, 'error')
  }
}

// 测试通知
const testNotification = () => {
  settingsStore.showNotification('测试通知', '这是一个测试通知消息', 'info')
}

// 显示通知
const showNotification = (type: 'info' | 'success' | 'warning' | 'error', message: string) => {
  settingsStore.showNotification('操作提示', message, type)
}

// 结算
const checkout = async () => {
  try {
    const order = await cartStore.checkout()
    settingsStore.showNotification('订单创建成功', `订单号: ${order.id}`, 'success')
  } catch (error: any) {
    settingsStore.showNotification('结算失败', error.message, 'error')
  }
}

// 组件挂载时初始化
onMounted(() => {
  userStore.init()
  settingsStore.init()
  cartStore.init()
})
</script>

<style scoped>
.pinia-demo {
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

/* 用户管理样式 */
.user-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.user-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.login-form {
  max-width: 400px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 4px;
}

/* 设置样式 */
.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.setting-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.setting-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.setting-item label {
  min-width: 120px;
}

.settings-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

/* 商品和购物车样式 */
.products-section,
.cart-section {
  margin-bottom: 30px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.product-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.product-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.product-card h4 {
  margin: 10px 0;
  color: var(--text-primary, #333);
}

.price {
  font-size: 1.2em;
  font-weight: bold;
  color: #e74c3c;
  margin: 5px 0;
}

.stock {
  color: var(--text-secondary, #666);
  font-size: 0.9em;
  margin: 5px 0;
}

.description {
  color: var(--text-secondary, #666);
  font-size: 0.9em;
  margin: 10px 0;
  line-height: 1.4;
}

.cart-items {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto auto;
  gap: 15px;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid var(--border-color, #e0e0e0);
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-quantity button {
  width: 30px;
  height: 30px;
  border: 1px solid var(--border-color, #e0e0e0);
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.item-total {
  font-weight: bold;
  color: #e74c3c;
}

.coupon-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.coupon-input {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.coupon-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 4px;
}

.available-coupons {
  margin-top: 15px;
}

.available-coupons ul {
  list-style: none;
  padding: 0;
}

.available-coupons li {
  padding: 5px 0;
  color: var(--text-secondary, #666);
}

.cart-summary {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-item.total {
  font-weight: bold;
  font-size: 1.2em;
  border-top: 1px solid var(--border-color, #e0e0e0);
  padding-top: 10px;
  margin-top: 10px;
}

.cart-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

/* 调试信息样式 */
.debug-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.debug-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.debug-card pre {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.8em;
  max-height: 200px;
  overflow-y: auto;
}

/* 按钮样式 */
button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
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

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 消息样式 */
.error {
  color: #dc3545;
  margin: 10px 0;
}

.success {
  color: #28a745;
  margin: 10px 0;
}

.empty-cart {
  text-align: center;
  padding: 40px;
  color: var(--text-secondary, #666);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 1fr;
    gap: 10px;
    text-align: center;
  }
  
  .settings-grid {
    grid-template-columns: 1fr;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style> 