<template>
  <el-form-item label="测试名称">
    <el-input disabled v-model="testName" />
  </el-form-item>
  <el-container>
    <el-aside>
      <div class="es-switch">
        <span
          ><el-switch v-model="value1" />
          <label style="font-size: 16px">左显示器</label></span
        >
        <span
          ><el-switch v-model="value2" class="ml-2" /><label>右显示器</label>
        </span>
      </div>
      <div
        style="
          margin-left: 10px;
          width: 420px;
          height: 240px;
          padding: 0 6px;
          display: flex;
        "
      >
        <el-row style="background-color: #000;width: 82%;height: 100%;align-items: center;overflow: auto;" align="center" :gutter="10">
          <el-col
            v-for="(item, index) in props.imageData.answerList"
            :key="item.id"
            :span="8"
          >
            <el-image
              @click="checkedImg(index)"
              style="width: 100%; height: 160px"
              :src="item.sourceUrl"
              :fit="item.label"
            />
          </el-col>
        </el-row>
        <div style="width: 18%;margin-left: 10px;">
          <p>测试总数</p>
          <div class="test-total-box">{{ answerMarks ? answerMarks.length  : 0 }}</div>
          <div style="margin-top: 10px;"><el-switch v-model="value3" @change="beforeChange1" /></div>
          <p style="font-size: 12px;">同时打开两边显示器</p>
        </div>
      </div>

      <el-row class="error-a">
        <label style="margin-left: 5px; font-size: large">错误走向</label>
        <el-button size="small" style="margin-right: 5px"
          ><el-icon style="color: red; margin-right: 2px">
            <CircleClose /> </el-icon
          >错误</el-button
        >
        <!-- <el-icon><CircleCloseFilled /></el-icon>   :icon="CircleClose"-->
      </el-row>
      <el-row
        :gutter="10"
        style="
          margin-left: 10px;
          width: 400px;
          height: 200px;
          background-color: #8cdcfe;
          padding-top: 6px;
          overflow: auto;
        "
      >
        <el-col
          v-for="(item, index) in props.imageData.answerList"
          :key="item.id"
          :span="8"
        >
          <el-image
            :class="{
              'is-checked-img-error':
                item.isCheckFlag && index + 1 != props.imageData.target,
              'is-checked-img-success':
                item.isCheckFlag && index + 1 == props.imageData.target,
            }"
            style="width: 100%; height: 160px"
            :src="item.sourceUrl"
            :fit="item.label"
          />
          <div style="text-align: center">
            <el-icon
              v-if="item.isCheckFlag && index + 1 != props.imageData.target"
              style="color: red; font-size: 26px; margin: 0 auto"
              ><CircleClose
            /></el-icon>
            <el-icon
              v-if="item.isCheckFlag && index + 1 == props.imageData.target"
              style="color: green; font-size: 26px"
              ><CircleCheck
            /></el-icon>
          </div>
        </el-col>
      </el-row>
    </el-aside>

    <el-main>
      <el-button @click="handleAudio" style="margin: 3px 0px 5px 0px" link
        ><el-icon style="margin-right: 2px;color: #134EFE;" circle><Microphone /></el-icon
        >{{ isOpen ? "关闭录音" : "开启录音" }}</el-button
      >
      <div style="height: 280px; width: 465px">
        <sound @handleClkItem="handleClkItem" :sound-index="soundIndex" ></sound>
      </div>
      <el-row class="el-btn a">
        <el-button :disabled="props.isPlay" size="small" @click="handleStart">开始</el-button>
        <el-button size="small" @click="handleSave">保存</el-button>
        <el-button size="small" @click="handleSave">保存并生成记录</el-button>
        <el-button size="small" @click="handleSave">提前结束</el-button>
        <el-button size="small">测试文件</el-button>
      </el-row>
      <el-row class="el-btn b">
        <el-button @click="handlePrev" size="small">上一个</el-button
        ><el-button @click="handleNext" size="small">下一个</el-button
        ><el-button @click="handleReImage" size="small">重复</el-button>
      </el-row>
      <el-row>
        <div
          style="
            height: 110px;
            width: 465px;
            background-color: #e9e9e9;
            padding: 12px 20px;
          "
        >
          <div
            style="
              display: flex;
              justify-content: space-between;
              margin-bottom: 16px;
              align-items: center;
            "
          >
            <span style="font-weight: bold">答题进度</span
            ><span style="font-size: 12px" @click="handleClk"
              >查看全部<el-icon><CaretRight /></el-icon
            ></span>
          </div>
          <div style="height: 24px; overflow: hidden">
            <span
              v-for="(item, index) in answerMarks"
              :key="index"
              :class="{
                'answer-num': true,
                'success-active': item.answerMark == 2,
                'error-active': item.answerMark == 3,
              }"
              >{{ index + 1 }}</span
            >
          </div>
        </div>
      </el-row>
    </el-main>
    <answer-dialog ref="answerDialogRef" :answerMarks="answerMarks"></answer-dialog>
    <sound-dialog ref="soundDialogRef"></sound-dialog>
  </el-container>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { Edit, CircleClose, CircleCheck } from "@element-plus/icons-vue";
