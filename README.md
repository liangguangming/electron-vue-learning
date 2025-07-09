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
│   │   │   └── HelloWorld.vue
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

## 学习路径

### 第一阶段：基础搭建 ✅
- [x] 项目结构创建
- [x] TypeScript配置
- [x] Vue 3 + Electron集成
- [x] 开发环境配置

### 第二阶段：Vue学习
- [ ] 组件开发
- [ ] 响应式数据
- [ ] 生命周期
- [ ] 事件处理

### 第三阶段：Electron学习
- [ ] 主进程开发
- [ ] IPC通信
- [ ] 窗口管理
- [ ] 原生API调用

### 第四阶段：高级特性
- [ ] 状态管理
- [ ] 路由管理
- [ ] 打包部署
- [ ] 性能优化

## 技术栈

- **Vue 3** - 渐进式JavaScript框架
- **TypeScript** - 类型安全的JavaScript超集
- **Electron** - 跨平台桌面应用框架
- **Vite** - 快速构建工具
- **Pinia** - Vue状态管理
- **Vue Router** - Vue路由管理

## 开发环境

- Node.js 18+
- npm 9+
- TypeScript 5.3+
- Electron 28+ 