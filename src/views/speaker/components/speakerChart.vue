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
import { ref, onMounted, watch } from "vue";
import { ECharts } from "echarts";
import * as echarts from "echarts";
import customPointImage from "@/assets/ucl2.png";
import { ElMessage } from "element-plus";
let chartInstance: ECharts;
type Props = {
  chartIndex: any;
};
const chartRef = ref<ECharts | null>(null);
const props = defineProps<Props>();
const UclData: number[] = [];
const AcData: number[] = [];
const xAxisData = ["125", "250", "500", "1k", "2k", "4k", "8k"];
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
    min: 0,
    max: 120,
  },
  series: [
    {
      data: AcData,
      type: "line",
      symbolSize: [12, 12],
      itemStyle: {
        normal: {
          color: "#A01616",
          lineStyle: {
            color: "#A01616",
          },
        },
      },
    },
    {
      data: UclData,
      type: "line",
      symbol: `image://${customPointImage}`, // 自定义点的图标
      symbolSize: [16, 16], // 图标的大小
      itemStyle: {
        normal: {
          color: "#A01616",
          lineStyle: {
            color: "#A01616",
          },
        },
      },
    },
    {
      name: "Email",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [20, 20, 20, 20, 20, 20, 20],
      // itemStyle: {
      //   normal: {
      //     color: "rgba(66, 66, 66, 0.14)",
      //     opacity: 0.4,
      //     lineStyle: {
      //       color: "#3E3E3E",
      //     },
      //   },
      // },
      itemStyle: {
        normal: {
          // color: "rgba(66, 66, 66, 0.14)",
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(66, 66, 66, 0.3)" }, //s 100以下的颜色设为透明
          // { offset: 0.2, color: "rgba(66, 66, 66, 0.4)" }, // 100-120之间的颜色设为透明
          { offset: 0.4, color: "rgba(66, 66, 66, 0.3)" }, // 100-120之间的颜色设为透明
          { offset: 0.5, color: "rgba(66, 66, 66, 0.3)" }, // 100-120之间插入透明到红色之间的颜色
          { offset: 1, color: "rgba(0,0,0,0)" }, // 大于120的颜色设为红色
        ]),
          opacity: 0.4,
          // lineStyle: {
          //   color: "#3E3E3E",
          // },
        },
      },
    },
    {
      name: "Email",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [120, 120, 120, 120, 120, 120, 120],
      itemStyle: {
        normal: {
          // color: "rgba(66, 66, 66, 0.14)",
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(66, 66, 66, 0.3)" }, //s 100以下的颜色设为透明
          // { offset: 0.2, color: "rgba(66, 66, 66, 0.4)" }, // 100-120之间的颜色设为透明
          { offset: 0.4, color: "rgba(66, 66, 66, 0.3)" }, // 100-120之间的颜色设为透明
          { offset: 0.5, color: "rgba(0,0,0,0)" }, // 100-120之间插入透明到红色之间的颜色
          { offset: 1, color: "rgba(0,0,0,0)" }, // 大于120的颜色设为红色
        ]),
          opacity: 0.4,
          lineStyle: {
            color: "#3E3E3E",
          },
        },
      },
    },
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
  console.log(props.chartIndex);
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
watch(props.chartIndex, (newValue, oldValue) => {
  console.log(props.chartIndex);
});
const emit = defineEmits(["handleClk"]);
onMounted(() => {
  // 获取挂载的组件实例
  // chart = init(chartRef.value as HTMLElement);

  initChart();
  chartInstance.getZr().on("click", (params: any) => {
    let data = props.chartIndex == 0 ? AcData : UclData;
    let x = params.offsetX;
    let y = params.offsetY;
    let pixel = chartInstance.convertFromPixel(
      {
        seriesIndex: 0,
        xAxisIndex: 0,
      },
      [x, y]
    );
    if (data.length == xAxisData.length) {
      ElMessage({
        showClose: true,
        message: "已超出最大数据量，请删除后再添加",
        type: "error",
      });
      return;
    }
    //TODO 判断Ac还是Ucl
    //获取到坐标后，需要自动计算它靠近那个数据
    let yAxis = pixel[1];
    //计算出最近的坐标
    let clkY = Math.round(yAxis / 20) * 20;
    if (20 > clkY || clkY > 80) {
      ElMessage({
        showClose: true,
        message: "超出范围，请重新选择",
        type: "error",
      });
      return;
    }
    data.push(clkY);
    //TODO 区分Ac和Ucl
    option.series[props.chartIndex].data = data;
    chartInstance.setOption(option);
  });

  // 自适应
  window.onresize = function () {
    chartInstance.resize();
  };
  chartInstance.on("contextmenu", (params: any) => {
    params.event.event.preventDefault();
    let data = props.chartIndex == 0 ? AcData : UclData;
    data.splice(params.dataIndex, 1);
    if (chartInstance) {
      option.series[props.chartIndex].data = data;
      chartInstance.setOption(option);
    }
  });
  return {};
});
</script>
  <style lang="scss" scoped>
#myChart {
  // border: 1px solid #D8D8D8;
  background-color: #f6f6f6;
}
</style>
  