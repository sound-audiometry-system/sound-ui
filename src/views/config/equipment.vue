<!-- 设备连接 -->
<template>
  <el-row style="color: #000">
    <el-col :span="24" style="display: flex">
      <div style="width: 1920px; display: flex; justify-content: space-between">
        <label style="font-size: 15px; font-weight: bold">测试前连接</label>
        <button
          style="
            outline: none;
            width: 100px;
            background-color: #f1871b;
            color: white;
            font-size: 16px;
            box-shadow: none;
          "
          type="button"
          @click="buttClick"
        >
          连接
        </button>
      </div>
    </el-col>
  </el-row>
  <el-container>
    <el-aside style="color: #000">
      <el-row style="height: 400px; width: 760px">
        <el-col :span="24">
          <sound :sounds="deviceset"></sound>
        </el-col>
      </el-row>
      <el-row class="xxx-a">
        <el-col :span="6" v-for="index in deviceset" :key="index">
          <div>
            <div
              class="config-b"
              :style="{
                'font-size': '13px',
                color:
                  index.active &&
                  (parseInt(index.id) == 0 || parseInt(index.id) == 6)
                    ? '#000'
                    : '#fff',
                display: 'inline-block',
                'text-align': 'center',
                backgroundColor: getBgc(index),
              }"
            >
              {{ parseInt(index.id) }}
            </div>
            <label style="color: #000; font-size: 13px; font-weight: bold"
              >{{ parseInt(index.id) }} 号音响</label
            >
          </div>
        </el-col>
      </el-row>
    </el-aside>
    <el-main>
      <el-row :gutter="20" style="color: #000">
        <el-col :span="24">显示器</el-col>
        <el-col :span="12" class="monitor-a">
          <div style="display: flex; align-items: center; margin: 10px 0">
            <span
              style="width: 20px; margin-right: 10px; color: #fff; height: 20px line-height: 20px; background-color: #3457C6; text-align: center;"
            >
              左
            </span>
            <span>显示器</span>
          </div>
          <div
            style="width: 400px; height: 300px; background-color: #000"
          ></div>
        </el-col>
        <el-col :span="12" class="monitor-a">
          <div style="display: flex; align-items: center; margin: 10px 0">
            <span
              style="width: 20px; margin-right: 10px; height: 20px line-height: 20px; background-color: #D8D8D8; text-align: center;"
              >右</span
            >
            <span>显示器</span>
          </div>
          <div
            style="width: 400px; height: 300px; background-color: #000"
          ></div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import sound from "../../components/sound/index.vue";
import { auditionApi } from "@/serve/api/user";
const isSuccess = ref(true);
let deviceset = ref([
  { id: "00", active: false },
  { id: "04", active: false },
  { id: "08", active: false },
  { id: "01", active: false },
  { id: "05", active: false },
  { id: "09", active: false },
  { id: "02", active: false },
  { id: "06", active: false },
  { id: "10", active: false },
  { id: "03", active: false },
  { id: "07", active: false },
  { id: "11", active: false },
]);
const devices = [
  { soundVal: "001", soundVal2: "002", active: false },
  { soundVal: "011", soundVal2: "012", active: false },
  { soundVal: "021", soundVal2: "022", active: false },
  { soundVal: "031", soundVal2: "032", active: false },
  { soundVal: "041", soundVal2: "042", active: false },
  { soundVal: "051", soundVal2: "052", active: false },
  { soundVal: "061", soundVal2: "062", active: false },
  { soundVal: "071", soundVal2: "072", active: false },
  { soundVal: "081", soundVal2: "082", active: false },
  { soundVal: "091", soundVal2: "092", active: false },
  { soundVal: "101", soundVal2: "102", active: false },
  { soundVal: "111", soundVal2: "112", active: false },
];
const getDevice = async (id, index, id2) => {
  const res = await auditionApi.getDevice({ id: id });
  const res2 = await auditionApi.getDevice({ id: id2 });
  var idstr = id.substring(0, 2);
  // var idstr2 = id2.substring(0, 2);
  if (res && res.code == 0 && res2 && res2.code == 0) {
    // if (deviceset.value.includes(idstr)) return;
    deviceset.value.filter((item) => item.id == idstr)[0].active = true;
  }
  
  if (index + 1 === devices.length) {
    deviceset.value.forEach((ele, eleIndex) => {
      if (!ele.active) {
        isSuccess.value = false;
        ElMessageBox.confirm(
          "连接异常！",
          "提示",
          {
            confirmButtonText: "重新连接",
            cancelButtonText: "关闭",
            type: "warning",
          }
        ).then(() => {
          buttClick()
        });
        throw new Error();
      } else if (ele.active && eleIndex + 1 === devices.length) {
        isSuccess.value = true;
        ElMessageBox.confirm(
          "连接成功！",
          "提示",
          {
            confirmButtonText: "完成连接",
            showCancelButton: false,
            type: "success",
          }
        ).then(() => {

        });
      }
    });
  }
  // console.log('===>>deviceset',deviceset)
};
let buttClick = async () => {
  for(let i = 0;i<devices.length;i++){
    let item = devices[i];
    getDevice(item.soundVal, i, item.soundVal2);
    await sleep(2000)
  }
};
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
let getBgc = (idx) => {
  // console.log("idx===>执行", idx.id)
  // if (!idx.active) return "#DEDEDE"
  let bgCor = "";
  // deviceset.value.forEach((ele, index) => {
  // console.log(idx.id.substring(1, 2))
  const strId = idx.id.charAt(0) === "0" ? idx.id.substring(1, 2) : idx.id;
  if (idx.active && (strId === "0" || strId === "6")) {
    bgCor = "#fff";
  } else if (idx.active && (strId !== "0" || strId !== "6")) {
    bgCor = strId < 6 ? "red" : "#3357C4";
  }
  // });
  return bgCor;
  // if (idx.id == '01' || idx.id == '07') return "rgb(250,250,245)"
  // return parseInt(idx.id) > 6 ? "#3357C4" : "red"
};
</script>
<style scoped lang="scss">
body {
  height: auto;
  width: auto;
  background-color: rgb(213, 213, 213);
}

.el-container {
  width: 100%;
  height: 95%;
  margin: 0 auto;
  margin-top: 50px;

  .el-aside {
    width: 960px;
  }

  .el-main {
    display: flex;
    width: 100%;
    height: 405px;
    margin: 2px;

    :deep(.el-col .monitor) {
      width: 400px;
      height: 300px;
      background-color: aqua;
    }
  }

  .xxx-a {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 920px;
    height: 306px;
    // flex-direction: column;
    flex-wrap: wrap;
    background-color: #f6f6f6;

    .el-col {
      margin-left: 3px;
      display: flex;
      width: 100px;
      height: 32px;
      // margin-bottom: 3px;
      flex-direction: row;
      align-items: center;
      align-content: center;

      :deep(.config-b) {
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 50%;
        background-color: #dddddd;
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
