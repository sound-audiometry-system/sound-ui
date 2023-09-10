<template>
  <el-form-item label="测试名称">
    <el-input style="width: 1680px" disabled v-model="testName" />
    <el-button
      style="float: left; margin-left: 5px"
      type="primary"
      @click="handleBack"
      >返回</el-button
    >
  </el-form-item>
  <el-container>
    <el-aside>
      <div class="es-switch">
        <span><el-switch v-model="value1" /> <label>左显示器</label></span>
        <span
          ><el-switch v-model="value2" class="ml-2" /><label>右显示器</label>
        </span>
      </div>
      <div
        style="
          margin-left: 10px;
          width: 920px;
          height: 335px;
          padding: 0 6px;
          display: flex;
        "
      >
        <el-row
          style="
            background-color: #000;
            width: 82%;
            height: 100%;
            align-items: center;
            overflow: auto;
          "
          align="center"
          :gutter="10"
        >
          <el-col
            v-for="(item, index) in props.imageData.answerList"
            :key="item.id"
            :span="8"
          >
            <!-- @click="checkedImg(index)" -->
            <el-image
              style="width: 100%; height: 160px"
              :src="item.sourceUrl"
              :fit="item.label"
            />
          </el-col>
        </el-row>
        <div style="width: 18%; margin-left: 10px">
          <p>测试总数</p>
          <div class="test-total-box">
            {{ answerMarks ? answerMarks.length : 0 }}
          </div>
          <div style="margin-top: 10px">
            <el-switch v-model="value3" @change="beforeChange1" />
          </div>
          <p style="font-size: 12px">同时打开两边显示器</p>
          <p v-if="prevRouter !== '/imitate'" style="font-size: 14px">
            当前正在答
            {{ answerIndex && answerIndex <= 0 ? "" : answerIndex + 1 }} 题
          </p>
        </div>
      </div>

      <el-row class="error-a">
        <label style="margin-left: 5px; font-size: large">错误走向</label>
        <el-button
          @click="handleCheck"
          :disabled="syncDisabledBtn"
          size="large"
          style="margin-right: 5px"
        >
          <el-icon style="color: red; margin-right: 2px">
            <CircleClose /> </el-icon
          >错误</el-button
        >
        <!-- <el-icon><CircleCloseFilled /></el-icon>   :icon="CircleClose"-->
      </el-row>
      <el-row
        :gutter="10"
        style="
          margin-left: 10px;
          width: 920px;
          height: 305px;
          background-color: #efefef;
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
            @click="checkedImg(item, index)"
            :class="{
              'is-checked-img-error':
                index === checkedImgIndex &&
                index + 1 != props.imageData.target,
              'is-checked-img-success':
                index === checkedImgIndex &&
                index + 1 == props.imageData.target,
            }"
            style="width: 100%; height: 160px"
            :src="item.sourceUrl"
            :fit="item.label"
          />
          <div style="text-align: center">
            <el-icon
              v-if="
                index === checkedImgIndex && index + 1 != props.imageData.target
              "
              style="color: red; font-size: 26px; margin: 0 auto"
            >
              <CircleClose />
            </el-icon>
            <el-icon
              v-if="
                index === checkedImgIndex && index + 1 == props.imageData.target
              "
              style="color: green; font-size: 26px"
            >
              <CircleCheck />
            </el-icon>
          </div>
        </el-col>
      </el-row>
    </el-aside>

    <el-main>
      <el-button @click="handleAudio" style="margin: 3px 0px 5px 0px" link
        ><el-icon style="margin-right: 2px; color: #134efe" circle>
          <Microphone /> </el-icon
        >{{ isOpen ? "关闭录音" : "开启录音" }}</el-button
      >
      <div style="height: 320px; width: 760px">
        <sound
          @handleClkItem="handleClkItem"
          :sound-index="soundIndex"
          :bg-index="bgIndex"
          env-index="122"
        ></sound>
      </div>
      <el-row class="el-btn a">
        <el-button
          :disabled="props.isPlay || isStop"
          size="large"
          plain
          @click="handleStart"
          >开始</el-button
        >
        <el-button
          v-if="prevRouter !== '/imitate'"
          :disabled="answerIndex + 1 !== answerMarks.length && !isStop && enableManualplavMode || !enableManualplavMode && enableManualplavModePlay"
          size="large"
          plain
          @click="handleSave(1)"
          >保存</el-button
        >
        <el-button
          v-if="prevRouter !== '/imitate'"
          :disabled="!props.isPlay"
          size="large"
          plain
          @click="handleSave(2)"
          >提前结束</el-button
        >
        <el-button
          v-if="prevRouter === '/imitate'"
          :disabled="!props.isPlay"
          size="large"
          plain
          @click="handleStop"
          >模拟结束</el-button
        >
      </el-row>
      <el-row class="el-btn b">
        <el-button
          :disabled="
            !props.isPlay ||
            isDisabled ||
            enableManualplavMode ||
            answerIndex <= 0
          "
          @click="handlePrev"
          >上一个(左键)</el-button
        >
        <el-button
          :disabled="
            !props.isPlay ||
            isDisabled ||
            enableManualplavMode ||
            answerIndex + 1 === answerMarks.length
          "
          @click="handleNext"
          >下一个(右键)</el-button
        >
        <el-button
          :disabled="
            !props.isPlay ||
            isDisabled ||
            enableManualplavMode ||
            answerIndex < 0
          "
          @click="handleReImage"
          >重复</el-button
        >
        <el-button
          v-if="prevRouter !== '/imitate' && !enableManualplavMode"
          :disabled="
            !props.isPlay
            &&answerIndex + 1 !== answerMarks.length
          "
          @click="handleStop"
          >测试结束</el-button
        >
      </el-row>
      <el-row>
        <div
          style="
            height: 300px;
            width: 950px;
            background-color: #e9e9e9;
            margin-top: 15px;
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
            <span style="font-weight: bold">答题进度</span>
            <span style="font-size: 12px" @click="handleClk">
              查看全部<el-icon>
                <CaretRight />
              </el-icon>
            </span>
          </div>
          <div style="height: 36px; overflow: hidden">
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
    <answer-dialog
      ref="answerDialogRef"
      :answerMarks="answerMarks"
    ></answer-dialog>
    <sound-dialog ref="soundDialogRef"></sound-dialog>
  </el-container>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { CircleClose, CircleCheck } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
