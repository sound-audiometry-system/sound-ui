<template>
  <div class="main">
    <div>
      <span>测试名称</span>
      <span class="ml-10"
        style="display: inline-block;width: 82%;background: #ececec;border: 1px solid #b5b5b5;border-radius: 3px;">{{
          props.testData.name }}</span>
      <el-button type="success" color="#1F8570" @click="handleCalibration" class="ml-10">保存</el-button>
      <el-button @click="handleBack" class="ml-10">退出</el-button>

    </div>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col style="height: 700px; background-color: #fff; padding: 10px 0; overflow: auto;" :span="12">
        <div v-for="(item, index) in devices" :key="index" :gutter="10"
          style=" height: 90px; border-bottom: 1px solid #d6d6d6;padding: 10px 0px;">
          <el-row style="align-items: center">
            <el-col :span="4">
              <!-- 双色记录 -->
              <span>{{ index + 1 }}</span>
              <span :class="'icon-tag ' + getTagCss(item)">{{ item.index }}</span>
              <span>{{ item.index }}号音响</span>
            </el-col>
            <!-- 言语声 -->
            <el-col :span="10" v-if="item.signalSoundVolume">
              <el-row class="table-row">
                <el-col :span="4">
                  <el-checkbox-group v-model="radioFlag">
                    <el-checkbox :disabled="item.signalCalibrated" :label="item.index" :true-label="item.index"
                      @change="startCalibration(item, 1)" :tabindex="item.index">信号声</el-checkbox>
                  </el-checkbox-group>
                </el-col>
                <el-col :span="2">
                  <el-input readonly style="width: 100%" controls-position="right" size="small"
                    v-model="item.signalSoundVolume" :placeholder="item.signalSoundVolume" /></el-col>
                <el-col :span="5">(分贝db)</el-col>
              </el-row>
              <!-- 按钮 -->
              <el-row>
                <el-col v-if="!item?.signalCalibrated" :span="9">
                  <el-button disabled size="small">未校准</el-button>
                </el-col>
                <el-col v-else :span="8">
                  <el-button type="primary" disabled size="small">已校准</el-button>
                </el-col>
              </el-row>
            </el-col>
            <!-- 环境声音 -->
            <el-col :span="10" v-if="item.environmentalSoundDecibels">
              <el-row class="table-row">
                <el-col :span="4">
                  <el-checkbox-group v-model="radioFlagEnv">
                    <el-checkbox :disabled="item.environmentalCalibrated" :label="item.index" :true-label="item.index"
                      @change="startCalibration(item, 2)" :tabindex="item.index">环境声</el-checkbox>
                  </el-checkbox-group>
                </el-col>
                <el-col :span="2">
                  <el-input readonly style="width: 100%" controls-position="right" size="small"
                    v-model="item.environmentalSoundDecibels" :placeholder="item.environmentalSoundDecibels" />
                </el-col>
                <el-col :span="5">(分贝db)</el-col>
              </el-row>
              <!-- 按钮 -->
              <el-row>
                <el-col v-if="!item?.environmentalCalibrated" :span="9">
                  <el-button disabled size="small">未校准</el-button>
                </el-col>
                <el-col v-else :span="8">
                  <el-button type="primary" disabled size="small">已校准</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <sound :sound-index="0"></sound>
        <div
          style="width: 230px;margin-top: 40px;margin-left: 20px;height: 61px;display: flex;align-items: center;background: #d8d8d8;justify-content: space-around;">
          <el-button size="large" @click="handleStart">播放</el-button>
          <el-button size="large" @click="handleCirculate">循环</el-button>
        </div>
        <!-- 信号声音 -->
        <el-row class="el-row-box" style="display: flex; margin-top: 90px; align-items: center;width: 900px;">
          <el-col style="font-size: 14px; color: #3a3a3a" :span="3">信号声</el-col>
          <el-col :span="4">
            <el-input-number :disabled="!isSignalCalibration" style="width: 100%" controls-position="right" size="small"
              v-model="queryForm.signalSoundVolume" placeholder="52" :max="100" :min="0" :step="queryForm.step" />
          </el-col>
          <el-col :span="4">（音量）</el-col>
          <el-col :span="4">
            <el-input-number :disabled="!isSignalCalibration" :min="1" :max="10" style="width: 100%"
              controls-position="right" size="small" v-model="queryForm.step"
              :placeholder="queryForm.signalSoundVolume" />
          </el-col>
          <el-col style="font-size: 14px; color: #b0b0b0" :span="2">(步幅)</el-col>
          <el-col style="font-size: 14px; color: #b0b0b0" :span="4">
            <el-button :disabled="!isSignalCalibration" @keyup.enter.native="keyupEnter()" @click="handleSaveItem">保存点
              [Enter]</el-button>
          </el-col>
          <el-col>
            <el-slider style="width: 96%" v-model="queryForm.signalSoundVolume" :min="25" :max="80" :marks="marks"
              :disabled="!isSignalCalibration" />
          </el-col>
        </el-row>
        <!-- 环境音 -->
        <el-row class="el-row-box" style="display: flex; margin-top: 60px; align-items: center;width: 900px;">
          <el-col style="font-size: 14px; color: #3a3a3a" :span="3">环境声</el-col>
          <el-col :span="4">
            <el-input-number :disabled="!isCalibration" style="width: 100%" controls-position="right" size="small"
              v-model="queryForm.environmentalSoundVolume" placeholder="52" :max="100" :min="0" :step="queryForm.step1" />
          </el-col>
          <el-col :span="4">（音量）</el-col>
          <el-col :span="4">
            <el-input-number :disabled="!isCalibration" :min="1" :max="10" style="width: 100%" controls-position="right"
              size="small" v-model="queryForm.step1" :placeholder="queryForm.environmentalSoundVolume" />
          </el-col>
          <el-col style="font-size: 14px; color: #b0b0b0" :span="2">(步幅)</el-col>
          <el-col style="font-size: 14px; color: #b0b0b0" :span="4">
            <el-button :disabled="!isCalibration" @click="handleSaveEnv">保存点 [Enter]</el-button>
          </el-col>
          <el-col>
            <el-slider style="width: 96%" v-model="queryForm.environmentalSoundVolume" :min="25" :max="80" :marks="marks"
              :disabled="!isCalibration" />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, toRaw } from "vue";
