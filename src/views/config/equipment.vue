<!-- 设备连接 -->
<template>
  <el-row>
    <el-col :span="24" style="display: flex">
      <div style="width: 1040px">
        <label>测试前连接</label>
        <button type="button" @click="buttClick">连接</button>
      </div>
    </el-col>
  </el-row>
  <el-container>
    <el-aside width="540px">
      <el-row style="height: 375px; width: 525px">
        <el-col :span="24">
          <sound :sounds="deviceset"></sound>
        </el-col>
      </el-row>
      <el-row class="xxx-a">
        <el-col
          :span="7"
          style="background-color: aliceblue"
          v-for="index in 12"
          :key="index"
        >
          <div
            class="config-b"
            :style="{ 'text-align': 'center', backgroundColor: getBgc(index) }"
          >
            {{ index }}
          </div>
          {{ index }} 号音响
        </el-col>
      </el-row>
    </el-aside>
    <el-main width="540px">
      <el-row style="width: 100%" :gutter="20">
        <el-col :span="24">显示器</el-col>
        <el-col :span="12" class="monitor-a">
          <div style="display: flex; align-items: center; margin: 10px 0">
            <span
              style="width: 20px; margin-right: 10px; color: #fff; height: 20px line-height: 20px; background-color: #3457C6; text-align: center;"
              >左</span
            >
            <span>显示器</span>
          </div>
          <div style="width: 100%; height: 174px; background-color: #000"></div>
        </el-col>
        <el-col :span="12" class="monitor-a">
          <div style="display: flex; align-items: center; margin: 10px 0">
            <span
              style="width: 20px; margin-right: 10px; height: 20px line-height: 20px; background-color: #D8D8D8; text-align: center;"
              >右</span
            >
            <span>显示器</span>
          </div>
          <div style="width: 100%; height: 174px; background-color: #000"></div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import sound from "../../components/sound/index.vue";
import { auditionApi } from "@/serve/api/user";
let deviceset = ref([]);
const devices = [
{
    soundVal: '001',
    soundVal2: '002',
    active: false,
  },
  {
    soundVal: '011',
    soundVal2: '012',
    active: false,
  },
  {
    soundVal: '021',
    soundVal2: '022',
    active: false,
  },
  {
    soundVal: '031',
    soundVal2: '032',
    active: false,
  },
  {
    soundVal: '041',
    soundVal2: '042',
    active: false,
  },
  {
    soundVal: '051',
    soundVal2: '052',
    active: false,
  },
  {
    soundVal: '061',
    soundVal2: '062',
    active: false,
  },
  {
    soundVal: '071',
    soundVal2: '072',
    active: false,
  },
  {
    soundVal: '081',
    soundVal2: '082',
    active: false,
  },
  {
    soundVal: '091',
    soundVal2: '092',
    active: false,
  },
  {
    soundVal: '101',
    soundVal2: '102',
    active: false,
  },
  {
    soundVal: '111',
    soundVal2: '112',
    active: false,
  },
]
const getDevice = async (id)=> {
  const res = await auditionApi.getDevice({id: id})
  // if (res.code == 0) {
  //   deviceset.value = res.list
  //   // res.list.forEach(item=>{
  //   //   deviceset.push(item.substring(0,2))
  //   // })
  //   // console.log(deviceset);
  //   //渲染已连接的音箱
  // }
}
let buttClick = async () => {
  // window.setTimeout(() => {
  //   // deviceset.value = ["012", "013"];
  //   // console.log(deviceset)
  // }, 1000);
  // const res = await auditionApi.getDevice({id: '011'});
  for (const item of devices) {
    getDevice(item.soundVal)
    if (item.soundVal2) {
      getDevice(item.soundVal2)
    }
  }
  
  
};
let getBgc = (idex) => {
  if (idex == 0 || idex == 6) {
    return "#ffffff";
  }
  if (idex < 6 && idex > 1) {
    return "red";
  }
  if (idex > 6) {
    return "blue";
  }
};
</script>
<style scoped lang="scss">
.el-container {
  width: 1080px;
  height: 625px;
  margin: 0 auto;
  margin-top: 50px;
  .el-main {
    display: flex;
    width: 540px;
    height: 200px;
    margin: 2px;

    :deep(.el-col .monitor) {
      width: 260px;
      height: 200px;
      background-color: aqua;
    }
  }

  .xxx-a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 540px;
    height: 240px;
    // flex-direction: column;
    flex-wrap: wrap;
    background-color: #f6f6f6;

    .el-col {
      margin-left: 3px;
      display: flex;
      justify-content: space-around;
      width: 100px;
      height: 32px;
      // margin-bottom: 3px;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      align-content: center;

      :deep(.config-b) {
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 50%;
        background-color: red;
        margin: 3px;
      }
    }

    .el-row {
      height: 48px;
      width: 540px;
      display: flex;

      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      align-content: center;
    }
  }
}
</style>
