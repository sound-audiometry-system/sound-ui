<template>
  <el-container>
    <el-header>
      <userHeader></userHeader>
      <div class="titleItem">
        <span>扬声器测试</span>
      </div>
      <el-button
        size="large"
        style="float: right; position: relative; z-index: 999; margin-top: 3px"
        @click="$router.back()"
        >返回</el-button
      >
    </el-header>
    <el-main>
      <div style="margin-top: 80px">
        <el-row :gutter="10">
          <el-col :span="13">
            <el-icon style="position: absolute;right: 82px;top: -24px;font-size: 18px;cursor: pointer;" @click="handleDelLine">
              <Delete />
            </el-icon>
            <speaker-chart ref="chartRef" :chartIndex="chartIndex"></speaker-chart>
            <div class="chart-btm">
              <div style="display: flex; align-items: center">
                <span class="left-box"></span>强制性频率
              </div>
              <!-- <div>
                <el-button type="info" plain>保存并进行另一侧</el-button>
              </div> -->
            </div>
          </el-col>
          <el-col :span="11">
            <sound :sound-index="soundIndex"></sound>
            <div style="margin-top: 60px">
              <div :class="'mbm14 ac-btn ' + acActive" v-on:click="clkAc">
                <img
                  style="margin-right: 6px"
                  src="../../assets/ac.png"
                  width="40"
                  alt=""
                />
                AC
              </div>
              <div
                @click="chartIndex = 1"
                :class="'mbm14 ac-btn ' + uclActive"
                v-on:click="clkUcl"
              >
                <img
                  style="margin-right: 6px"
                  src="../../assets/ucl.png"
                  width="40"
                  alt=""
                />
                UCL
              </div>
              <div class="mbm14 bc-btn">
                播放信号
                <p class="c9">[空格]</p>
              </div>
              <div class="mbm14 bc-btn">
                <p>保存点</p>
                <p class="c9">[Enter]</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import sound from "../../components/sound/index.vue";
import speakerChart from "./components/speakerChart.vue";
import userHeader from "../lay/MainHeader.vue";
import { imitateApi } from "@/serve/api/user";
import { onMounted, ref } from "vue";
const acActive = ref("btn-active");
const uclActive = ref("");
let chartIndex = ref(0);
const soundIndex = ref(1);
const chartRef = ref(null);
const clkUcl = () => {
  uclActive.value = "btn-active";
  acActive.value = "";
  chartIndex.value = 1;
  console.log("clkUcl");
  // console.log(chartIndex);
};
const clkAc = () => {
  uclActive.value = "";
  acActive.value = "btn-active";
  chartIndex.value = 0;
  console.log("clkAc");
};

// getAudioTest
const getAudioTest = async () => {
  const res = await imitateApi.getAudioTest();
};
const handleDelLine = ()=> {
  chartRef.value.handleDelLine();
}
onMounted(() => {
  getAudioTest();
});
</script>

<style lang="scss" scoped>
.titleItem {
  display: flex;
  align-items: center;
  width: 1893px;
  height: 60px;
  background-color: rgb(32, 133, 112);
  line-height: 60px;
  text-align: center;

  span {
    margin-left: 12px;
    font-size: x-large;
    color: #ffffff;
  }
}

.ac-btn {
  width: 261px;
  line-height: 29px;
  background: #d8d8d8;
  border: 1px solid #979797;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  font-size: 14px;
}
.bc-btn {
  width: 261px;
  height: 56px;
  background: #d8d8d8;
  border: 1px solid #979797;
  margin: auto;
  text-align: center;
}
.btn-active {
  background: #c2c76a;
}
.mbm14 {
  margin-bottom: 14px;
}
.c9 {
  color: #989898;
}
.chart-btm {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  .left-box {
    display: inline-block;
    width: 40px;
    height: 20px;
    border: 1px solid #d54949;
    margin-right: 6px;
  }
}
</style>