# Vue Electron Learning

这是一个Vue 3 + TypeScript + Electron学习项目，用于掌握Vue和Electron的基础知识。

## 项目结构

```
vue_test/
├── src/
│   ├── main/                 # Electron主进程
│   │   ├── index.ts         # 主进程入口
│   │   └── preload.ts       # 预加载脚本
│   ├── renderer/            # Vue渲染进程
│   │   ├── components/      # Vue组件
│   │   │   ├── HelloWorld.vue
│   │   │   ├── TemplateSyntaxDemo.vue
│   │   │   ├── ReactiveDemo.vue
│   │   │   ├── LifecycleDemo.vue
│   │   │   ├── ParentComponent.vue
│   │   │   ├── ChildComponent.vue
│   │   │   ├── SiblingComponent.vue
│   │   │   ├── GrandChildComponent.vue
│   │   │   └── ChildLifecycle.vue
│   │   ├── App.vue         # 根组件
│   │   └── main.ts         # Vue入口
│   └── types/              # 类型声明
│       └── electron.d.ts
├── package.json
├── vite.config.ts          # Vite配置
├── tsconfig.json           # TypeScript配置
└── index.html              # HTML入口
```

## 安装依赖

```bash
npm install
```

## 开发命令

```bash
# 启动Vue开发服务器
npm run dev

# 启动Electron开发环境
npm run electron:dev

# 构建项目
npm run build

# 构建Electron应用
npm run electron:build

# 类型检查
npm run type-check
```

## 学习大纲与进度

### 第一阶段：项目基础搭建 ✅
- [x] 项目结构创建和配置
- [x] TypeScript配置 (tsconfig.json, tsconfig.node.json)
- [x] Vite构建工具配置 (vite.config.ts)
- [x] Electron主进程和预加载脚本
- [x] 开发环境配置 (package.json scripts)
- [x] 热重载配置 (nodemon.json)

### 第二阶段：Vue 3 核心概念学习 ✅
- [x] **模板语法** (TemplateSyntaxDemo.vue)
  - [x] 文本插值 {{ }}
  - [x] 指令系统 (v-if, v-for, v-on, v-bind)
  - [x] 计算属性和侦听器
  - [x] 条件渲染和列表渲染
- [x] **响应式数据** (ReactiveDemo.vue)
  - [x] ref() 和 reactive()
  - [x] 响应式原理
  - [x] 数据绑定和双向绑定
  - [x] 响应式数据的注意事项
- [x] **组件通信** (ParentComponent.vue, ChildComponent.vue, SiblingComponent.vue, GrandChildComponent.vue)
  - [x] Props 父传子
  - [x] Emit 子传父
  - [x] 兄弟组件通信
  - [x] 跨级组件通信
- [x] **生命周期** (LifecycleDemo.vue, ChildLifecycle.vue)
  - [x] 组件创建阶段 (beforeCreate, created)
  - [x] 挂载阶段 (beforeMount, mounted)
  - [x] 更新阶段 (beforeUpdate, updated)
  - [x] 卸载阶段 (beforeUnmount, unmounted)
  - [x] 错误处理 (errorCaptured)

### 第三阶段：Vue Router 路由管理 ✅
- [x] **路由基础配置**
  - [x] 路由安装和配置 (src/renderer/router/index.ts)
  - [x] 路由视图组件 (src/renderer/App.vue)
  - [x] 路由导航 (导航栏和编程式导航)
