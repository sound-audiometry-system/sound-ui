<template>
  <div>
    <el-footer>
      <div
        class="footer-div"
        :class="{ activeColor: route.path == '/' || route.path == '/speaker' }"
        @click="chooseItem(1, '/')"
      >
        <Tickets class="icon" color="white" />
        <text class="font">听力测试</text>
      </div>
      <div
        class="footer-div"
        :class="{ activeColor: route.path == '/checkConfig' }"
        @click="chooseItem(2, '/checkConfig')"
      >
        <Setting class="icon" color="white" />
        <text class="font">配置检查</text>
      </div>
      <div
        class="footer-div"
        :class="{ activeColor: route.path == '/imitate' }"
        @click="chooseItem(3, '/imitate')"
      >
        <Monitor class="icon" color="white" />
        <text class="font">言语实景模拟</text>
      </div>
    </el-footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const active = ref(1)
const route = useRoute();
const chooseItem = (val, route) => {
  active.value = val
  router.push(route)
  //后续为头部切换页面
}
</script>

<style lang="scss" scoped>
.el-footer {
    background-color: rgb(30, 25, 25);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .activeColor {
  background-color: #C7D8D4;

  .icon {
    color: rgb(30, 25, 25)
  }

  .font {
    color: rgb(30, 25, 25)
  }
}
.font {
  font-size: small;
  font-weight: bold;
  color: white;
}
.footer-div {
  width: 10%;
  height: 100%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>