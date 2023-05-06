<script lang="ts" setup>
// import hear from "./hear/Sound.vue"
// import vision from "./vision/index.vue"

import foot from "./lay/foot.vue";
import { ref } from "vue";

const options = [
  { value: "Option1", label: "Option1" },
  { value: "Option2", label: "Option2" },
];
let startTestDialogVisible = ref(false);
let value = "";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="24">
            <div class="ep-bg-purple-dark"><label>首页</label></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="ep-bg-purple-dark1" />
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div>开始&测试</div>
        <el-select v-model="value" filterable placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div style="margin-top: 5px">
          <el-button @click="startTestDialogVisible = true">开始测试</el-button>
        </div>
      </el-main>
      <el-footer>
        <foot></foot>
      </el-footer>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
html,
body,
#app {
  margin-top: 0px;
  margin-left: 0px;
  border-top: 1px solid var(--el-border-color);
  border-radius: 4px;
}

.el-main {
  text-align: center;
  display: inline-block;
}

.common-layout {
  width: 1080px;
  height: 540px;
  margin-top: 0px;
}

.el-header {
  height: 90px;
  background-color: aqua;
  padding: 0;

  .el-row {
    width: 100%;

    .ep-bg-purple-dark {
      height: 50px;
      background-color: #e2dada;

      label {
        font-size: 16px;
        font-weight: bold;
        color: black;
        display: inline-block;
        margin: 12px 25px;
      }
    }

    .ep-bg-purple-dark1 {
      margin-left: 0px;
      height: 40px;
      background-color: #c2c86b;
    }
  }
}

.el-main {
  height: 480px;
  background-color: beige;
}

.el-footer {
  height: 60px;
  background-color: rgb(38, 36, 32);
  text-align: center;
}
</style>
