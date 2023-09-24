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
          :disabled="syncDisabledBtn || !props.isPlay"
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
                !item.correct,
              'is-checked-img-success':
                index === checkedImgIndex &&
                item.correct,
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
          :disabled="
            (props.isPlay && prevRouter === '/imitate') ||
            (props.isPlay && prevRouter !== '/imitate' && isStop)
          "
          size="large"
          plain
          @click="handleStart"
          >开始</el-button
        >
        <el-button
          v-if="prevRouter !== '/imitate'"
          :disabled="
            (answerIndex + 1 !== answerMarks.length &&
              !isStop &&
              enableManualplavMode) ||
            (!enableManualplavMode && !isTestStop)
          "
          size="large"
          plain
          @click="handleSave(1)"
          >保存</el-button
        >
        <el-button
          v-if="prevRouter !== '/imitate'"
          :disabled="!props.isPlay || answerIndex + 1 === answerMarks.length"
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
          :disabled="!props.isPlay && enableManualplavModePlay"
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
    <div
      :class="{ 'sound-fixed-box': true, move }"
    >
      <p style="margin-bottom: 10px; font-size: 16px">音频播放列表</p>
      <soundList :sounds="sounds" :bg-index="bgIndex" />
      <div
        style="
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          position: absolute;
          top: 6px;
          right: -16px;
          background-color: #fff;
          border-radius: 50%;
        "
        @mouseenter="move = !move"
      >
        <img v-if="!move" src="../../assets/right.png" width="26" /><img
          v-else
          src="../../assets/left.png"
          width="22"
        />
      </div>
    </div>
  </el-container>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { CircleClose, CircleCheck } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
