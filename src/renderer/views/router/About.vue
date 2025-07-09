<template>
  <div class="router-about">
    <h2>关于页面</h2>
    <p>这是嵌套路由的关于页面</p>
    
    <div class="content-section">
      <h3>项目信息</h3>
      <div class="info-grid">
        <div class="info-item">
          <strong>项目名称:</strong> Vue Electron Learning
        </div>
        <div class="info-item">
          <strong>技术栈:</strong> Vue 3 + TypeScript + Electron
        </div>
        <div class="info-item">
          <strong>构建工具:</strong> Vite
        </div>
        <div class="info-item">
          <strong>路由管理:</strong> Vue Router 4
        </div>
      </div>
    </div>
    
    <div class="content-section">
      <h3>学习目标</h3>
      <ul>
        <li>掌握Vue 3 Composition API</li>
        <li>学习TypeScript在Vue中的应用</li>
        <li>了解Electron桌面应用开发</li>
        <li>实践Vue Router路由管理</li>
        <li>学习组件通信和状态管理</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.router-about {
  text-align: center;
}

.router-about h2 {
  color: #42b883;
  margin-bottom: 15px;
}

.router-about p {
  color: #666;
  margin-bottom: 20px;
}

.content-section {
  text-align: left;
  margin-bottom: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.content-section h3 {
  color: #42b883;
  margin-bottom: 15px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.info-item {
  padding: 8px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.info-item strong {
  color: #42b883;
}

.content-section ul {
  margin: 0;
  padding-left: 20px;
}

.content-section li {
  margin-bottom: 8px;
  color: #666;
}
</style> 