<template>
  <div
    ref="viewerContainer"
    class="viewer-container"
  ></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";
import * as THREE from "three";

// 定义 props 接收路径
const props = defineProps({
  splatScenePath: {
    type: String,
    required: true,
  },
  cameraOptions: {
    type: Object,
    required: true,
  },
});

const viewerContainer = ref(null);
let viewer = null; // 存储 viewer 实例
let camera = null; // 存储 camera 实例

const createViewer = () => {
  if (viewer) {
    // 销毁现有 viewer 实例
    viewer.splatMesh.updateTransforms();
    viewer.forceRenderNextFrame();
  }

  const container = viewerContainer.value;
  if (!container) return;

  const { clientWidth, clientHeight } = container;

  // 创建 renderer
  const renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.setSize(clientWidth, clientHeight);
  container.innerHTML = ""; // 清空之前的内容
  container.appendChild(renderer.domElement);

  // 创建新的相机
  camera = new THREE.PerspectiveCamera(
    props.cameraOptions.fov,
    clientWidth / clientHeight,
    0.1,
    500
  );

  camera.position.set(
    props.cameraOptions.position.x,
    props.cameraOptions.position.y,
    props.cameraOptions.position.z
  );
  camera.up
    .set(
      props.cameraOptions.up.x,
      props.cameraOptions.up.y,
      props.cameraOptions.up.z
    )
    .normalize();
  camera.lookAt(
    new THREE.Vector3(
      props.cameraOptions.lookAt.x,
      props.cameraOptions.lookAt.y,
      props.cameraOptions.lookAt.z
    )
  );
  const threeScene = new THREE.Scene();
  const boxColor = 0xbbbbbb;
  const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
  const boxMesh = new THREE.Mesh(
    boxGeometry,
    new THREE.MeshBasicMaterial({ color: boxColor })
  );
  boxMesh.position.set(0, 0, 0);

  const axesHelper = new THREE.AxesHelper(3);
  threeScene.add(axesHelper);
  // 创建新的 viewer
  viewer = new GaussianSplats3D.Viewer({
    selfDrivenMode: true,
    renderer,
    camera,
    useBuiltInControls: true,
    threeScene: threeScene,
  });

  // 验证路径
  if (!props.splatScenePath || typeof props.splatScenePath !== "string") {
    console.error("Invalid splatScenePath:", props.splatScenePath);
    return;
  }

  const basePath = "http://127.0.0.1:8000"; // 后端服务的根路径
  const fullPath = props.splatScenePath.startsWith("/media/")
    ? `${basePath}${props.splatScenePath}`
    : props.splatScenePath;

  // 调用 addSplatScene
  viewer
    .addSplatScene(fullPath, {
      showLoadingUI: true,
      progressiveLoad: true,
      position: [0, 0, -5],
    })
    .then(() => {
      console.log("Scene loaded successfully!");
      viewer.start();
    })
    .catch((error) => {
      console.error("Error loading scene:", error);
    });
};

// 在组件挂载时创建 viewer
onMounted(() => {
  createViewer();
  
  // 监听 splatScenePath 的变化并重新加载场景
  watch(
    () => props.splatScenePath,
    async (newPath) => {
      if (viewer.splatMesh && viewer.splatMesh.scenes.length > 0) {
        await viewer.removeSplatScenes([0]); // 正确移除旧场景
      }
      await viewer.addSplatScene(newPath, {
        showLoadingUI: true,
        progressiveLoad: true,
      }); // 添加新的场景
    }
  );

  // 监听 cameraOptions 的变化并重新创建 viewer
  watch(
    () => props.cameraOptions,
    () => {
      createViewer(); // 每次 cameraOptions 更新时重新创建 viewer
    },
    { deep: true } // 深度监听，确保对象内部的变化也会触发
  );
});
</script>


<style scoped>
.viewer-container {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