import answerDialog from "./components/answerDialog.vue";
import soundDialog from "./components/soundDialog.vue";
import sound from "../../components/sound/index.vue";
import { auditionApi } from "@/serve/api/user";
import { useStore } from "vuex";
import { useThrottle } from "../../utils/index";
let store = useStore();
const route = useRoute();
const testData = store.getters.getTestData;
let testName = ref(testData[0].name);
const prevRouter = router.options.history.state.back;
const answerDialogRef = ref(null) as any;
const soundDialogRef = ref(null) as any;
let value1 = ref(true);
let value2 = ref(true);
let value3 = ref(true);
let isOpen = ref(false);
const checkedImgIndex = ref(-1);
let isDisabled = ref(false);
let enableManualplavModePlay = true
let answerCheckIndex = -1;
let enableManualplavMode = ref(!testData[0].enableManualPlayMode);
let sycnDisabledBtn = ref(false);
//TODO
const soundIndex = ref(30);
const bgIndex = ref(-2);
let syncDisabledBtn = ref(false);
let source = "";
let answerForm = {};
const answerMarks = ref(
  testData[0].signalSoundConfig.map((item) => {
    return {
      answerMark: 1,
    };
  })
);
// answerDialogRef.value.show([])
let beforeChange1 = () => {
  value1.value = value3.value;
  value2.value = value3.value;
};
type Props = {
  imageData: any;
  isSave: any;
  isPlay: any;
  fileUrl: any;
};
const emit = defineEmits([
  "handleStart",
  "handleStop",
  "handleAudio",
  "handleStopAudio",
  "handleSave",
  "handlePause",
  "handleResume",
]);
const props = defineProps<Props>();
let answerIndex = ref(-1);
const isCheckFlag = ref(false);
const isStop = ref(false);
let answerMap: any = new Map();
const itemId = ref("");
let displayId = 0;
let prevId = -1;
let rePlayId = -1;
let uuid = ""
watch(
  () => props.imageData,
  (newValue, oldValue) => {}
);
const handleClk = () => {
  sycnDisabledBtn.value = true;
  // console.log(answerDialogRef.value);
  answerDialogRef.value.show([]);
};
const handleClkItem = (index) => {
  soundDialogRef.value.show(index);
};
const handleStart = () => {
  answerMap = new Map();
  isStop.value = false;
  emit("handleStart", value1.value, value2.value);
};
const handleBack = () => {
  enableManualplavModePlay = false
  emit("handleStop");
  router.back();
};
const handleStop = () => {
  // for (const item of answerMarks.value) {
  //   item.answerMark = 1;
  // }
  emit("handleStop");
};
const handleSave = (type: number) => {
  emit("handleSave", type, Array.from(answerMap.values()));
};
const handleAudio = async (key) => {
  console.log(isOpen.value)
  if (isOpen.value && key === "recordStart") return;
  if (!isOpen.value && key === "recordStop") return;
  isOpen.value = !isOpen.value;
  await emit(isOpen.value ? "handleAudio" : "handleStopAudio");
};
const handleStopAudio = () => {
  emit("handleStopAudio");
};
const handleCheck = () => {
  // console.log(props.imageData.answerList)
  if (props.imageData.answerList && props.imageData.answerList.length <= 1 || !props.imageData.answerList) {
    const item = props.imageData.answerList ? props.imageData.answerList[0] : null;
    const imageuuid = item?item.uuid : uuid
    answerMap.set(imageuuid, {
        file: itemId.value,
        correct: false,
        wrongFile: item?.image,
      });
    if (item) {
      checkedImg(item, 0);
    } else {
      answerMarks.value[answerIndex.value].answerMark = 3
    }

    // answerMarks.value[answerIndex.value].answerMark = 3
    return;
  }
  answerCheckIndex = answerIndex.value;
  isCheckFlag.value = true;
  syncDisabledBtn.value = true;
  emit("handlePause");
  window.setTimeout(() => {
    emit("handleResume");
  }, 3000);
};

