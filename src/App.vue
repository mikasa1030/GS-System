<template>
  <!-- <sidebarbutton /> -->
  <router-view />
  <!-- <splatxr /> -->
  <!-- <sidebar1 /> -->
  <!-- <settingbuttons /> -->
    <!-- <h1>3D Viewer Demo</h1> -->
    <!-- 替换为实际文件路径 -->
    <!-- <GaussianViewer filePath="./models/point_cloud.ply" /> -->
    <!-- <sidebar1 /> -->
    <!-- <div id="app">
    <ThreeScene /> -->
    <!-- <GaussianSplatsViewer /> -->
  <!-- </div> -->
</template>

<script setup>
  // import ThreeScene from './components/ThreeViewer.vue'
  // import GaussianSplatsViewer from './components/GSview.vue'
  // import sidebar1 from './components/Sidebar.vue'
  import splatxr from './components/splatxr.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* 禁止水平滚动条 */
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  padding: 0rem;
  max-width: 100%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>