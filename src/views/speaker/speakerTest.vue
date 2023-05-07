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
          <hearTest></hearTest>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <footer-tab></footer-tab>
  </el-container>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import * as echarts from "echarts";
import userHeader from "../lay/MainHeader.vue";
import hearTest from "./hearTest.vue";
import amplifierTest from "./amplifierTest.vue";
import footerTab from "../../components/footerTab.vue";

// var myChart = echarts.init(document.getElementById('echarts-a'));
// 绘制图表
// myChart.setOption({
//   title: {
//     text: 'ECharts 入门示例'
//   },
//   tooltip: {},
//   xAxis: {
//     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
//   },
//   yAxis: {},
//   series: [
//     {
//       name: '销量',
//       type: 'bar',
//       data: [5, 20, 36, 10, 10, 20]
//     }
//   ]
// });

let value = ref("1");
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
  }
}
.el-tabs--border-card {
  background-color: #f5f5f5;
}
</style>