import answerDialog from "./components/answerDialog.vue";
import soundDialog from "./components/soundDialog.vue";
import sound from "../../components/sound/index.vue";
import soundList from "./components/soundList.vue";
import { auditionApi } from "@/serve/api/user";
import { useStore } from "vuex";
import { useThrottle } from "../../utils/index";
//变量声明区域
let store = useStore();
const route = useRoute();
const testData = store.getters.getTestData;
let testName = ref(testData[0].name);
let move = ref(false);
const prevRouter = router.options.history.state.back;
const answerDialogRef = ref(null) as any;
const soundDialogRef = ref(null) as any;
//是否开启屏幕控制
let value1 = ref(true);
let value2 = ref(true);
let value3 = ref(true);
let isOpen = ref(false);
let isTestStop = false;
const checkedImgIndex = ref(-1);
let isDisabled = ref(false);
let enableManualplavModePlay = true;
let answerCheckIndex = -1;
let enableManualplavMode = ref(!testData[0].enableManualPlayMode);
let sycnDisabledBtn = ref(false);
//音频组件显示控制
const soundIndex = ref([]);
let soundId = -2;
const bgIndex = ref(-2);
let bgName = "";
let bgVolume = "";
//
let audioId = -1;
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
const answerKey = ref([]);
let answerI = -1;
const itemId = ref("");
let displayId = 0;
let prevId = -1;
let rePlayId = -1;
let uuid = "";
let audioFiles = [];
const sounds = ref([]);
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
  if (!enableManualplavMode.value) {
    syncDisabledBtn.value = true;
  }
  emit("handleStart", value1.value, value2.value);
};
const handleBack = () => {
  // isTestStop = true
  // enableManualplavModePlay = false
  emit("handleStop");
  router.back();
};
const handleStop = () => {
  isTestStop = true;

  if (prevRouter === "/imitate") {
    isStop.value = false;
  }
  // for (const item of answerMarks.value) {
  //   item.answerMark = 1;
  // }
  emit("handleStop");
};
const handleSave = (type: number) => {
  // console.error("2xxxxx", answerMap)
  emit("handleSave", type, Array.from(answerMap.values()));
};
const handleAudio = async (key) => {
  if (isOpen.value && key === "recordStart") return;
  if (!isOpen.value && key === "recordStop") return;
  isOpen.value = !isOpen.value;
  await emit(isOpen.value ? "handleAudio" : "handleStopAudio");
};
const handleStopAudio = () => {
  emit("handleStopAudio");
};
const handleCheck = () => {
  // console.log(props.imageData.answerList[0])
  // console.log(!props.isPlay)
  // syncDisabledBtn.value = true;
  if (!props.isPlay || syncDisabledBtn.value) return;
  syncDisabledBtn.value = true;
  if (
    (props.imageData.answerList && props.imageData.answerList.length <= 1) ||
    !props.imageData.answerList
  ) {
    const item =
      props.imageData.answerList && props.imageData.answerList.length === 1
        ? props.imageData.answerList[0]
        : null;
    // if (!item && !itemId.value) return
    // console.info(item,itemId)
    const imageuuid = item ? item?.uuid : uuid;
    answerForm.correct = false;
    if (item && item.image) {
      answerForm.wrongFile = item?.image;
    }
    console.info(itemId.value, answerKey, "handleCheck  up");
    let answerArr =
      answerKey.value.length < 2
        ? itemId.value
        : answerKey.value.filter((x) => x.id == soundId).map((f) => f.file);
    let fileId = Array.isArray(answerArr)
      ? Array.from(new Set(answerArr)).join(",")
      : answerArr;
    let wornObj = {
      file: fileId,
      correct: false,
      wrongFile: item && item?.image,
    };
    // console.info(item, wornObj, "handleCheck  set")
    answerMap.set(imageuuid, wornObj);
    // console.info(itemId.value, answerMap, "handleCheck  off")
    // if (item) {
    //   // checkedImg(item, 0);
    // } else {
    answerMarks.value[answerIndex.value].answerMark = 3;
    // }
    // answerMarks.value[answerIndex.value].answerMark = 3
    return;
  }
  answerCheckIndex = answerIndex.value;
  isCheckFlag.value = true;

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
  if (isDisabled.value) return;
  console.log(answerIndex.value);
  if (answerIndex.value <= 0) return;
  if (
    (!enableManualplavMode.value && !props.isPlay) ||
    enableManualplavMode.value
  )
    return;
  // removeItem();
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
  console.log(enableManualplavMode.value, "enableManualplavMode");
  console.log(props.isPlay, "props.isPlay");
  if (isDisabled.value) return;
  if (answerIndex.value + 1 === answerMarks.value.length) return;
  if (
    (!enableManualplavMode.value && !props.isPlay) ||
    enableManualplavMode.value
  )
    return;
  isDisabled.value = true;
  const res = await auditionApi.nextTest();
  if (res.code == 0) {
    // isCheckFlag.value = false;
    // answerIndex.value++;
    if (!enableManualplavMode.value && syncDisabledBtn.value) {
      syncDisabledBtn.value = false;
    }
  }
};
const handleStartAudio = () => {
  isOpen.value = true;
};
const handleStopTest = () => {
  bgIndex.value = -3;
  bgName = "";
  bgVolume = "";
  soundIndex.value = [];
  sounds.value = [];
};
// 重复
const handleReImage = useThrottle(
  async () => {
    //删除答案
    // removeItem();
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
  if (e.keyCode === 37) {
    // 左键
    handlePrev();
  } else if (e.keyCode === 39) {
    // 右键
    handleNext();
  }
};
const checkedImg = (item, index) => {
  if (!isCheckFlag.value) return;
  sycnDisabledBtn.value = false;
  checkedImgIndex.value = index;
  props.imageData.answerList[index].isCheckFlag = true;
  answerForm.correct = item.correct;
  answerForm.wrongFile = item?.image;
  console.info(item, "checkedImg");
  let answerArr =
    answerKey.value.length < 2
      ? itemId.value
      : answerKey.value.filter((x) => x.id == soundId).map((f) => f.file);
  let fileId = Array.isArray(answerArr)
    ? Array.from(new Set(answerArr)).join(",")
    : answerArr;
  let imgError = {
    file: fileId,
    correct: item.correct,
    wrongFile: item?.image,
  };
  console.info(imgError, "checkedImg");
  //构建错误答案
  answerMap.set(item.uuid, imgError);
  console.info(answerMap, "checkedImg answerMap");

  item.correct
    ? (answerMarks.value[answerIndex.value].answerMark = 2)
    : (answerMarks.value[answerIndex.value].answerMark = 3);
  // isCheckFlag.value = false;
  emit("handleResume");
};
defineExpose({
  handleStartAudio,
  handleStopTest,
});

onMounted(() => {
  window.addEventListener("keyup", handkeyCode); //开启监听键盘按下事件
  window.addEventListener("setItemEvent", function (e: any) {
    //TODO 此处应该优化
    if (!e.newValue) {
      answerIndex.value = -1;
      isStop.value = true;
      if (prevRouter === "/imitate") {
        answerMarks.value.forEach((item) => {
          item.answerMark = 1;
        });
      }
      return;
    }
    let item = JSON.parse(e.newValue);
    //播放背景声
    // if (e.key === "audioStart" && item.id == -1) {
    //   bgIndex.value = item.target;
    //   return;
    // }

    if (e.key === "recordStart" || e.key === "recordStop") {
      handleAudio(e.key);
    }
    if (e.key === "audioStart") {
      if (item.id == -1) {
        //播放背景声
        bgIndex.value = item.target;
        bgName = item.name;
        bgVolume = item.volume;
        const arr =
          sounds.value && sounds.value.length !== 0
            ? sounds.value.filter(
                (bgItem) =>
                  parseInt(bgItem.index / 2) == parseInt(bgIndex.value / 2)
              )
            : [];
        if (arr.length === 0) {
          sounds.value.push({
            index: -1,
            bgName: item.name,
            bgVolume: item.volume,
            bgIndex: bgIndex.value,
          });
        } else {
          if (sounds.value && sounds.value.length !== 0) {
            sounds.value.forEach((bgItem) => {
              if (parseInt(bgItem.index / 2) == parseInt(bgIndex.value / 2)) {
                bgItem.bgIndex = bgIndex.value;
                bgItem.bgVolume = bgVolume;
                bgItem.bgName = bgName;
              }
              // if(bgItem.index == bgIndex.value) {
              //   bgItem.bgIndex = bgIndex.value
              // }
            });
          }
        }
      } else {
        if (item.id != soundId) {
          soundIndex.value = [];
          // sounds.value = []
          if (sounds.value && sounds.value.length !== 0) {
            // sounds.value.forEach(item=> {
            //   item.index = -1
            // })
            sounds.value = sounds.value.filter(
              (bgItem) =>
                bgIndex.value &&
                bgIndex.value >= 0 &&
                bgItem.bgIndex === bgIndex.value
            );
            sounds.value.forEach((bgItem) => {
              bgItem.index = -1;
              bgItem.name = "";
              bgItem.volume = "";
            });
          }
        }
        console.log(sounds.value)
        soundIndex.value.push(item.target);
        // sounds.value.push({index: item.target, name: item.name, volume: item.volume, bgIndex: -2})
        const arr =
          sounds.value && sounds.value.length !== 0
            ? sounds.value.filter(
                (bgItem) =>
                  parseInt(bgItem.bgIndex / 2) == parseInt(item.target / 2)
              )
            : [];
        if (arr.length === 0) {
          sounds.value.push({
            index: item.target,
            name: item.name,
            volume: item.volume,
            bgIndex: -3,
          });
        } else {
          if (sounds.value && sounds.value.length !== 0) {
            sounds.value.forEach((bgItem) => {
              if (parseInt(bgItem.bgIndex / 2) == parseInt(item.target / 2)) {
                bgItem.index = item.target;
                // bgItem.name = bgName ? bgItem.name + ',' + bgName : bgItem.name
                bgItem.name = item.name;
                bgItem.volume = item.volume;
              }
            });
          }
        }
        soundId = item.id;
        const arr2 =
          sounds.value && sounds.value.length !== 0 && bgIndex.value
            ? sounds.value.filter((bgItem) => bgItem.bgIndex == bgIndex.value)
            : [];
        if (arr2.length === 0 && bgIndex.value >= 0) {
          sounds.value.push({
            index: -1,
            bgIndex: bgIndex.value,
            bgVolume: bgVolume,
            bgName: bgName,
          });
        }
        sounds.value = sounds.value.sort((a, b) => {
          if (item.volume) {
            return b.volume * 1 - a.volume * 1;
          } else {
            return b.bgVolume * 1 - a.bgVolume * 1;
          }
        });
        answerI++;
        answerForm = {};
        answerIndex.value = item.id;
        syncDisabledBtn.value = false;
        // isCheckFlag.value = false;
        // newValue 数据结构问题
        uuid = item.uuid;
        displayId = item.id;
        itemId.value = item.file;
        answerKey.value.push(item);
        answerForm.correct = true; //默认正确
        if (enableManualplavMode.value) {
          isDisabled.value = true;
        }
        if (answerCheckIndex !== answerIndex.value) {
          checkedImgIndex.value = -1;
          isCheckFlag.value = false;
        }
        //添加到答案集map中
        if (answerMarks.value[answerIndex.value]) {
          answerMarks.value[answerIndex.value].answerMark = 2;
        }
        source = item.source;
      }
      if (
        item.id == -1 &&
        (e.key !== "recordStart" || e.key !== "recordStop")
      ) {
        return;
      }
      //     sounds.value = sounds.value.reduce((acc, curr) => {
      //   const found = acc.find(obj => obj.index === curr.index);
      //   const found2 = acc.find(obj => obj.bgIndex === curr.bgIndex);
      //   if (!found && !found2) {
      //     acc.push(curr);
      //   } else if (found && !found2) {
      //     acc.push(curr);
      //   } else if(!found && found2) {
      //     acc.push(curr);
      //   }
      //   return acc;
      // }, []);
    }
    if (e.key === "audioStop") {
      if (item.id === -1) {
        if (sounds.value && sounds.value.length !== 0) {
          // sounds.value.forEach(item=> {
          //   item.bgIndex = -2
          // })
          sounds.value = sounds.value.filter(
            (item) =>
              (item.index >= 0 && item.bgIndex === bgIndex.value) ||
              item.bgIndex !== bgIndex.value
          );
        }
        sounds.value.forEach((bgItem) => {
          bgItem.bgIndex = -3;
          bgItem.bgVolume = "";
          bgItem.bgName = "";
        });
        bgIndex.value = -2;
        bgName = "";
        bgVolume = "";

        return;
      }

      //构建答案
      if (audioId !== item.id) {
        let itemFileArr =
          answerKey.value.length < 2
            ? item.file
            : answerKey.value.filter((x) => x.id == soundId).map((f) => f.file);
        let fileId = Array.isArray(itemFileArr)
          ? Array.from(new Set(itemFileArr)).join(",")
          : itemFileArr;
        answerForm.file = fileId;
        console.info(itemId.value, answerForm, "answerForm");
        // audioFiles = []
        answerMap.set(item.uuid, answerForm);
        // console.info(answerMap, "11111111")
      }

      if (answerIndex.value + 1 === answerMarks.value.length) {
        enableManualplavModePlay = false;
      }
      // if (
      //   answerMarks.value[answerIndex.value] && Array.from(answerMap.values())[answerIndex.value] && Array.from(answerMap.values())[answerIndex.value]?.correct && isCheckFlag.value || !isCheckFlag.value && answerMarks.value[answerIndex.value]?.answerMark
      // ) {
      //   answerMarks.value[answerIndex.value]?.answerMark = 2;
      // }
      answerI = -1;

      audioId = item.id;
      if (!enableManualplavMode.value) {
        isDisabled.value = false;
      }
    }
  });
});
onBeforeUnmount(() => {
  window.removeEventListener("keyup", handkeyCode);
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
.sound-fixed-box {
  width: 400px;
  height: 500px;
  position: absolute;
  left: -400px;
  top: 200px;
  background-color: #fff;
  transition: transform 0.3s ease;
  // overflow-y: scroll;
  padding: 10px 20px;
}
.sound-fixed-box.move {
  transform: translateX(380px);
}
</style>