import type { CSSProperties } from "vue";
import { ElMessage } from 'element-plus'
import { auditionApi, imitateApi } from "@/serve/api/user";
import sound from "../../components/sound/index.vue";

const keyupEnter = () => {
  console.log("enter")
}

const setup = () => {
  //清空答案记录
  testMap.clear()
}
let isStart = false;
//判断css样式
const getTagCss = (item) => {
  if (item.environmentalSoundVolume && item.signalSoundVolume) {
    return "color-3"
  } else if (item.environmentalSoundVolume) {
    return "color-2"
  } else if (item.signalSoundVolume) {
    return "color-1"
  }
}
const radioFlag = ref(-1)
const radioFlagEnv = ref(-1)
//点击校准
const startCalibration = (item, flag) => {
  console.info(item, "勾选校准音频")
  //关闭所有勾选框
  radioFlagEnv.value = -1
  radioFlag.value = -1
  //判断按钮是否关闭
  /** 开启校准组件，缓存数据对象 index */
  isSignalCalibration.value = false
  isCalibration.value = false
  queryForm.index = item.index
  //1 信号声， 2 环境声
  flag == 1 ? startSignal(item) : startEnvironment(item)
  // return true;
}
//信号声处理
let startSignal = (item) => {
  if (radioFlag.value == item.index) {
    ElMessage({ message: "请先关闭校准", type: "warning", });
    return false
  }
  radioFlag.value = item.index
  // 打开信号声调试
  if (!item.signalCalibrated) {
    isSignalCalibration.value = true
    queryForm.signalSoundVolume = item.signalSoundVolume
  }
}
let startEnvironment = (item) => {
  if (radioFlag.value == item.index) {
    ElMessage({ message: "请先关闭校准", type: "warning", });
    return false
  }
  //判断按钮是否开启
  radioFlagEnv.value = item.index
  //打开环境声调试
  if (!item.environmentalCalibrated) {
    isCalibration.value = true
    queryForm.environmentalSoundVolume = item.environmentalSoundVolume
  }
}
interface AlignData extends AlignDataSignal, AlignDataAmbient {
}
//保存点 环境
interface AlignDataAmbient {
  index: Number,//id
  environmentalCalibrated: Boolean,//环境声是否校准
  environmentalSoundVolume: Number,//校准数值
}
//信号声答案
interface AlignDataSignal {
  index: Number,//id
  signalSoundVolume: Number,//校准数值
  signalCalibrated: Boolean,//信号声是否校准
}

