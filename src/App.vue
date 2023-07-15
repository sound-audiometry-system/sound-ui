<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
export default {
  directives: {
    scale: {
      mounted:(el: { offsetWidth: number; offsetHeight: number; style: { transform: string; }; })=> {
        const setScale = () => {
          const screenWidth = window.innerWidth;
          console.log(el.offsetWidth)
          console.log(el.offsetHeight)
          const screenHeight = window.innerHeight;
          console.log(screenHeight)
          const scaleX = screenWidth / el.offsetWidth;
          const scaleY = screenHeight / el.offsetHeight;
          const scale = scaleX > scaleY ? scaleY : scaleX;
          // const scale = scaleX;
          // console.log(scaleX)
          // console.log(scaleY)
          el.style.transform = `scale(${scaleX})`;
        };
        setScale();
        
        window.addEventListener('resize', setScale);
      }
    }
  }
}
</script>

<template>
  <div v-scale class="container">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.container {
  // height: 100%;
  width: 1920px; /* 设计稿宽度 */
  height: 1080px; /* 设计稿高度 */
  transform-origin: left top;
  transform: scale(1); /* 初始缩放比例 */
  transition: transform 0.3s ease-out;
}
</style>
