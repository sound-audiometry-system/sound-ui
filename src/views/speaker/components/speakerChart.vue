<!-- echarts组件 -->
<template>
  <div
    id="myChart"
    ref="chartRef"
    :style="{ width: '940px', height: '526px' }"
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
import { imitateApi } from "@/serve/api/user";
let chartInstance: ECharts;
type Props = {
  chartIndex: any;
  clickXY: any;
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
    formatter: function (params) {
      console.log(params)
    }
  },
  legend: {
    data: ["AC", "UCL"],
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
      name: "AC",
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
      name: "UCL",
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
      type: "line",
      stack: "Total",
      areaStyle: {},
      // emphasis: {
      //   focus: "series",
      // },
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
/**
 * 删除按钮，删除当前选中线条所有数据
 */
const handleDelLine = () => {
  let data = props.chartIndex == 0 ? AcData : UclData;
  if (data.length === 0) return;
  ElMessageBox.confirm("确认删除当前选中线条所有数据？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    data.splice(data.length - 1, 1);
    if (chartInstance) {
      option.series[props.chartIndex].data.length = 0;
      chartInstance.setOption(option);
    }
  });
};
const initChart = () => {
  chartInstance = echarts.init(chartRef.value as HTMLDivElement);
  chartInstance.setOption(option);
};
watch(props.chartIndex, (newValue, oldValue) => {});
const emit = defineEmits(["handleClk"]);
defineExpose({
  handleDelLine,
});
onMounted(() => {
  // 获取挂载的组件实例
  // chart = init(chartRef.value as HTMLElement);
  initChart();
  chartInstance.getZr().on("click", async (params: any) => {
    //初始化点击鼠标
    props.clickXY.length = 0;
    let data = props.chartIndex == 0 ? AcData : UclData;
    const pointInPixel = [params.offsetX, params.offsetY];
    // console.log(chartInstance.convertFromPixel("grid", pointInPixel));
    // 使用 convertFromPixel方法 转换像素坐标值到逻辑坐标系上的点。获取点击位置对应的x轴数据的索引         值，借助于索引值的获取到其它的信息
    // 转换X轴坐标
    let pointInGrid = chartInstance.convertFromPixel(
      { seriesIndex: 0 },
      pointInPixel
    );
    // 转换Y轴坐标
    let pointInGrid2 = chartInstance.convertFromPixel(
      { seriesIndex: 1 },
      pointInPixel
    );
    // 所点击点的X轴坐标点所在X轴data的下标
    let xIndex = pointInGrid[0];
    // 所点击点的Y轴坐标点数值
    let yIndex = pointInGrid2[1];
    // 使用getOption() 获取图表的option
    let op = chartInstance.getOption();
    //获取到x轴的索引值和option之后，我们就可以获取我们需要的任意数据。
    // 点击点的X轴对应坐标的名称
    var xValue = op.xAxis[0].data[xIndex];

    // 点击点的series -- data对应的值
    // console.log(op.series)
    const seriesData = op.series[props.chartIndex].data;
    // 如果之前已经在x轴上绘制过，终止执行
    const xData = seriesData.map((dataPoint) => dataPoint[0]);
    if (xData.includes(xValue)) return;
    // console.log(seriesData);
    var value = seriesData[xIndex] && seriesData[xIndex][1];
    // const dataIndex = seriesData.findIndex((dataPoint) => {
    //   return dataPoint[0] === xIndex && dataPoint[1] === value;
    // });
    // console.log(value)
    // if (dataIndex > -1) {

    // } else {
    // 处理点击画布的逻辑
    // 如果绘制的点已等于x轴数量，停止执行
    // if (xAxisData.length === data.length) return;
    // console.log(params);
    let x = params.offsetX;
    let y = params.offsetY;
    let pixel = chartInstance.convertFromPixel(
      {
        seriesIndex: 0,
        xAxisIndex: 0,
      },
      [x, y]
    );
    //TODO 判断Ac还是Ucl
    //获取到坐标后，需要自动计算它靠近那个数据
    let xAxis = pixel[0];
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
    let isPush = false;
    data.forEach((arr, index) => {
      if (arr[0] === xAxis) {
        data.splice(index, 1, [xAxis, clkY]);
        props.clickXY.push(xAxisData[xAxis], clkY);
        isPush = true;
      }
    });
    if (data.length == xAxisData.length && !isPush) {
      ElMessage({
        showClose: true,
        message: "已超出最大数据量，请删除后再添加",
        type: "error",
      });
      return;
    }
    !isPush && props.clickXY.push(xAxisData[data.length], clkY);
    !isPush && data.push([data.length, clkY]);
    //TODO 区分Ac和Ucl
    option.series[props.chartIndex].data = data;
    chartInstance.setOption(option);
    // }
  });

  // 自适应
  window.onresize = function () {
    chartInstance.resize();
  };
  chartInstance.on("click", async (params: nay) => {
    // 处理点击折线点的逻辑
    const form = {
      file: params.name + "x" + params.data[1],
      volume: 80,
    };
    const res = await imitateApi.playAudioTest(form);
  });
  chartInstance.on("contextmenu", (params: any) => {
    params.event.event.preventDefault();
    let data = props.chartIndex == 0 ? AcData : UclData;
    ElMessageBox.confirm("是否删除此节点？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      data.splice(data.length - 1, 1);
      if (chartInstance) {
        option.series[props.chartIndex].data = data;
        chartInstance.setOption(option);
      }
    });
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
  