/** 
 * 构建map，以id为key
 * 将数据存入map，存入时检查对象字段
 * 保存点将数据存入
 */
const testMap = reactive(new Map());

const queryForm = reactive({
  index: 110,
  fileName: null,
  delay: "1",
  environmentalSoundVolume: 52,
  signalSoundVolume: 52,
  step: 1,
  step1: 1,
  ambient: null,
  type: "1",
  signalCalibrated: false,
  environmentalCalibrated: false,
});
//信号
const isSignalCalibration = ref(false);
const isCalibration = ref(false);
type Props = {
  testData: any;
};
const props = defineProps<Props>();
const devices = ref([]);
interface Mark {
  style: CSSProperties;
  label: string;
}
type Marks = Record<number, Mark | string>;
const marks = reactive<Marks>({ 30: "30", 35: "35", 40: "40", 45: "45", 50: "50", 55: "55", 60: "60", 65: "65", 70: "70", 75: "75", 80: "80", });
watch(
  () => props.testData,
  (newValue, oldValue) => {
    devices.value = newValue.indexs;
  },
  { deep: true, immediate: true }
);
const emit = defineEmits(["handleBack"]);
/**
 * 播放
 * TODO 构建参数
 */
const handleStart = async () => {
  auditionApi.stopTest()
  let item: any = getItem(queryForm.index);
  //构建对象 signalSource
  let param = {
    id: props.testData.id, "enableManualPlayMode": false, signalSource: [{
      audios: [{ "target": queryForm.index, "file": item.signalSource, "volume": queryForm.signalSoundVolume }],
    }]
  }
  console.log(param, "param")
  const res = await auditionApi.startTest(param);
  if (res.code == 0) {
    isStart = true;
  }
};
/**
 * 根据index后去对象信息，index为数组中对象index字段
 * @param index 对象索引，根据索引获取对象
 */
const getItem = (index) => {
  if (index && index == 110) return
  return devices.value.filter(x => x.index == index)[0]
}
/**
 * 循环播放
 * TODO 构建参数
 */
const handleCirculate = async () => {
  auditionApi.stopTest()
  //获取测试对象信息
  let item: any = getItem(queryForm.index);
  if (!item) return
  //构建参数
  let param = {
    id: props.testData.id,name: props.testData.name, "enableManualPlayMode": true, envSoundConfig: [
      { "target": queryForm.index, "file": item.environmentalSource, "volume": queryForm.environmentalSoundVolume ,duration:3000},
    ]
  }
  //调用接口
  const res = await auditionApi.startTest(param);
  if (res.code == 0) {
    isStart = true;
  }
};

const handleBack = () => {
  emit("handleBack", false);
};
/**
 * 保存环境声校准值
 */
