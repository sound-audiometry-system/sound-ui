<template>
  <el-form-item label="测试名称">
    <el-input style="width: 1680px" disabled v-model="testName" />
    <el-button style="float: left; margin-left: 5px" type="primary" @click="handleBack">返回</el-button>
  </el-form-item>
  <el-container>
    <el-aside>
      <div class="es-switch">
        <span><el-switch v-model="value1" />
          <label>左显示器</label></span>
        <span><el-switch v-model="value2" class="ml-2" /><label>右显示器</label>
        </span>
      </div>
      <div style="
          margin-left: 10px;
          width: 920px;
          height: 335px;
          padding: 0 6px;
          display: flex;
        ">
        <el-row style="background-color: #000; width: 82%; height: 100%; align-items: center; overflow: auto;"
          align="center" :gutter="10">
          <el-col v-for="(item, index) in props.imageData.answerList" :key="item.id" :span="8">
            <!-- @click="checkedImg(index)" -->
            <el-image style="width: 100%; height: 160px" :src="item.sourceUrl" :fit="item.label" />
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
        </div>
      </div>

      <el-row class="error-a">
        <label style="margin-left: 5px; font-size: large">错误走向</label>
        <el-button @click="handleCheck" :disabled = "sycnDisabledBtn" size="large" style="margin-right: 5px">
          <el-icon style="color: red; margin-right: 2px">
            <CircleClose />
          </el-icon>错误</el-button>
        <!-- <el-icon><CircleCloseFilled /></el-icon>   :icon="CircleClose"-->
      </el-row>
      <el-row :gutter="10" style="
          margin-left: 10px;
          width: 920px;
          height: 305px;
          background-color: #8cdcfe;
          padding-top: 6px;
          overflow: auto;
        ">
        <el-col v-for="(item, index) in props.imageData.answerList" :key="item.id" :span="8">
          <el-image @click="checkedImg(item, index)" :class="{
            'is-checked-img-error':
              item.isCheckFlag && index + 1 != props.imageData.target,
            'is-checked-img-success':
              item.isCheckFlag && index + 1 == props.imageData.target,
          }" style="width: 100%; height: 160px" :src="item.sourceUrl" :fit="item.label" />
          <div style="text-align: center">
            <el-icon v-if="item.isCheckFlag && index + 1 != props.imageData.target"
              style="color: red; font-size: 26px; margin: 0 auto">
              <CircleClose />
            </el-icon>
            <el-icon v-if="item.isCheckFlag && index + 1 == props.imageData.target" style="color: green; font-size: 26px">
              <CircleCheck />
            </el-icon>
          </div>
        </el-col>
      </el-row>
    </el-aside>

    <el-main>
      <el-button @click="handleAudio" style="margin: 3px 0px 5px 0px" link><el-icon
          style="margin-right: 2px; color: #134efe" circle>
          <Microphone />
        </el-icon>{{ isOpen ? "关闭录音" : "开启录音" }}</el-button>
      <div style="height: 290px; width: 530px">
        <sound @handleClkItem="handleClkItem" :sound-index="soundIndex"></sound>
      </div>
      <el-row class="el-btn a">
        <el-button :disabled="props.isPlay" size="large" plain @click="handleStart">开始</el-button>
        <el-button :disabled="!props.isPlay" size="large" plain @click="handleSave(1)">保存</el-button>
        <el-button :disabled="!props.isPlay" size="large" plain @click="handleSave(2)">提前结束</el-button>
      </el-row>
      <el-row class="el-btn b">
        <el-button :disabled="!props.isPlay" @click="handlePrev">上一个(左键)</el-button>
        <el-button :disabled="!props.isPlay" @click="handleNext">下一个(右键)</el-button>
        <el-button :disabled="!props.isPlay" @click="handleReImage">重复</el-button>
      </el-row>
      <el-row>
        <div style="
            height: 300px;
            width: 950px;
            background-color: #e9e9e9;
            margin-top: 15px;
            padding: 12px 20px;
          ">
          <div style="
              display: flex;
              justify-content: space-between;
              margin-bottom: 16px;
              align-items: center;
            ">
            <span style="font-weight: bold">答题进度</span><span style="font-size: 12px" @click="handleClk">查看全部<el-icon>
                <CaretRight />
              </el-icon></span>
          </div>
          <div style="height: 36px; overflow: hidden">
            <span v-for="(item, index) in answerMarks" :key="index" :class="{
              'answer-num': true,
              'success-active': item.answerMark == 2,
              'error-active': item.answerMark == 3,
            }">{{ index + 1 }}</span>
          </div>
        </div>
      </el-row>
    </el-main>
    <answer-dialog ref="answerDialogRef" :answerMarks="answerMarks"></answer-dialog>
    <sound-dialog ref="soundDialogRef"></sound-dialog>
  </el-container>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, provide } from "vue";
