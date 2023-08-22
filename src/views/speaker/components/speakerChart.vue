<!-- echarts组件 -->
<template>
  <div
    id="myChart"
    ref="chartRef"
    :style="{ width: '940px', height: '526px' }"
    @click="handleClkChart"
  ></div>
</template>
  <script setup lang="ts">
import { ref, Ref, reactive, defineComponent, onMounted, watch } from "vue";
import { ECharts, EChartsOption, init } from "echarts";
import customPointImage from "@/assets/ucl.png";
let chart: ECharts;
const chartRef: Ref<HTMLElement | null> = ref(null);
const data1 = [120, 132, 101, 134, 90, 230, 210];
const data2 = [220, 182, 191, 234, 290, 330, 310];
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
    data: ["125", "250", "500", "1k", "2k", "4k", "8k"],
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
    type: "category",
    data: ["120", "100", "80", "60", "40", "20", "0"],
    // splitLine: {
    //   show: true,
    //   lineStyle: {
    //     color: "#ACACAC",
    //   },
    // },
  },
  
  series: [
    // {
    //   name: "Email",
    //   type: "line",
    //   stack: "Total",
    //   areaStyle: {},
    //   emphasis: {
    //     focus: "series",
    //   },
    //   data: [
    //     [0, 2],
    //     [1, 2],
    //     [2, 2],
    //     [3, 2],
    //     [4, 2],
    //     [5, 2],
    //     [6, 2],
    //   ],
    //   itemStyle: {
    //     normal: {
    //       color: "rgba(66, 66, 66, 0.14)",
    //       opacity: 0.4,
    //       lineStyle: {
    //         color: "#3E3E3E",
    //       },
    //     },
    //   },
    // },
    // {
    //   name: "Email",
    //   type: "line",
    //   stack: "Total",
    //   areaStyle: {},
    //   emphasis: {
    //     focus: "series",
    //   },
    //   data: [
    //     [0, 2],
    //     [1, 2],
    //     [2, 2],
    //     [3, 2],
    //     [4, 2],
    //     [5, 2],
    //     [6, 2],
    //   ],
    //   itemStyle: {
    //     normal: {
    //       color: "rgba(66, 66, 66, 0.14)",
    //       opacity: 0.4,
    //       lineStyle: {
    //         color: "#3E3E3E",
    //       },
    //     },
    //   },
    // },
    // {
    //   name: "Email",
    //   type: "line",
    //   stack: "Total",
    //   data: [
    //     [0, 3],
    //     [1, 2],
    //     [2, 3],
    //     [3, 4],
    //     [4, 5],
    //   ],
    //   // symbol: 'triangle',
    //   symbol: `image://${customPointImage}`, // 自定义点的图标
    //   symbolSize: [40, 20], // 图标的大小
    //   itemStyle: {
    //     normal: {
    //       color: "#A01616",
    //       lineStyle: {
    //         color: "#A01616",
    //       },
    //     },
    //   },
    // },
    // {
    //   name: "Union Ads",
    //   type: "line",
    //   stack: "Total",
    //   data: [
    //     [0, 1],
    //     [1, 2],
    //     [2, 3],
    //     [3, 4],
    //     [4, 5],
    //   ],
    //   symbolSize: 10,
    //   itemStyle: {
    //     normal: {
    //       color: "#A01616",
    //       lineStyle: {
    //         color: "#A01616",
    //       },
    //     },
    //   },
    // },
  ],
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
        fill: '#f60'
      },
      onclick: () => {
        console.log("点击了折线之外的区域");
      },
    },
  ],
};
const initChart = () => {
  chart.setOption(option);
};
const handleClkChart = (event)=> {
  // console.log(2222)
  console.log(chartRef.value.offsetWidth)
}

const emit = defineEmits(["handleClk"]);
onMounted(() => {
  // 获取挂载的组件实例
  chart = init(chartRef.value as HTMLElement);
  initChart();
  // 自适应
  window.onresize = function () {
    chart.resize();
  };
  // chart.on("click", (params: any) => {
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
  