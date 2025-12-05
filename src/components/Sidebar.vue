<template>
  <div class="container">
    <!-- 侧边栏按钮 -->
    <div class="sidebar-button">
      <button v-if="!hideButtons.includes('模型')" class="menu-button model-button"
        @click="setActiveContent('模型')">模型</button>
      <button v-if="!hideButtons.includes('人体模型')" class="menu-button model-button"
        @click="setActiveContent('人体模型')">人体模型</button>
      <button v-if="!hideButtons.includes('场景模型')" class="menu-button model-button"
        @click="setActiveContent('场景模型')">场景模型</button>
      <button v-if="!hideButtons.includes('驱动')" class="menu-button drive-button"
        @click="setActiveContent('驱动')">驱动</button>
      <button v-if="!hideButtons.includes('光照')" class="menu-button lighting-button"
        @click="setActiveContent('光照')">光照</button>
    </div>

    <!-- 动态显示的内容区域 -->
    <div class="content">
      <!-- 内容容器 -->
      <div v-if="activeContent === '模型'" class="content-container">

        <div class="top-buttons">
          <button :class="{ active: activeModelTab === '人体' }" @click="setActiveModelTab('人体')">
            人体
          </button>
          <button :class="{ active: activeModelTab === '场景' }" @click="setActiveModelTab('场景')">
            场景
          </button>
        </div>
        <!-- 表情内容 -->
        <div v-if="activeModelTab === '人体'" class="asset-content">
          <div class="sidebar">
            <div class="category" v-for="category in humanCategories" :key="category.title">
              <div class="uptitle">
                <h2>{{ category.title }}</h2>
              </div>
              <div class="buttons">
                <button v-for="button in category.buttons" :key="button.name" class="button"
                  @click="handleButtonClick(button.path)">
                  {{ button.name }}
                </button>
              </div>
            </div>

            <div class="image-preview">
              <h2>人体预览</h2>
              <!-- 替换为图片 -->
              <img :src="currentImagePath" alt="人体预览" class="preview-image" />
            </div>

          </div>

        </div>
        <!-- 肢体内容 -->
        <div v-if="activeModelTab === '场景'" class="asset-content">
          <div class="sidebar">
            <div class="category" v-for="category in sceneCategories" :key="category.title">
              <div class="uptitle">
                <h2>{{ category.title }}</h2>
              </div>
              <div class="buttons">
                <button v-for="button in category.buttons" :key="button.name" class="button"
                  @click="handleButtonClick(button.path)">
                  {{ button.name }}
                </button>
              </div>
            </div>

            <div class="image-preview">
              <h2>场景预览</h2>
              <!-- 替换为图片 -->
              <img :src="currentsceneImagePath" alt="场景预览" class="preview-image" />
            </div>
          </div>
        </div>





      </div>

      <div v-if="activeContent === '驱动'" class="content-container">

        <div class="top-buttons">
          <button :class="{ active: activeModelTab === '动作' }" @click="setActiveModelTab('动作')">
            动作
          </button>
          <button :class="{ active: activeModelTab === '音频' }" @click="setActiveModelTab('音频')">
            音频
          </button>
        </div>
        <!-- 表情内容 -->
        <div v-if="activeModelTab === '动作'" class="asset-content">
          <div class="sidebar">
            <div class="category" v-for="category in faceCategories" :key="category.title">
              <div class="uptitle">
                <h2>{{ category.title }}</h2>
              </div>
              <div class="buttons">
                <button v-for="button in category.buttons" :key="button.name" class="button"
                  @click="handleButtonClick(button)">
                  {{ button.name }}
                </button>
              </div>
            </div>

            <div class="image-preview">
              <h2>表情预览</h2>
              <video controls autoplay muted loop class="preview-image">
                <!-- 替换为图片内容 -->
                <source src="/表情.mp4" type="video/mp4" class="preview-image" />
              </video>
            </div>
          </div>

        </div>
        <!-- 肢体内容 -->
        <div v-if="activeModelTab === '音频'" class="asset-content">
          <div class="sidebar">
            <div class="category" v-for="category in bodyCategories" :key="category.title">
              <div class="buttons">
                <button v-for="button in category.buttons" :key="button.name" class="button"
                  @click="handleButtonClick(button)">
                  {{ button.name }}
                </button>
              </div>
            </div>

            <!-- 上传音频部分 -->
            <div class="audio-upload">
              <input type="file" accept="audio/*" id="audioUpload" style="display: none;" @change="handleAudioUpload" />
              <label for="audioUpload" class="upload-audio-button">
                <span class="button-text">上传音频文件</span>
              </label>

              <!-- 音频预览框 -->
              <div v-if="audioPreviewUrl" class="audio-preview">

                <audio controls>
                  <source :src="audioPreviewUrl" type="audio/mpeg" />
                  您的浏览器不支持音频播放。
                </audio>
              </div>
            </div>

            <!-- 动作预览部分 -->
            <div class="image-preview">
              <h2>动作预览</h2>
              <video controls autoplay muted loop class="preview-image">
                <source src="/动作.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

      </div>

      <div v-if="activeContent === '光照'" class="content-container">
        <div class="sidebar">
          <div class="category" v-for="category in lightingCategories" :key="category.title">
            <div class="uptitle">
              <h2>{{ category.title }}</h2>
            </div>
            <div class="buttons">
              <button v-for="button in category.buttons" :key="button" class="button">
                {{ button }}
              </button>
            </div>
          </div>

          <UploadPreviewComponent :storedTexture="storedTexture" @update-texture="handleTextureUpdate" />
        </div>
      </div>




      <button class="mergebutton">一键融合</button>



    </div>

  </div>
