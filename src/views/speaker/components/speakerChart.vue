<!-- echarts组件 -->
<template>
  <div
    id="myChart"
    ref="chartRef"
    :style="{ width: '940px', height: '526px' }"
    @click="handleClkChart"
    v-once
  ></div>
  <!-- <p>转换后的X坐标值：{{ convertToPixel(200, 'x') }}</p> -->
</template>
<script setup lang="ts">
import { ref , onMounted,  } from "vue";
import { ECharts } from "echarts";
import * as echarts from 'echarts';
import customPointImage from "@/assets/ucl.png";
import { ElMessage } from 'element-plus'
let chartInstance: ECharts;
const chartRef = ref<ECharts | null>(null);
const UclData :number[]= [];
const AcData :number[]= [];
const xAxisData =  ["125", "250", "500", "1k", "2k", "4k", "8k"];
// 自定义x轴的数字样式
const formatter = (value: string) => {
  return value != 125 && value != 250 && value != "8k"
    ? "{border|" + value + "}"
    : value;
};
const option = {
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: 40,
    right: 40,
    top: 40,
    bottom: 40,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: xAxisData,
    axisLabel: {
      //轴上的字 字体、样式
      // inside: true,
      formatter: formatter,
      // textStyle: {
      //   color: "red",
      // //   fontSize: "10",
      // //   itemSize: "",
      // },
      rich: {
        border: {
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 2,
          borderColor: "#d54949",
          padding: [3, 5],
        },
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#ACACAC",
      },
    },
  },
  yAxis: {
    type: "value",
    min:0,max:120,
  },
  series: [{
    data: UclData,
    type: "line",
  },{
    data: AcData,
    type: "line",
  }],
  graphic: [
    {
      type: "rect",
      left: "x",
      right: "x2",
      top: "y",
      bottom: "y2",
      silent: true,
      z: 10, // 设置遮罩层与折线图系列的层级相同
      style: {
        fill: "#f60",
      },
      onclick: () => {
        console.log("点击了折线之外的区域");
      },
    },
  ],
};
const initChart = () => {
  chartInstance = echarts.init(chartRef.value as HTMLDivElement);
  chartInstance.setOption(option);
  chartRef.value = chartInstance;
};
const handleClkChart = (event) => {
  // console.log(2222)
  // console.log(chartRef.value.offsetWidth);
  // initChart()
};
// const convertToPixel = (value: number, axisName: string) => {
//   const chartInstance = chartRef.value;
//   console.log(chartInstance)
//   if (chartInstance) {
//     return chartInstance.convertToPixel({ [axisName]: value }, "grid")[
//       axisName
//     ];
//   }

//   return 0;
// };
const emit = defineEmits(["handleClk"]);
onMounted(() => {
  // 获取挂载的组件实例
  // chart = init(chartRef.value as HTMLElement);
  
  initChart();
  chartInstance.getZr().on("mouseup", (params: any) => {
    console.log(poper);

    let x= params.offsetX
    let y= params.offsetY
    let pixel =   chartInstance.convertFromPixel({
      seriesIndex:0,xAxisIndex:0
    },[x,y])
    if(UclData.length == xAxisData.length){
      ElMessage({
        showClose: true,
        message: '已超出最大数据量，请删除后再添加',
        type: 'error',
      });
      return
    }
    //TODO 判断Ac还是Ucl
    //获取到坐标后，需要自动计算它靠近那个数据
    let yAxis =  pixel[1];
    //计算出最近的坐标
    let clkY =  Math.round(yAxis/20)*20
    if(20>clkY || clkY>80){
      ElMessage({
        showClose: true,
        message: '超出范围，请重新选择',
        type: 'error',
      });
      return
    }
    UclData.push(clkY)
    //TODO 区分Ac和Ucl
    option.series[0].data = UclData
    chartInstance.setOption(option)
  });

  // 自适应
  window.onresize = function () {
    chartRef.value.resize();
  };
  // chartRef.value.on("click", (params: any) => {
  //   console.log(params);
  //   emit("handleClk", params.data);
  //   data2.splice(params.dataIndex, 1, null);
  //   if (chart) {
  //     chart.setOption(option);
  //   }
  // });
  return {};
});
</script>
  <style lang="scss" scoped>
#myChart {
  // border: 1px solid #D8D8D8;
  background-color: #f6f6f6;
}
</style>
  