import answerDialog from "./components/answerDialog.vue";
import soundDialog from "./components/soundDialog.vue";
import sound from "../../components/sound/index.vue";
import { auditionApi } from "@/serve/api/user";
import { useStore, mapState } from "vuex";
let store = useStore();
const testData = store.getters.getTestData;
let testName = ref(testData[0].name);
const answerDialogRef = ref(null) as any;
const soundDialogRef = ref(null) as any;
let value1 = ref(true);
let value2 = ref(true);
let value3 = ref(true);
let isOpen = ref(false)
let soundIndex = ref(0)
console.log(testData, 'testData')
// console.log(testData.commands, 'testData')
const answerMarks = ref(testData[0].commands.map(item=> {
  return {
    answerMark: 1
  }
}))
// answerDialogRef.value.show([])
let beforeChange1 = () => {
  value1.value = value3.value
  value2.value = value3.value
};
type Props = {
  imageData: any;
  answerIndex: any;
  isPlay: any
};
const emit = defineEmits([
  "handleStart",
  "handleStop",
  "handleAudio",
  "handleStopAudio",
  "handleSave"
]);
const props = defineProps<Props>();
let answerIndex = props.answerIndex
const isCheckFlag = ref(false);
watch(()=>props.imageData, (newValue,oldValue)=> {
  answerIndex ++
  isCheckFlag.value = false;
  // console.log(222222222)
},{ deep: true })
const handleClk = () => {
  // console.log(answerDialogRef.value);
  answerDialogRef.value.show([]);
};
const handleClkItem = (index) => {
  soundDialogRef.value.show(index);
};
const handleStart = () => {
  emit("handleStart", value1.value, value2.value);
};
const handleStop = () => {
  for (const item of answerMarks.value) {
    item.answerMark = 1
  }
  emit("handleStop");
};
const handleSave = ()=> {
  emit("handleSave");
}
const handleAudio = () => {
  isOpen.value = !isOpen.value;
  emit(isOpen.value ? "handleAudio" : "handleStopAudio");
};
const handleStopAudio = () => {
  emit("handleStopAudio");
};
// 上一个
const handlePrev = async () => {
  const res = await auditionApi.prevTest();
  if (res.code == 0) {
    isCheckFlag.value = false;
    answerIndex--
  }
};
// 下一个
const handleNext = async () => {
  const res = await auditionApi.nextTest();
  if (res.code == 0) {
    isCheckFlag.value = false;
    answerIndex++
  }
};
// 重复
const handleReImage = async () => {
  const res = await auditionApi.reImageTest();
  if (res.code == 0) {
    isCheckFlag.value = false;
  }
};
const checkedImg = (index) => {
  // console.log(props.imageData.answerList[index].isCheckFlag)
  // console.log(isCheckFlag.value)
  if (isCheckFlag.value) return
  isCheckFlag.value = true;
  props.imageData.answerList[index].isCheckFlag = true;
  index + 1 == props.imageData.target ? answerMarks.value[answerIndex].answerMark = 2 : answerMarks.value[answerIndex].answerMark = 3
  // console.log(answerMarks.value[answerIndex].answerMark, 'answerMarks[answerIndex].answerMark')
  // if (index + 1 != props.imageData.target) {
  //   // isCheckFlag.value = true
  //   // props.imageData.answerList[index].isCheckFlag = false
  // }
};
onMounted(()=> {
  window.addEventListener("setItemEvent", function (e: any) {
    if (!e.newValue) {
        return
    }
    if (e.key === "imageData") {
      answerMarks.value[answerIndex].answerMark = 2
    }
    // 1111
    if (e.key === "audiostart") {
      
    }
  });
})
</script>

<style lang="scss" scoped>
.error-a {
  margin-left: 10px;
  width: 400px;
  height: 45px;
  background-color: #e0e0e0;
  margin-top: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-btn {
  margin-top: 5px;
  display: flex;
  width: 465px;
  align-items: center;
}

.a {
  height: 48px;
  background-color: #e9e9e9;
  justify-content: space-around;
}

.b {
  height: 60px;
  justify-content: flex-start;
}

.el-form-item {
  margin-top: 3px;
  margin-bottom: 3px;
}

.el-container {
  height: 580px;
  margin: 0 auto;
  margin-top: 50px;
  .el-aside {
    width: 500px;
  }
  .el-main {
    padding: 0px;
  }
}

.es-switch {
  display: flex;
  justify-content: space-between;
  width: 320px;
  margin-left: 10px;
}

.el-aside {
  padding: 3px 5px;
  display: inline-block;
}
.answer-num {
  display: inline-block;
  width: 24px;
  line-height: 24px;
  border-radius: 50%;
  text-align: center;
  background-color: #dadada;
  color: #9f9f9f;
  margin-right: 8px;
}
.success-active {
  background-color: #c9d681;
  color: #000;
}
.error-active {
  background-color: #d63639;
  color: #fff;
}
.is-checked-img-error {
  border: 1px solid red;
}
.is-checked-img-success {
  border: 1px solid green;
}
.test-total-box {
  width: 84px;
height: 30px;
line-height: 30px;
background: #EDEDED;
border: 1px solid #CBCBCB;
border-radius: 3px;
text-align: center;
margin-top: 6px;
}
</style>