</template>

<script>
import UploadPreviewComponent from "./uploadlight.vue";
import functions1 from "./functionsidebar.vue"
export default {
  props: {
    hideButtons: {
      type: Array,
      default: () => [], // 默认不隐藏任何按钮
    },
    sceneCategories: {
      type: Array,
      required: true,
    },
    faceCategories: {
      type: Array,
      required: true,
    },
    bodyCategories: {
      type: Array,
      required: true,
    },
    humanCategories: {
      type: Array,
      required: true,
    },
    lightingCategories: {
      type: Array,
      required: true,
    },
    hideButtons: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeContent: "模型", // 当前激活的内容
      storedTexture: null, // 存储上传的纹理数据
      activeModelTab: '人体', // 默认激活的标签
      currentImagePath: "/人体2.png", // 默认显示的图片路径
      currentsceneImagePath: "/garden.png", // 默认显示的图片路径
      audioPreviewUrl: null, // 初始化为空，表示没有音频文件
      functionButtonLabels: {
        headRefine: "物体编辑", // 头部细化按钮名称
        stylize: "场景风格化", // 风格化按钮名称
      },
    };
  },
  components: {
    UploadPreviewComponent,
    functions1
  },
  methods: {

    handleAudioUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.audioPreviewUrl = URL.createObjectURL(file); // 生成音频预览 URL
    }
  },
    setActiveContent(name) {
      this.activeContent = name; // 更新当前显示的内容
      if (name === "模型") {
        this.activeModelTab = "人体"; // 默认切换到资产子页面
      }
      if (name === "驱动") {
        this.activeModelTab = "动作"; // 默认切换到资产子页面
      }
    },
    setActiveModelTab(tabName) {
      this.activeModelTab = tabName; // 切换重建和资产
    },
    handleTextureUpdate(texture) {
      this.storedTexture = texture; // 更新存储的纹理数据
    },
    handlePlyUpload(event) {
      const file = event.target.files[0];
      if (file) {
        alert(`Uploaded PLY file: ${file.name}`);
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.type.startsWith("image/")) {
          alert(`Uploaded image: ${file.name}`);
        } else {
          alert("Please upload a valid image file!");
        }
      }
    },
    handleImageDrop(event) {
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        alert(`Dropped image file: ${file.name}`);
      }
    },
    handleButtonClick(path) {
      // 向父组件触发事件，并传递路径
      console.log("Emitting path:", path); // 添加调试日志
      this.$emit("update-splat-scene", path);
    },
  },
};
</script>



<style scoped>
/* 总容器样式 */

.audio-upload {
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 20%;
  margin-bottom: 15px;
  align-items: center;
  justify-content: space-between;
  
}

.upload-audio-button {
  width: 95%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #fff;
  background-color: #2b3a4a;
  border: 2px solid #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 1px;
  font-size: 13px;
}

.audio-preview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 130%;
  height: 60%
}

.audio-preview h3 {

  margin-bottom: 5px;
}

audio {
  width: 100%; /* 音频控件占满父容器宽度 */
  height: 65%;
  max-width: 300px; /* 限制最大宽度 */
}

.container {
  display: flex;
  height: 100vh;
  /* 确保主容器占满整个屏幕 */
  width: 18%;
  justify-content: flex-start;


}

