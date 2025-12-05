<template>
  <aside class="sidebar">
    <div class="logo">
      <h2>3D 场景重建与编辑系统</h2>
    </div>
    <nav>
      <router-link to="/" class="nav-item" active-class="active">
        <span class="icon">📊</span> 系统概览
      </router-link>
      <router-link to="/data" class="nav-item" active-class="active">
        <span class="icon">📂</span> 数据管理
      </router-link>
      <router-link to="/tasks" class="nav-item" active-class="active">
        <span class="icon">🚀</span> 重建任务
      </router-link>
      <router-link to="/editor" class="nav-item" active-class="active">
        <span class="icon">🎨</span> 场景编辑
      </router-link>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  height: 100vh;
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.logo {
  margin-bottom: 48px;
  text-align: center;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo h2 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  color: #94a3b8;
  text-decoration: none;
  margin-bottom: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  border: 1px solid transparent;
}

.nav-item .icon {
  margin-right: 12px;
  font-size: 1.1rem;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #f8fafc;
  transform: translateX(4px);
}

.nav-item.active {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.1);
}
</style>
