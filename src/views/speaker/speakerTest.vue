<!-- 扬声器测听 -->
<template>
  <el-container>
    <el-header>
      <userHeader></userHeader>
    </el-header>
    <el-main>
      <el-tabs type="border-card">
        <el-tab-pane label="扬声器测听">
          <!-- echarts图表 -->
          <amplifier-test></amplifier-test>
          <!-- <div id="echarts-a" style="width: 600px;height:400px;"></div> -->
        </el-tab-pane>
        <el-tab-pane label="听力测试">
          <hearTest
            @handleStart="handleStart"
            @handleStop="handleStop"
          ></hearTest>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <footer-tab></footer-tab>
  </el-container>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { auditionApi } from "@/serve/api/user";
import * as echarts from "echarts";
import userHeader from "../lay/MainHeader.vue";
import hearTest from "./hearTest.vue";
import amplifierTest from "./amplifierTest.vue";
import footer from "../../components/sound/index.vue";
import footerTab from "../../components/footerTab.vue";
import { useRoute } from "vue-router";
let value = ref("1");
let isStart = false;
const route = useRoute();
const testData = JSON.parse(route.query.testData);
const startTest = async () => {
  //开始
  const res = await auditionApi.startTest(testData);
  if (res.code == 0) {
    isStart = true;
  }
};
const stopTest = async () => {
  //结束
  const res = await auditionApi.stopTest();
  if (res.code == 0) {
    isStart = false;
  }
};
const handleStart = () => {
  if (isStart) return;
  startTest();
};
const handleStop = () => {
  if (!isStart) return;
  stopTest();
};
onMounted(() => {
  document.addEventListener("astilectron-ready", function () {
    astilectron.onMessage(function (message) {
      console.log(message);
    });
  });
});
</script>
<style lang="scss" scoped>
.el-container {
  width: 1080px;
  height: 820px;
  .el-tabs {
    height: 700px;
  }
  .el-main {
    padding-block: inherit;
    padding: 0 !important;
  }
}
.el-tabs--border-card {
  background-color: #f5f5f5;
}
</style>