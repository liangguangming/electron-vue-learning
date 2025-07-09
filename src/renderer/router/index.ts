import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '首页',
      requiresAuth: false
    }
  },
  {
    path: '/template-syntax',
    name: 'TemplateSyntax',
    component: () => import('../views/TemplateSyntax.vue'),
    meta: {
      title: '模板语法',
      requiresAuth: false
    }
  },
  {
    path: '/reactive',
    name: 'Reactive',
    component: () => import('../views/Reactive.vue'),
    meta: {
      title: '响应式数据',
      requiresAuth: false
    }
  },
  {
    path: '/components',
    name: 'Components',
    component: () => import('../views/Components.vue'),
    meta: {
      title: '组件通信',
      requiresAuth: false
    }
  },
  {
    path: '/lifecycle',
    name: 'Lifecycle',
    component: () => import('../views/Lifecycle.vue'),
    meta: {
      title: '生命周期',
      requiresAuth: false
    }
  },
  {
    path: '/router-demo',
    name: 'RouterDemo',
    component: () => import('../views/RouterDemo.vue'),
    meta: {
      title: '路由演示',
      requiresAuth: false
    },
    children: [
      {
        path: '',
        name: 'RouterHome',
        component: () => import('../views/router/Home.vue'),
        meta: {
          title: '路由首页'
        }
      },
      {
        path: 'about',
        name: 'RouterAbout',
        component: () => import('../views/router/About.vue'),
        meta: {
          title: '关于页面'
        }
      },
      {
        path: 'user/:id',
        name: 'RouterUser',
        component: () => import('../views/router/User.vue'),
        meta: {
          title: '用户详情'
        },
        props: true
      },
      {
        path: 'settings',
        name: 'RouterSettings',
        component: () => import('../views/router/Settings.vue'),
        meta: {
          title: '设置页面',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/dynamic/:id',
    name: 'Dynamic',
    component: () => import('../views/Dynamic.vue'),
    meta: {
      title: '动态路由',
      requiresAuth: false
    },
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '登录',
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '页面未找到'
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log(`路由跳转: ${from.path} -> ${to.path}`)
  
  // 设置页面标题
  if (to.meta?.title) {
    document.title = `${to.meta.title} - Vue Electron Learning`
  }
  
  // 检查是否需要认证
  if (to.meta?.requiresAuth) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    if (!isAuthenticated) {
      next({ name: 'Login', query: { redirect: to.fullPath } })
      return
    }
  }
  
  next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  console.log(`路由跳转完成: ${from.path} -> ${to.path}`)
})

export default router 