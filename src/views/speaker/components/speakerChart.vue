<template>
  <div
    id="myChart"
    ref="chartRef"
    :style="{ width: '536px', height: '486px' }"
  ></div>
</template>
  <script setup lang="ts">
import { ref, Ref, reactive, defineComponent, onMounted, watch } from "vue";
import { ECharts, EChartsOption, init } from "echarts";
let chart: ECharts;
const chartRef: Ref<HTMLElement | null> = ref(null);
const initChart = () => {
  const option = {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
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
        inside: false,
        // textStyle: {
        //   color: "red",
        // //   fontSize: "10",
        // //   itemSize: "",
        // },
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
      splitLine: {
        show: true,
        lineStyle: {
          color: "#ACACAC",
        },
      },
    },
    series: [
      {
        name: "Email",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [120, 132, 101, 134, 90, 230, 210],
        itemStyle: {
          normal: {
            color: "rgba(66, 66, 66, 0.14)",
            opacity: 0.4,
            lineStyle: {
              color: "#3E3E3E",
            },
          },
        },
      },
      {
        name: "Email",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210],
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
        name: "Union Ads",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310],
        itemStyle: {
          normal: {
            color: "#A01616",
            lineStyle: {
              color: "#A01616",
            },
          },
        },
      },
    ],
  };
  chart.setOption(option);
};
const emit = defineEmits(["handleClk"]);
onMounted(() => {
  // 获取挂载的组件实例
  chart = init(chartRef.value as HTMLElement);
  initChart();
  // 自适应
  window.onresize = function () {
    chart.resize();
  };
  chart.on("click", (params: any) => {
    console.log(params);
    emit("handleClk", params.data);
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
  