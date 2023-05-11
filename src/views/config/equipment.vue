<!-- 设备连接 -->
<template>
  <el-container>
    <el-header>
      <label>测试前连接</label>
      <button type="button">连接</button>
    </el-header>
    <el-container>
      <el-aside width="590px">
        <el-row style="height: 360px">
          <el-col :span="24">
            <sound></sound>
          </el-col>
        </el-row>
        <el-row class="xxx-a">
          <el-row>
            <el-col
              style="background-color: aliceblue"
              v-for="index in 12"
              :key="index"
              :span="6"
            >
              <div
                class="config-b"
                :style="{
                  'text-align': 'center',
                  backgroundColor: getBgc(index),
                }"
              >
                {{ index }}
              </div>
              {{ index }} 号音响
            </el-col>
          </el-row>
        </el-row>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import sound from "../../components/sound/index.vue";
let getBgc = (idex) => {
  if (idex == 1 || idex == 6) {
    return "#ffffff";
  }
  if (idex < 6 && idex > 1) {
    return "red";
  }
  if (idex > 6) {
    return "blue";
  }
};
</script>
<style scoped lang="scss">
.el-header {
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1040px;
}

.xxx-a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 590px;
  height: 200px;
  flex-direction: column;
  flex-wrap: nowrap;
  background-color: #f6f6f6;

  .el-row {
    height: 48px;
    width: 540px;
    display: flex;

    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    align-content: center;

    .el-col {
      margin-left: 3px;
      display: flex;
      justify-content: space-around;
      width: 48px;
      height: 36px;
      margin-bottom: 3px;
      .config-b {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: red;
        margin: 3px;
      }
    }
  }
}

.el-aside {
  display: flex;
  flex-direction: column;
}
</style>
