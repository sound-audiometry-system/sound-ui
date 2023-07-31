<template>
  <div class="main">
    <div>
      <span>测试名称</span>
      <span class="ml-10" style="display: inline-block;width: 82%;background: #ececec;border: 1px solid #b5b5b5;border-radius: 3px;">{{ props.testData.name }}</span>
      <el-button type="success" @click="handleSave" class="ml-10">保存</el-button>
      <el-button @click="handleBack" class="ml-10">退出</el-button>
      
    </div>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col style="eight: 760px; background-color: #fff; padding: 10px 0; overflow: auto;" :span="12">
        <div v-for="(item, index) in devices" :key="index" :gutter="10" style=" height: 90px; border-bottom: 1px solid #d6d6d6;padding: 10px 0px;">
          <el-row style="align-items: center">
            <el-col :span="6">
              <span>{{ index + 1 }}</span>.
              <span
                class="ml-10" style="display: inline-block;border-radius: 50%;margin-right: 6px;width: 22px;height: 22px;background: #b0b912;color: #fff;text-align: center;line-height: 22px;">{{ item.index }}</span>
              <span>{{ item.index }}号音响</span>
            </el-col>
            <el-col :span="3">
              <el-radio-group
                disabled
                v-model="queryForm.signalSoundVolume"
                class="ml-4"
              >
                <el-radio label="1" size="large">言语声</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="2">
              <el-input style="width: 100%" controls-position="right" size="small" v-model="queryForm.signalSoundVolume" placeholder="52"/></el-col>
            <el-col :span="4">(分贝db)</el-col>
            <el-col :span="3">
              <el-radio-group disabled v-model="queryForm.environmentalSoundVolume" class="ml-4">
                <el-radio label="1" size="large">环境声</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="2"
              ><el-input
                style="width: 100%"
                controls-position="right"
                size="small"
                v-model="queryForm.environmentalSoundVolume"
                placeholder="52"
            /></el-col>
            <el-col :span="4">(分贝db)</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-button
                  style="margin-left: 10px"
                  size="small"
                  type="primary"
                  plain
                  @click="handleCalibration(item, index)"
                  >{{ item.isCalibration ? "结束校准" : "点击校准" }}</el-button
                >
              </div>
            </el-col>
            <el-col
              v-if="!item?.signalCalibrated"
              :span="9"
              style="color: #989898"
            >
              未校准
            </el-col>
            <el-col
              v-if="!item?.signalCalibrated"
              :span="8"
              style="color: #989898"
            >
              未校准
            </el-col>
            <el-col
              v-if="item?.signalCalibrated"
              :span="8"
              style="color: #078f44"
            >
              已校准
            </el-col>
            <el-col
              v-if="item?.signalCalibrated"
              :span="8"
              style="color: #078f44"
            >
              已校准
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <sound :device-config="devices"></sound>
        <div
          style="
            width: 230px;
            margin-top: 40px;
            margin-left: 20px;
            height: 61px;
            display: flex;
            align-items: center;
            background: #d8d8d8;
            justify-content: space-around;
          "
        >
          <el-button size="large" @click="handleStart">播放</el-button>
          <el-button size="large" @click="handleStart">重复</el-button>
        </div>
        <el-row class="el-row-box" style="display: flex; margin-top: 180px; align-items: center">
          <el-col style="font-size: 14px; color: #3a3a3a" :span="3">信号声</el-col>
          <el-col :span="4">
            <el-input-number
              :disabled="!isCalibration"
              style="width: 100%"
              controls-position="right"
              size="small"
              v-model="queryForm.signalSoundVolume"
              placeholder="52"
              :max="100"
              :min="0"
              :step="queryForm.step"
          /></el-col>
          <el-col :span="4">（分贝db）</el-col>
          <el-col :span="4"
            ><el-input-number
              :disabled="!isCalibration"
              :min="1"
              :max="10"
              style="width: 100%"
              controls-position="right"
              size="small"
              v-model="queryForm.step"
              placeholder="52"
          /></el-col>
          <el-col style="font-size: 14px; color: #b0b0b0" :span="2"
            >(步幅)</el-col
          >
          <el-col style="font-size: 14px; color: #b0b0b0" :span="4"
            ><el-button :disabled="!isCalibration" @click="handleSaveItem"
              >保存点 [Enter]</el-button
            ></el-col
          >
          <el-col>
            <el-slider
              style="width: 96%"
              v-model="queryForm.signalSoundVolume"
              :min="25"
              :max="80"
              :marks="marks"
              :disabled="!isCalibration"
            />
          </el-col>
        </el-row>
        <el-row class="el-row-box" style="display: flex; margin-top: 60px; align-items: center">
          <el-col style="font-size: 14px; color: #3a3a3a" :span="3"
            >环境声</el-col
          >
          <el-col :span="4"
            ><el-input-number
              :disabled="!isCalibration"
              style="width: 100%"
              controls-position="right"
              size="small"
              v-model="queryForm.environmentalSoundVolume"
              placeholder="52"
              :max="100"
              :min="0"
              :step="queryForm.step1"
          /></el-col>
          <el-col :span="4">（分贝db）</el-col>
          <el-col :span="4"
            ><el-input-number
              :disabled="!isCalibration"
              :min="1"
              :max="10"
              style="width: 100%"
              controls-position="right"
              size="small"
              v-model="queryForm.step1"
              placeholder="52"
          /></el-col>
          <el-col style="font-size: 14px; color: #b0b0b0" :span="2"
            >(步幅)</el-col
          >
          <el-col style="font-size: 14px; color: #b0b0b0" :span="4"
            ><el-button :disabled="!isCalibration" @click="handleSaveItem"
              >保存点 [Enter]</el-button
            ></el-col
          >
          <el-col>
            <el-slider
              style="width: 96%"
              v-model="queryForm.environmentalSoundVolume"
              :min="25"
              :max="80"
              :marks="marks"
              :disabled="!isCalibration"
            />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import type { CSSProperties } from "vue";