const handleSaveEnv = () => {
  if (queryForm.index === 110) {
    ElMessage({ message: "请先选择音响校准", type: "warning", });
    return
  }
  const answer = ref<AlignDataAmbient>()
  answer.value = { index: queryForm.index, environmentalSoundVolume: queryForm.environmentalSoundVolume, environmentalCalibrated: true }
  // 答案写入集合
  setData(queryForm.index, answer.value)
  isCalibration.value = false
  // TODO
  let item = devices.value.filter(x => x.index == queryForm.index);
  devices.value.forEach((x, index) => {
    if (x.index == queryForm.index) {
      x.environmentalCalibrated = true
    }
  })
  // queryForm.environmentalCalibrated = true
}
/**
 * 保存信号声校准值
 */
const handleSaveItem = async () => {
  if (queryForm.index === 110) {
    ElMessage({ message: "请先选择音响校准", type: "warning", });
    return
  }
  //保存时已经校准完成，关闭正在播放音频
  await auditionApi.stopTest();
  const answer = ref<AlignDataSignal>()
  answer.value = { index: queryForm.index, signalSoundVolume: queryForm.signalSoundVolume, signalCalibrated: true }
  // 答案写入集合
  setData(queryForm.index, answer.value)
  // 已保存校准，禁用校准控件
  isSignalCalibration.value = false
  // 改变数据样式
  queryForm.environmentalCalibrated = true
  //循环数据，修改控制样式
  devices.value.forEach((x) => {
    if (x.index == queryForm.index) {
      x.signalCalibrated = true
    }
  })
};
//添加答案，如果存在则合并更新，不存在则直接存入
const setData = (key, value) => {
  if (testMap.has(key)) {
    // 检查map中是否存在该id，存在则合并字段更新
    let newData = reactive<AlignData>({ ...testMap.get(key), ...value })
    testMap.set(key, newData)
  } else {
    //不存在，直接存入
    testMap.set(key, value)
  }
}
/**
 * 保存阈值校准方案
 */
const handleCalibration = async (item: any, index: number) => {
  // 根据devices数据，判断是否全部校准
  let evnArr = devices.value.map(x => x.environmentalCalibrated).filter(x => x != undefined)
  let sinArr = devices.value.map(x => x.signalCalibrated).filter(x => x != undefined)
  // evn sin任一为false则给提示
  let evn = evnArr.every(x => x == true)
  let sin = sinArr.every(x => x == true)
  if (!(evn && sin)) {
    ElMessage({ message: "方案未全部校准完成,请检查", type: "warning", });
    return
  }
  isCalibration.value = false;
  item.isCalibration = isCalibration;
  const form = {
    id: props.testData.id,
    indexs: [...Array.from(testMap.values())],
  };
  const res = await imitateApi.dbCalibration(form);
  if (res.code == 0) {
    ElMessage({ message: "校准值上传成功", type: "success", });
  }
};
onMounted(() => {
  window.addEventListener("setItemEvent", function (e: any) {
    if (!e.newValue) {
      isStart = false;
      // imageData = {}
      ElMessage({ message: "方案播放完成", type: "success", });
    }
  });
  window.addEventListener("keyup", (e: any) => {
    if (13 == e.keyCode) {
      if (radioFlagEnv.value != -1) {
        handleSaveEnv()
      }
      if (radioFlag.value != -1) {
        handleSaveItem()
      }
    }
  })
});

</script>

<style lang="scss" scoped>
.table-row {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  .el-col {
    margin-left: 10px;
  }

}

.ml-10 {
  margin-left: 10px;
}

//图标样式
.icon-tag {
  margin-left: 10px;
  display: inline-block;
  border-radius: 50%;
  margin-right: 6px;
  width: 22px;
  height: 22px;
  color: #fff;
  text-align: center;
  line-height: 22px;
}

.color-1 {
  background: #B2BA0D;
}

.color-2 {
  background: #FFBF24;
}

.color-3 {
  background: linear-gradient(to right, #B2BA0D 50%, #FFBF24 50%);
}

.main {
  width: 1920px;
  // background-color: #f2f2f2;
  margin: 20px 20px 0px 20px;
}

:deep(.el-slider__marks) {
  width: 98%;
}
</style>
