<!-- 设备连接 -->
<template>
  <el-row>
    <el-col :span="24" style="display: flex;">
      <div style="width: 1040px">
        <label>测试前连接</label>
        <button type="button">连接</button>
      </div>
    </el-col>
  </el-row>
  <el-container>
    <el-aside width="540px">
      <el-row style="height: 375px;width: 525px;">
        <el-col :span="24">
          <sound></sound>
        </el-col>
      </el-row>
      <el-row class="xxx-a">
        <el-col style="background-color: aliceblue;" v-for="index in 12" :key="index" :span="12">
          <div class="config-b" :style="{ 'text-align': 'center', backgroundColor: getBgc(index), }">
            {{ index }}
          </div>
          {{ index }} 号音响
        </el-col>
      </el-row>
    </el-aside>
    <el-main width="540px">
      <el-row>
        <el-col :span="24">显示器</el-col>
        <el-col :span="12" class="monitor-a">
        </el-col>
        <el-col :span="12" class="monitor-a">
        </el-col>
      </el-row>


    </el-main>
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
.el-container {
  width: 1080px;
  height: 625px;

  .el-main {
    display: flex;
    width: 540px;
    height: 200px;
    margin: 2px;

    :deep(.el-col .monitor) {
      width: 260px;
      height: 200px;
      background-color: aqua;
    }
  }

  .xxx-a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 540px;
    height: 240px;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: #f6f6f6;

    .el-col {
      margin-left: 3px;
      display: flex;
      justify-content: space-around;
      width: 100px;
      height: 32px;
      // margin-bottom: 3px;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      align-content: center;

      :deep(.config-b) {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: red;
        margin: 3px;
      }


    }

    .el-row {
      height: 48px;
      width: 540px;
      display: flex;

      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      align-content: center;


    }
  }
}</style>