import { Edit, CircleClose, CircleCheck } from "@element-plus/icons-vue";
import { useRouter } from 'vue-router'
const router = useRouter()
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
let isOpen = ref(false);
let sycnDisabledBtn = ref(false);
let soundIndex = ref(30);
let source = ''
let answerForm = {}
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
let answerList = []
const isCheckFlag = ref(false);
const answerMap = new Map();
const answerUUID = ref('')
const isCheck = ref(false);
const itemId = ref("")
let displayId = 0
let rePlayId = -1
watch(
  () => props.imageData,
  (newValue, oldValue) => {
    // answerIndex.value++;
    // isCheckFlag.value = false;
    // console.log(222222222)
  },
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
  emit("handleStart", value1.value, value2.value);
};
const handleBack = () => {
  emit("handleStop");
  router.back()
}
const handleStop = () => {
  for (const item of answerMarks.value) {
    item.answerMark = 1;
  }
  // emit("handleStop");
};
const handleSave = (type: number) => {
  console.log("1111111111111    ", answerMap.values())
  console.log("=======>1111111   ", Array.from(answerMap.values()))
  emit("handleSave", type, Array.from(answerMap.values()));
};
// const changeUniqueArr = ()=> {
//   let list =  answerMap.values;
//   let arr = list.reverse()
//   return arr.reduce((acc, curr) => {
//   let found = acc.find(item => item.file === curr.file);
//   if (!found) {
//     acc.push(curr);
//   }
//   return acc;
// }, []);
// }
const handleAudio = () => {
  isOpen.value = !isOpen.value;
  emit(isOpen.value ? "handleAudio" : "handleStopAudio");
};
const handleStopAudio = () => {
  emit("handleStopAudio");
};
const handleCheck = () => {
  isCheckFlag.value = true;
  emit("handlePause");
};
// 上一个
const handlePrev = async () => {
  const res = await auditionApi.prevTest();
  if (res.code == 0) {
    isCheckFlag.value = false;
    answerIndex.value != 0 && answerIndex.value--;
  }
};
// 下一个
const handleNext = async () => {
  console.error("handleNext  ====>>>>>>   ", answerMap.values())
  const res = await auditionApi.nextTest();
  if (res.code == 0) {
    // isCheckFlag.value = false;
    // answerIndex.value++;
  }
};
// 重复
const handleReImage = async () => {
  const res = await auditionApi.reImageTest();
  if (res.code == 0) {
    isCheckFlag.value = false;
    rePlayId = displayId
  }
};
const mod = (n, m) => {
  return parseInt(n / m);
};
const checkedImg = (item, index) => {
  if (!isCheckFlag.value) return;
  sycnDisabledBtn.value = false;
  // console.error("props.imageData  ====>>>>>>   " , props.imageData)
  props.imageData.answerList[index].isCheckFlag = true;
  //构建错误答案
  answerMap.set(item.uuid, { "file": itemId.value, "correct": false, "wrongFile": item.image })

  index + 1 == props.imageData.target
    ? (answerMarks.value[answerIndex.value].answerMark = 2)
    : (answerMarks.value[answerIndex.value].answerMark = 3);
  isCheckFlag.value = false;
  emit("handleResume");
};
onMounted(() => {
  window.addEventListener("setItemEvent", function (e: any) {
    if (!e.newValue) {
      for (const item of answerMarks.value) {
        // console.log(item)
        item.answerMark = 1;
      }
      answerIndex.value = 0
      soundIndex.value = 0
      displayId = 0
      console.log(props.isSave)
      !props.isSave && emit("handleSave", 1, Array.from(answerMap.values()))
      return;
    }
    let item = JSON.parse(e.newValue);
    if (e.key === "imageData") {
      console.error(answerIndex.value, 'answerIndex')
      console.error(e, 'e')
      // if (e.) {

      // }
      if (rePlayId != item.id) answerIndex.value += 1
      isCheckFlag.value = false;

    }
    // 1111
    if (e.key === "audioStart") {
      //TODO newValue 数据结构问题

      // displayId != e.id && displayId = e?.id
      displayId = item.id
      itemId.value = item.file;
      soundIndex.value = mod(item.target, 2);
      answerForm.file = item.file //题目id
      answerForm.correct = true //默认正确
      //添加到答案集map中
      answerMap.set(item.uuid, answerForm)
      console.error("audioStart  ====>>>>>>   ", answerMap)
      source = item.source
    }
    if (e.key === 'audioStop') {
      if (answerMarks.value[answerIndex.value].answerMark !== 3) {
        answerMarks.value[answerIndex.value].answerMark = 2;
      }
      answerForm = {}
      // handleStop()
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