import { auditionApi, imitateApi } from "@/serve/api/user";
import sound from "../../components/sound/index.vue";
const value1 = ref("1");
let isStart = false;
const queryForm = reactive({
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
const isCalibration = ref(false);
type Props = {
  testData: any;
};
const props = defineProps<Props>();
const devices = ref([
  {
    id1: "001",
    id2: "011",
    isCalibration: false,
  },
  {
    id1: "001",
    id2: "011",
    isCalibration: false,
  },
  {
    id1: "002",
    id2: "012",
    isCalibration: false,
  },
  {
    id1: "003",
    id2: "013",
    isCalibration: false,
  },
  {
    id1: "004",
    id2: "014",
    isCalibration: false,
  },
  {
    id1: "005",
    id2: "015",
    isCalibration: false,
  },
  {
    id1: "006",
    id2: "016",
    isCalibration: false,
  },
  {
    id1: "007",
    id2: "017",
    isCalibration: false,
  },
  {
    id1: "008",
    id2: "018",
    isCalibration: false,
  },
  {
    id1: "009",
    id2: "019",
    isCalibration: false,
  },
  {
    id1: "010",
    id2: "011",
    isCalibration: false,
  },
  {
    id1: "001",
    id2: "011",
    isCalibration: false,
  },
]);
interface Mark {
  style: CSSProperties;
  label: string;
}
let audioIndex = '12';
type Marks = Record<number, Mark | string>;
const marks = reactive<Marks>({
  30: "30",
  35: "35",
  40: "40",
  45: "45",
  50: "50",
  55: "55",
  60: "60",
  65: "65",
  70: "70",
  75: "75",
  80: "80",
});
watch(
  () => props.testData,
  (newValue, oldValue) => {
    devices.value = newValue.indexs;
  },
  { deep: true, immediate: true }
);
const emit = defineEmits(["handleBack"]);
const handleStart = async () => {
  const res = await auditionApi.startTest(props.testData);
  if (res.code == 0) {
    isStart = true;
  }
};
const handleSave = async () => {
  const res = await auditionApi.stopTest();
  console.log(res);
  if (res.code == 0) {
    isStart = false;
  }
};
const reImageTest = async () => {
  const res = await auditionApi.reImageTest();
  if (res.code == 0) {
    isStart = true;
  }
};
const handleBack = () => {
  emit("handleBack", false);
};
const handleSaveItem = async () => {
  if (audioIndex == '12') {
    ElMessage({
      message: "请先选择音响校准",
      type: "warning",
    });
    return;
  }
  const form = {
    id: props.testData.id,
    index: audioIndex,
    signalSoundVolume: queryForm.signalSoundVolume,
    environmentalSoundVolume: queryForm.environmentalSoundVolume,
    signalCalibrated: queryForm.signalCalibrated,
    environmentalCalibrated: queryForm.environmentalCalibrated,
  };
  const res = await imitateApi.saveAdjustValue(form);
  if (res.code == 0) {
    ElMessage({
      message: "保存成功",
      type: "success",
    });
  }
};
const handleCalibration = async (item: any, index: number) => {
  isCalibration.value = !isCalibration.value;
  audioIndex = index+'';
  item.isCalibration = !item.isCalibration;
  const form = {
    id: props.testData.id,
    audios: [
      {
        index: (index + 1)+'',
        signalSoundVolume: queryForm.signalSoundVolume,
        environmentalSoundVolume: queryForm.environmentalSoundVolume,
      },
    ],
  };
  if (!item.isCalibration) {
    const res = await imitateApi.dbCalibration(form.id);
    if (res.code == 0) {
      ElMessage({
        message: "校准值上传成功",
        type: "success",
      });
      audioIndex = '12';
    }
  }
};
onMounted(() => {
  window.addEventListener("setItemEvent", function (e: any) {
    if (!e.newValue) {
      isStart = false;
      // imageData = {}
      ElMessage({
        message: "方案播放完成",
        type: "success",
      });
    }
  });
});
</script>

<style lang="scss" scoped>
.ml-10 {
  margin-left: 10px;
}

.main {
  width: 100%;
  // background-color: #f2f2f2;
  margin: 20px 20px 0px 20px;
}
:deep(.el-slider__marks) {
  width: 98%;
}
</style>
