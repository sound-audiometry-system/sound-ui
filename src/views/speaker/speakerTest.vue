<!-- 扬声器测听 -->
<template>
    <el-container>
        <el-header>
            <userHeader></userHeader>
        </el-header>
        <el-main>
            <el-tabs type="border-card">
                <el-tab-pane label="扬声器测听">

                </el-tab-pane>
                <el-tab-pane label="听力测试">听力测试</el-tab-pane>
            </el-tabs>

        </el-main>
    </el-container>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import * as echarts from 'echarts';
import userHeader from "../lay/MainHeader.vue"


var chartDom = document.getElementById('main')!;
var myChart = echarts.init(chartDom);
var option: EChartsOption;

let value = ref("1")

let option = {
  title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
}

</script>
<style lang="scss" scoped>
.el-container {
    width: 1080px;
    height: 800px;
}
</style>