/* 侧边栏按钮样式 */
.sidebar-button {

  top: 0;
  left: 0;
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

/* 按钮样式 */
.menu-button {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  writing-mode: vertical-rl;
  text-orientation: upright;
}

.model-button {
  background-color: rgb(165, 171, 178);
}

.drive-button {
  background-color: rgb(117, 117, 117);
}

.lighting-button {
  background-color: rgb(78, 79, 80);
}

.human-button {
  background-color: #e91e63;
}

/* 鼠标悬停效果 */
.menu-button:hover {
  opacity: 0.8;
}

.menu-button:active {
  background-color: #141415;
  color: #fff;
}
/* 内容区域样式 */
.content {
  width: 85%;
  flex-direction: column;
  margin-left: 0px;
  /* 修改为与侧边栏宽度一致 */

  flex: 1;
  display: flex;
  background-color: #dbdada;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

}

/* 动态内容容器 */
.content-container {
  width: 90%;
  height: 90%;
  /* 高度等于整个视口高度 */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: flex-start;
  /* 水平方向居中 */
  align-items: center;
  /* 垂直方向居中 */
  background-color: #ffffff;
  overflow-y: auto;
  /* 如果内容超出高度，允许滚动 */
  padding: 7px;

  margin-bottom: 5%;
  margin-top: 3%;
  border-radius: 5px;


}

.asset-content {
  height: 85%;
}

/* sidebar 样式 */
.sidebar {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;



}

.category {
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-bottom: 20px;
  justify-content: center;
  align-items: center;

}

.uptitle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  width: 85%;
  height: 50%;
  background-color: rgb(165, 171, 178);
  border-radius: 12px;
  margin-top: 10px;

}

.uptitle h2 {
  font-size: 16px;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.category button {
  padding: 10px;
  margin: 5px;
  width: 40%;
  height: 40px;
  background-color: #fdfdfd;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  cursor: pointer;
}

.category button:hover {
  background-color: #f0f0f0;
  border-color: #bbb;
}

/* 额外功能区域样式 */
.extra-functions {

  height: 60%;
  width: 95%;
  margin-top: 38%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;



}

.train-button {
  margin-top: 20px;
  /* 按钮与上方内容的间距 */
  width: 60%;
  /* 按钮宽度填满容器 */
  padding: 10px;
  /* 按钮内边距 */
  font-size: 14px;
  /* 按钮文字大小 */
  font-weight: bold;
  /* 加粗文字 */
  color: white;
  /* 按钮文字颜色 */
  background-color: #3b3d3f;
  /* 按钮背景色 */
  border: none;
  /* 移除边框 */
  border-radius: 8px;
  /* 圆角 */
  cursor: pointer;
  /* 鼠标悬停时变成手型 */
  transition: background-color 0.3s ease;
  /* 动态效果 */
}

.train-button:hover {
  background-color: #005a9e;
  /* 悬停时的按钮背景色 */
}

/* 上传按钮样式 */
.upload-container {
  width: 90%;
  height: 7%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;


}

.upload-button {
  width: 95%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #fff;
  background-color: #2b3a4a;
  border: 2px solid #fff;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 1px;
}

.upload-button:hover {
  background-color: #3c4d5e;
}

.upload-container p {
  color: #de4f4f;
  font-size: 14px;
}

/* 拖拽区域样式 */
.drag-drop-area {
  width: 95%;
  height: 60%;
  background-color: #2b3a4a;
  border: 2px dashed #fff;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;

}

.drag-drop-area:hover {
  background-color: #3c4d5e;
}

.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

.icon {
  font-size: 30px;
}

.icon-container p {
  margin-top: 5px;
  font-size: 14px;
}


.image-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  height: 50%;
  gap: 10px;


  overflow: hidden;
  /* 隐藏超出范围的内容 */
}

.image-preview video {
  width: 100%;
  /* 匹配父容器宽度 */
  height: 100%;
  /* 匹配父容器高度 */
  object-fit: cover;
  /* 确保视频缩放时保持比例 */
}


.image-preview h2 {
  font-size: 16px;
  margin: 0;
}

.preview-image {
  width: 98%;
  height: 100%;
  object-fit: cover;
  /* 确保图片充满窗口而不变形 */
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  /* 防止溢出 */

}

/* 顶部按钮栏样式 */
.top-buttons {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  gap: 10px;

}

.top-buttons button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #5095df;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.top-buttons button.active {
  background-color: #434242;
}

.top-buttons button:hover {
  opacity: 0.8;
}

.mergebutton {
  width: 80%;
  height:5%;
  padding: 8px;
  background-color: #3b3e40;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.mergebutton:hover {
  background-color: #005a9e;
}
</style>