const removeItem = () => {
  //通过index找到答题数据，取出file字段，在answerMap（答案列表）中找到对应的答案，将其删除
  let planList = testData[0].signalSoundConfig;
  //取出方案数据
  let audio = planList[answerIndex.value].audios[0];
  let file = audio.file;
  answerMap.forEach((value, key) => {
    if (value.file == file) {
      answerMap.delete(key);
    }
  });
};
// 上一个
const handlePrev = async () => {
  //删除答案
  removeItem();
  isDisabled.value = true;

  const res = await auditionApi.prevTest();
  if (res.code == 0) {
    prevId = displayId;
    isCheckFlag.value = false;
    //因为 imageDate 会+1，所以这里需要重新赋值 -2
    // if (answerIndex.value > 0) answerIndex.value -= 1;
  }
};
// 下一个
const handleNext = async () => {
  isDisabled.value = true;
  const res = await auditionApi.nextTest();
  if (res.code == 0) {
    // isCheckFlag.value = false;
    // answerIndex.value++;
  }
};
// 重复
const handleReImage = useThrottle(
  async () => {
    //删除答案
    removeItem();
    const res = await auditionApi.reImageTest();
    if (res.code == 0) {
      isCheckFlag.value = false;
      rePlayId = displayId;
      //因为 imageDate 会被修改，所以这里需要重新赋值 -1
      // if (answerIndex.value > 0) answerIndex.value--;
    }
  },
  1500,
  isDisabled
);
const handkeyCode = (e) => {
  if (e.keyCode === 32) {
    handleCheck();
  }
};
const checkedImg = (item, index) => {
  if (!isCheckFlag.value) return;
  sycnDisabledBtn.value = false;
  checkedImgIndex.value = index;
  props.imageData.answerList[index].isCheckFlag = true;
  //构建错误答案
  answerMap.set(item.uuid, {
    file: itemId.value,
    correct: false,
    wrongFile: item.image,
  });

  index + 1 == props.imageData.target
    ? (answerMarks.value[answerIndex.value].answerMark = 2)
    : (answerMarks.value[answerIndex.value].answerMark = 3);
  // isCheckFlag.value = false;
  emit("handleResume");
};
onMounted(() => {
  window.addEventListener("keydown", handkeyCode, true); //开启监听键盘按下事件
  window.addEventListener("setItemEvent", function (e: any) {
    console.log("setItemEvent", e.newValue);
    if (!e.newValue) {
      answerIndex.value = -1;
      //TODO
      isStop.value = true;
      return;
    }
    let item = JSON.parse(e.newValue);
    if (item.id == -1) {
      //播放背景声
      bgIndex.value = item.target;
      return;
    }
    if (e.key === "recordStart" || e.key === "recordStop") {
      handleAudio(e.key);
    }
    if (e.key === "imageData") {
    }
    // 1111
    if (e.key === "audioStart") {
      answerIndex.value = item.id;
      syncDisabledBtn.value = false;
      // isCheckFlag.value = false;
      //TODO newValue 数据结构问题
      uuid = item.uuid
      displayId = item.id;
      itemId.value = item.file;
      soundIndex.value = item.target;
      answerForm.file = item.file; //题目id
      answerForm.correct = true; //默认正确
      if (enableManualplavMode) {
        isDisabled.value = true;
      }
      if (answerCheckIndex !== answerIndex.value) {
        checkedImgIndex.value = -1;
        isCheckFlag.value = false;
      }
      //添加到答案集map中
      answerMap.set(item.uuid, answerForm);
      source = item.source;
    }
    if (e.key === "audioStop") {
      // window.setTimeout(()=> {
      //   if (rePlayId != item.id && prevId != displayId) {
      //   answerIndex.value += 1;
      // }

      // }, 500)

      if (
        answerMarks.value[answerIndex.value] &&
        answerMarks.value[answerIndex.value].answerMark !== 3
      ) {
        answerMarks.value[answerIndex.value].answerMark = 2;
      }
      answerForm = {};

      if (enableManualplavMode) {
        isDisabled.value = false;
      }
    }
  });
});
</script>

<style lang="scss" scoped>
.error-a {
  margin-left: 10px;
  width: 920px;
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
  height: 840px;
  margin: 0 auto;
  margin-top: 50px;

  .el-aside {
    width: 960px;
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
  background: #ededed;
  border: 1px solid #cbcbcb;
  border-radius: 3px;
  text-align: center;
  margin-top: 6px;
}
</style>