- [x] **路由功能**
  - [x] 动态路由 (/dynamic/:id)
  - [x] 路由参数 (props: true)
  - [x] 嵌套路由 (/router-demo/*)
  - [x] 路由守卫 (beforeEach, afterEach)
  - [x] 认证路由 (requiresAuth)
  - [x] 404页面处理

### 第四阶段：Electron 主进程开发 ✅
- [x] **基础窗口管理** (src/main/index.ts)
  - [x] 主进程入口配置
  - [x] 窗口创建和管理
  - [x] 开发和生产环境区分
  - [x] 应用菜单和系统托盘
- [x] **IPC通信**
  - [x] 主进程到渲染进程通信 (ipcMain.handle)
  - [x] 渲染进程到主进程通信 (ipcRenderer.invoke)
  - [x] 双向通信实现 (事件监听)
  - [x] 安全上下文隔离
- [x] **预加载脚本** (src/main/preload.ts)
  - [x] 基础预加载脚本
  - [x] 安全上下文隔离
  - [x] API暴露和权限控制
- [x] **原生API调用**
  - [x] 文件系统操作 (fs模块)
  - [x] 系统对话框 (dialog模块)
  - [x] 剪贴板操作 (clipboard模块)
  - [x] 系统托盘 (Tray模块)
  - [x] 外部链接 (shell模块)

### 第五阶段：状态管理 (Pinia) ✅
- [x] **Pinia基础**
  - [x] Store创建和配置 (src/renderer/stores/index.ts)
  - [x] State管理 (ref, reactive)
  - [x] Getters计算属性 (computed)
  - [x] Actions异步操作 (async/await)
- [x] **状态管理实践**
  - [x] 用户状态管理 (src/renderer/stores/user.ts)
  - [x] 应用配置管理 (src/renderer/stores/settings.ts)
  - [x] 购物车状态管理 (src/renderer/stores/cart.ts)
  - [x] 数据持久化 (localStorage)
  - [x] 状态调试和监控

### 第六阶段：高级特性和优化 ⏳
- [ ] **性能优化**
  - [ ] 组件懒加载
  - [ ] 虚拟滚动
  - [ ] 内存泄漏防护
- [ ] **错误处理和调试**
  - [ ] 全局错误处理
  - [ ] 开发工具集成
  - [ ] 日志系统
- [ ] **打包和部署**
  - [ ] 应用打包配置
  - [ ] 自动更新机制
  - [ ] 代码签名

### 第七阶段：实战项目 ⏳
- [ ] **功能实现**
  - [ ] 文件管理器
  - [ ] 设置面板
  - [ ] 数据导入导出
- [ ] **用户体验**
  - [ ] 界面美化
  - [ ] 快捷键支持
  - [ ] 多语言支持

## 当前学习状态

**已完成**: 
- ✅ 项目基础搭建
- ✅ Vue 3 核心概念 (模板语法、响应式数据、组件通信、生命周期)
- ✅ Vue Router 路由管理 (完整路由系统，包含动态路由、嵌套路由、路由守卫、认证路由)
- ✅ Electron 主进程开发 (IPC通信、文件操作、系统API、应用菜单、系统托盘)

**进行中**: 
- 🔄 高级特性和优化 (性能优化、错误处理、打包部署)

**待开始**: 
- ⏳ 实战项目开发

## 技术栈

- **Vue 3** - 渐进式JavaScript框架
- **TypeScript** - 类型安全的JavaScript超集
- **Electron** - 跨平台桌面应用框架
- **Vite** - 快速构建工具
- **Vue Router** - Vue路由管理
- **Pinia** - Vue状态管理 (计划中)

## 开发环境

- Node.js 18+
- npm 9+
- TypeScript 5.3+
- Electron 28+

## 学习笔记

### Pinia 状态管理学习总结

#### Pinia基础概念
- **Store定义**: 使用 `defineStore()` 创建状态存储
- **组合式API**: 使用 `ref()`, `computed()`, `watch()` 管理状态
- **状态结构**: State(状态) + Getters(计算属性) + Actions(动作)

#### 核心Store实现
1. **用户状态管理** (`useUserStore`)
   - 用户认证状态 (登录/登出)
   - 用户信息管理 (角色、权限)
   - Token管理和刷新
   - 本地存储持久化

2. **应用设置管理** (`useSettingsStore`)
   - 主题切换 (浅色/深色/自动)
   - 界面配置 (紧凑模式、动画、侧边栏)
   - 通知系统 (声音、时长、桌面通知)
   - 系统主题监听

3. **购物车状态管理** (`useCartStore`)
   - 商品管理 (添加、删除、数量更新)
   - 优惠券系统 (应用、验证、计算)
   - 价格计算 (小计、折扣、总计)
   - 订单处理 (库存检查、结算)

#### 技术要点
- **响应式状态**: 使用 `ref()` 和 `reactive()` 创建响应式状态
- **计算属性**: 使用 `computed()` 创建派生状态
- **异步操作**: 在Actions中使用 `async/await` 处理异步逻辑
- **状态持久化**: 使用 `localStorage` 实现数据持久化
- **状态监听**: 使用 `watch()` 监听状态变化并自动保存
- **类型安全**: 完整的TypeScript类型定义

#### 最佳实践
- **模块化设计**: 按功能模块拆分Store
- **状态隔离**: 每个Store负责特定领域的状态
- **数据验证**: 在Actions中进行数据验证和错误处理
- **性能优化**: 使用计算属性缓存计算结果
- **调试支持**: 提供状态调试和监控功能

### Vue Router 路由管理学习总结

#### 路由基础
- **路由配置**: 使用 `createRouter()` 和 `createWebHashHistory()` 创建路由实例
- **路由模式**: 在Electron中使用hash模式避免路径问题
- **路由视图**: 使用 `<router-view>` 组件显示匹配的路由组件
- **路由链接**: 使用 `<router-link>` 组件进行声明式导航

#### 路由功能
- **动态路由**: 使用 `:id` 参数创建动态路由，通过 `props: true` 传递参数
- **嵌套路由**: 使用 `children` 配置子路由，实现嵌套页面结构
- **路由守卫**: 
  - `beforeEach`: 全局前置守卫，用于认证检查和页面标题设置
  - `afterEach`: 全局后置钩子，用于日志记录和页面分析
- **编程式导航**: 使用 `router.push()`, `router.go()` 等方法进行编程式导航
- **路由元信息**: 使用 `meta` 字段存储路由的额外信息，如认证要求

#### 认证路由
- **路由守卫**: 检查 `meta.requiresAuth` 字段进行认证拦截
- **重定向**: 未认证用户重定向到登录页面，并保存原始路径
- **状态管理**: 使用localStorage模拟认证状态持久化
- **登录流程**: 登录成功后重定向到原始请求页面

#### 页面组件
- **首页**: 展示学习内容概览和快速导航
- **学习页面**: 模板语法、响应式数据、组件通信、生命周期
- **路由演示**: 嵌套路由、动态路由、路由守卫的综合演示
- **登录页面**: 认证功能演示，包含表单验证和状态管理
- **404页面**: 处理未找到的路由，提供友好的错误提示
- **Electron演示**: IPC通信、文件操作、系统API的综合演示

### Electron 主进程开发学习总结

#### 主进程架构
- **窗口管理**: 使用 `BrowserWindow` 创建和管理应用窗口
- **应用菜单**: 使用 `Menu` 创建原生应用菜单和快捷键
- **系统托盘**: 使用 `Tray` 创建系统托盘图标和右键菜单
- **生命周期**: 处理应用启动、激活、关闭等生命周期事件

#### IPC通信
- **主进程到渲染进程**: 使用 `ipcMain.handle()` 处理渲染进程请求
- **渲染进程到主进程**: 使用 `ipcRenderer.invoke()` 调用主进程方法
- **事件通信**: 使用 `ipcRenderer.on()` 和 `webContents.send()` 进行事件监听
- **安全隔离**: 通过预加载脚本安全地暴露API，避免直接访问Node.js

#### 原生API调用
- **文件系统**: 使用 `fs` 模块进行文件读写操作
- **系统对话框**: 使用 `dialog` 模块显示文件选择、保存、消息对话框
- **剪贴板**: 使用 `clipboard` 模块进行剪贴板读写操作
- **外部链接**: 使用 `shell` 模块打开外部URL和文件
- **系统信息**: 获取平台、架构、版本等系统信息

#### 预加载脚本
- **安全上下文**: 使用 `contextBridge` 安全地暴露API
- **类型定义**: 为TypeScript提供完整的类型支持
- **权限控制**: 只暴露必要的API，确保安全性
- **事件处理**: 处理主进程发送的事件和回调

#### 功能演示
- **系统信息展示**: 显示平台、版本、架构等系统信息
- **窗口操作**: 最小化、最大化、关闭窗口
- **剪贴板操作**: 读写剪贴板内容
- **文件操作**: 读取、保存文件内容
- **对话框**: 显示各种类型的系统对话框
- **外部链接**: 打开外部网站和链接
- **IPC日志**: 实时显示IPC通信日志

### 重要概念
1. **Vue 3 Composition API**: 使用 `ref()`, `reactive()`, `computed()`, `watch()` 等函数式API
2. **响应式原理**: Vue 3使用Proxy实现响应式，相比Vue 2的Object.defineProperty更高效
3. **组件通信**: Props向下传递，Emit向上传递，Provide/Inject跨级传递
4. **生命周期**: 在Composition API中使用 `onMounted()`, `onUnmounted()` 等钩子函数
5. **Vue Router**: 使用 `createRouter()`, `createWebHashHistory()`, 路由守卫和编程式导航
6. **Electron架构**: 主进程负责窗口管理和系统API，渲染进程负责界面展示

### 常见问题解决
- Vue-tsc类型检查问题：可降级版本或暂时跳过类型检查
- Electron启动问题：使用tsx编译主进程代码
- 生命周期无限递归：避免在生命周期钩子中直接修改响应式数据
- 路由配置问题：确保使用hash模式避免Electron中的路径问题
- 路由守卫认证：使用localStorage模拟认证状态管理 