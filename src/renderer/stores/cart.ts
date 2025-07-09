import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// 商品接口
interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  stock: number
  description: string
}

// 购物车项接口
interface CartItem {
  product: Product
  quantity: number
  addedAt: Date
}

// 优惠券接口
interface Coupon {
  id: string
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  minAmount: number
  maxDiscount?: number
  validUntil: Date
  used: boolean
}

// 定义购物车Store
export const useCartStore = defineStore('cart', () => {
  // 状态
  const items = ref<CartItem[]>([])
  const appliedCoupon = ref<Coupon | null>(null)
  const isLoading = ref(false)
  const lastUpdated = ref<Date>(new Date())

  // 模拟商品数据
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Vue.js 实战指南',
      price: 89.00,
      image: 'https://via.placeholder.com/150x200/42b883/ffffff?text=Vue',
      category: 'books',
      stock: 50,
      description: '深入学习Vue.js框架的实战指南'
    },
    {
      id: '2',
      name: 'TypeScript 高级教程',
      price: 129.00,
      image: 'https://via.placeholder.com/150x200/3178c6/ffffff?text=TS',
      category: 'books',
      stock: 30,
      description: 'TypeScript高级特性和最佳实践'
    },
    {
      id: '3',
      name: 'Electron 桌面应用开发',
      price: 149.00,
      image: 'https://via.placeholder.com/150x200/47848f/ffffff?text=Electron',
      category: 'books',
      stock: 25,
      description: '使用Electron构建跨平台桌面应用'
    },
    {
      id: '4',
      name: 'Pinia 状态管理',
      price: 69.00,
      image: 'https://via.placeholder.com/150x200/ffd859/ffffff?text=Pinia',
      category: 'books',
      stock: 40,
      description: 'Vue 3官方推荐的状态管理库'
    },
    {
      id: '5',
      name: 'Vite 构建工具',
      price: 79.00,
      image: 'https://via.placeholder.com/150x200/646cff/ffffff?text=Vite',
      category: 'books',
      stock: 35,
      description: '下一代前端构建工具'
    }
  ]

  // 模拟优惠券数据
  const mockCoupons: Coupon[] = [
    {
      id: '1',
      code: 'WELCOME10',
      discount: 10,
      type: 'percentage',
      minAmount: 100,
      maxDiscount: 50,
      validUntil: new Date('2024-12-31'),
      used: false
    },
    {
      id: '2',
      code: 'SAVE20',
      discount: 20,
      type: 'fixed',
      minAmount: 200,
      validUntil: new Date('2024-12-31'),
      used: false
    },
    {
      id: '3',
      code: 'NEWUSER',
      discount: 15,
      type: 'percentage',
      minAmount: 50,
      maxDiscount: 100,
      validUntil: new Date('2024-12-31'),
      used: false
    }
  ]

  // 计算属性
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  })

  const discount = computed(() => {
    if (!appliedCoupon.value) return 0

    const { discount: couponDiscount, type, maxDiscount } = appliedCoupon.value
    const subtotalValue = subtotal.value

    if (subtotalValue < appliedCoupon.value.minAmount) return 0

    let discountAmount = 0
    if (type === 'percentage') {
      discountAmount = subtotalValue * (couponDiscount / 100)
      if (maxDiscount) {
        discountAmount = Math.min(discountAmount, maxDiscount)
      }
    } else {
      discountAmount = couponDiscount
    }

    return Math.min(discountAmount, subtotalValue)
  })

  const total = computed(() => {
    return subtotal.value - discount.value
  })

  const isEmpty = computed(() => {
    return items.value.length === 0
  })

  const hasValidCoupon = computed(() => {
    if (!appliedCoupon.value) return false
    return subtotal.value >= appliedCoupon.value.minAmount && 
           new Date() < appliedCoupon.value.validUntil
  })

  const cartSummary = computed(() => {
    return {
      totalItems: totalItems.value,
      subtotal: subtotal.value,
      discount: discount.value,
      total: total.value,
      hasCoupon: !!appliedCoupon.value,
      isEmpty: isEmpty.value
    }
  })

  // 动作
  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = items.value.find(item => item.product.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
      existingItem.addedAt = new Date()
    } else {
      items.value.push({
        product,
        quantity,
        addedAt: new Date()
      })
    }

    lastUpdated.value = new Date()
    saveToStorage()
  }

  const removeFromCart = (productId: string) => {
    const index = items.value.findIndex(item => item.product.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
      lastUpdated.value = new Date()
      saveToStorage()
    }
  }

  const updateQuantity = (productId: string, quantity: number) => {
    const item = items.value.find(item => item.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else if (quantity <= item.product.stock) {
        item.quantity = quantity
        lastUpdated.value = new Date()
        saveToStorage()
      }
    }
  }

  const clearCart = () => {
    items.value = []
    appliedCoupon.value = null
    lastUpdated.value = new Date()
    saveToStorage()
  }

  const applyCoupon = (code: string) => {
    const coupon = mockCoupons.find(c => c.code === code && !c.used)
    
    if (!coupon) {
      throw new Error('优惠券不存在或已使用')
    }

    if (new Date() > coupon.validUntil) {
      throw new Error('优惠券已过期')
    }

    if (subtotal.value < coupon.minAmount) {
      throw new Error(`订单金额不足，最低需要${coupon.minAmount}元`)
    }

    appliedCoupon.value = coupon
    saveToStorage()
    return coupon
  }

  const removeCoupon = () => {
    appliedCoupon.value = null
    saveToStorage()
  }

  const getAvailableCoupons = () => {
    return mockCoupons.filter(coupon => 
      !coupon.used && 
      new Date() < coupon.validUntil &&
      subtotal.value >= coupon.minAmount
    )
  }

  const checkout = async () => {
    if (isEmpty.value) {
      throw new Error('购物车为空')
    }

    isLoading.value = true

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000))

      // 检查库存
      for (const item of items.value) {
        if (item.quantity > item.product.stock) {
          throw new Error(`${item.product.name} 库存不足`)
        }
      }

      // 模拟订单创建
      const order = {
        id: `ORDER_${Date.now()}`,
        items: items.value,
        subtotal: subtotal.value,
        discount: discount.value,
        total: total.value,
        coupon: appliedCoupon.value,
        createdAt: new Date()
      }

      // 清空购物车
      clearCart()

      // 标记优惠券为已使用
      if (appliedCoupon.value) {
        appliedCoupon.value.used = true
      }

      return order
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // 持久化存储
  const saveToStorage = () => {
    try {
      const cartData = {
        items: items.value,
        appliedCoupon: appliedCoupon.value,
        lastUpdated: lastUpdated.value
      }
      localStorage.setItem('cart', JSON.stringify(cartData))
    } catch (error) {
      console.error('保存购物车失败:', error)
    }
  }

  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem('cart')
      if (stored) {
        const cartData = JSON.parse(stored)
        items.value = cartData.items || []
        appliedCoupon.value = cartData.appliedCoupon || null
        lastUpdated.value = new Date(cartData.lastUpdated) || new Date()
      }
    } catch (error) {
      console.error('加载购物车失败:', error)
    }
  }

  // 获取商品列表
  const getProducts = () => {
    return mockProducts
  }

  const getProductById = (id: string) => {
    return mockProducts.find(product => product.id === id)
  }

  // 监听购物车变化
  watch(items, () => {
    saveToStorage()
  }, { deep: true })

  watch(appliedCoupon, () => {
    saveToStorage()
  })

  // 初始化
  const init = () => {
    loadFromStorage()
  }

  return {
    // 状态
    items,
    appliedCoupon,
    isLoading,
    lastUpdated,

    // 计算属性
    totalItems,
    subtotal,
    discount,
    total,
    isEmpty,
    hasValidCoupon,
    cartSummary,

    // 动作
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    getAvailableCoupons,
    checkout,
    getProducts,
    getProductById,
    init
  }
}) 