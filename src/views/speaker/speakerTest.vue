<!-- 扬声器测听 -->
<template>
  <el-container>
    <el-header>
      <userHeader></userHeader>
    </el-header>
    <el-main ref="main">
      <el-tabs type="border-card">
        <el-tab-pane label="扬声器测听">
          <!-- echarts图表 -->
          <amplifier-test></amplifier-test>
          <!-- <div id="echarts-a" style="width: 600px;height:400px;"></div> -->
        </el-tab-pane>
        <el-tab-pane label="听力测试">
          <hearTest
            :imageData="imageData"
            :answerIndex="answerIndex"
            :isPlay="isPlay"
            @handleStart="handleStart"
            @handleStop="handleStop"
            @handleSave="handleOpen"
            @handleAudio="handleAudio"
            @handleStopAudio="handleStopAudio"
            @handlePause="handlePause"
            @handleResume="handleResume"
          ></hearTest>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-dialog
      v-model="dialogVisible"
      title="保存本次测试"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="ruleFormRef"
        :model="form"
        label-width="120px"
        label-position="top"
        :rules="rules"
      >
        <el-form-item label="操作人姓名" prop="operator">
          <el-input v-model="form.operator" />
        </el-form-item>
        <el-form-item label="结果分析与建议" prop="reason">
          <el-input v-model="form.reason" type="textarea" rows="5" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSave(ruleFormRef)"> 保 存 </el-button>
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, watch, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { auditionApi } from "@/serve/api/user";
import * as echarts from "echarts";
import userHeader from "../lay/MainHeader.vue";
import hearTest from "./hearTest.vue";
import amplifierTest from "./amplifierTest.vue";
import footer from "../../components/sound/index.vue";
import footerTab from "../../components/footerTab.vue";
import { useRoute } from "vue-router";
import { useStore, mapState } from "vuex";
let value = ref("1");

let isStart = false;
let isPlay = ref(false);
const dialogVisible = ref(false);
let isOpen = false;
let store = useStore();
const route = useRoute();
const testData = store.getters.getTestData;
const main = ref();
let imageData = {};
let answerIndex = ref(0); // 答题进度索引
const ruleFormRef = ref<FormInstance>();
var rec;
const userInfo = JSON.parse(sessionStorage.getItem("userInfo")) || "";
interface RuleForm {
  operator: string
}
const form = reactive({
  uid: userInfo[0].uid,
  testId: testData[0].id,
  answerList: testData[0].signalSoundConfig,
  operator: "",
  reason: "",
});
const rules = reactive<FormRules<RuleForm>>({
  operator: [
    { required: true, message: '请输入操作人姓名', trigger: 'blur' },
  ],
})
// console.log(testData);
//计算属性——完整
// let imageData = computed({
//   // 读
//   get() {
//     return sessionStorage.getItem('imageData') ? JSON.parse(sessionStorage.getItem('imageData') || '') : [];
//   },
//   // 写
//   set(value) {
//     console.log(value)
//   },
// });
const startTest = async (value1, value2) => {
  let params = {};
  if (!value1) {
    params["leftHide"] = value1;
  }
  if (!value2) {
    params["rightHide"] = value2;
  }
  //开始
  isPlay.value = true;
  if (!value1 && !value2) {
    params["test"] = true;
  }
  // console.info("startParam ------------>",params)
  const res = await auditionApi.startTest(testData[0], params);
  if (res.code == 0) {
    isStart = true;
    // isPlay.value = false
  }
};
const handleClose = () => {
  dialogVisible.value = false;
};
const stopTest = async () => {
  //结束
  const res = await auditionApi.stopTest();
  if (res.code == 0) {
    isStart = false;
    isPlay.value = false;
  }
};
const handlePause = async () => {
  const res = await auditionApi.pauseTest();
};

const handleResume = async () => {
  const res = await auditionApi.resumeTest();
};
const handleOpen=()=> {
  dialogVisible.value = true
}
const handleSave = async (formEl:FormInstance | undefined) => {
  if (!formEl) return
  //保存
  // console.log(testData[0].commands)
  //commands
  // const res = await auditionApi.report({ uid: userInfo[0].uid, testId:testData[0].id,answerList: testData[0].commands, operator: 'admin',reason: '提前结束' });
  // if (res.code == 0) {
  //   isStart = false;
  //   isPlay.value = false
  // }
  formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await auditionApi.report(form);
      if (res.code == 0) {
        isStart = false;
        isPlay.value = false;
        dialogVisible.value = false
        ElMessage({
        message: "保存成功",
        type: "success",
      });
      }
    } else {
      ElMessage({
        message: "数据填写有误",
        type: "warning",
      });
    }
  });
};
document.addEventListener(
  "astilectron-ready",
  () => {
    // console.log(1111111);
    astilectron.onMessage((message) => {
      // console.log(message);
    });
  },
  true
);
window.addEventListener("resize", () => {
  // console.log(22222);
});
const recOpen = () => {
  isOpen = true;
  rec = Recorder({
    //本配置参数请参考下面的文档，有详细介绍
    type: "mp3",
    sampleRate: 16000,
    bitRate: 16, //mp3格式，指定采样率hz、比特率kbps，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把格式支持文件加载进来，比如使用wav格式需要提前加载wav.js编码引擎
    onProcess: function (
      buffers,
      powerLevel,
      bufferDuration,
      bufferSampleRate,
      newBufferIdx,
      asyncEnd
    ) {
      //录音实时回调，大约1秒调用12次本回调，buffers为开始到现在的所有录音pcm数据块(16位小端LE)
      //可实时绘制波形（extensions目录内的waveview.js、wavesurfer.view.js、frequency.histogram.view.js插件功能）
      //可利用extensions/sonic.js插件实时变速变调，此插件计算量巨大，onProcess需要返回true开启异步模式
      //可实时上传（发送）数据，配合Recorder.SampleData方法，将buffers中的新数据连续的转换成pcm上传，或使用mock方法将新数据连续的转码成其他格式上传，可以参考文档里面的：Demo片段列表 -> 实时转码并上传-通用版；基于本功能可以做到：实时转发数据、实时保存数据、实时语音识别（ASR）等
    },
  });

  //var dialog=createDelayDialog(); 我们可以选择性的弹一个对话框：为了防止移动端浏览器存在第三种情况：用户忽略，并且（或者国产系统UC系）浏览器没有任何回调，此处demo省略了弹窗的代码
  rec.open(
    function (success) {
      ElMessage({
        message: "已开启录音",
        type: "success",
      });
      //打开麦克风授权获得相关资源
      //dialog&&dialog.Cancel(); 如果开启了弹框，此处需要取消
      rec.start(); //此处可以立即开始录音，但不建议这样编写，因为open是一个延迟漫长的操作，通过两次用户操作来分别调用open和start是推荐的最佳流程

      success && success();
    },
    function (msg, isUserNotAllow) {
      //用户拒绝未授权或不支持
      //dialog&&dialog.Cancel(); 如果开启了弹框，此处需要取消
      console.log((isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg);
    }
  );
};
const recStart = () => {
  //打开了录音后才能进行start、stop调用
  rec.start();
};
const handleStart = (value1, value2) => {
  if (isStart) return;
  startTest(value1, value2);
  // document.addEventListener("astilectron-ready",  ()=> {
  //   astilectron.onMessage((message)=> {
  //     console.log(message);
  //   });
  // });
};
const handleStop = () => {
  if (!isStart) return;
  stopTest();
};

const handleAudio = async () => {
  await recOpen();
  // recStart()
};
const handleStopAudio = () => {
  if (!isOpen) return;
  rec.stop(
    async function (blob, duration) {
      //简单利用URL生成本地文件地址，注意不用了时需要revokeObjectURL，否则霸占内存
      //此地址只能本地使用，比如赋值给audio.src进行播放，赋值给a.href然后a.click()进行下载（a需提供download="xxx.mp3"属性）
      console.log(blob);
      var localUrl = (window.URL || webkitURL).createObjectURL(blob);
      console.log(blob, localUrl, "时长:" + duration + "ms");
      rec.close(); //释放录音资源，当然可以不释放，后面可以连续调用start；但不释放时系统或浏览器会一直提示在录音，最佳操作是录完就close掉
      rec = null;

      //已经拿到blob文件对象想干嘛就干嘛：立即播放、上传、下载保存
      const formData = new FormData();
      formData.append("upfile", blob, "test.mp3");
      formData.append("resourceId", testData[0].id);
      console.log(formData.get("upfile"), "upfile");
      console.log(formData.get("resourceId"), "resourceId");
      const res = await auditionApi.fileUpload(formData);
      isOpen = false;
      ElMessage({
        message: "录音关闭",
        type: "success",
      });
      /*** 【立即播放例子】 ***/
      // var audio = document.createElement("audio");
      // audio.controls = true;
      // document.body.appendChild(audio);
      // audio.src = localUrl;
      // audio.play();
    },
    function (msg) {
      console.log("录音失败:" + msg);
      rec.close(); //可以通过stop方法的第3个参数来自动调用close
      rec = null;
      isOpen = false;
    }
  );
};
onMounted(() => {
  //   document.removeEventListener("astilectron-ready", ()=> {
  // })
  //   document.addEventListener("astilectron-ready",  ()=> {
  //     astilectron.onMessage((message)=> {
  //       console.log(message);
  //     });
  //   });
  // console.log(main.value.$refs)
  // const imageData: any = ref(
  //   JSON.stringify(sessionStorage.getItem("imageData") || "")
  // );
  window.addEventListener("setItemEvent", function (e: any) {
    if (!e.newValue) {
      isStart = false;
      isPlay.value = false;
      // imageData = {}
      ElMessage({
        message: "方案播放完成",
        type: "success",
      });
      handleSave();
      if (!isOpen) {
        handleStopAudio();
      }
      imageData = reactive({});
      return;
    }
    if (e.key === "imageData") {
      answerIndex.value += 1;
      if (sessionStorage.getItem("imageData")) {
        imageData = reactive(
          JSON.parse(sessionStorage.getItem("imageData") || "")
        );
      }
      if (imageData.answerList && imageData.answerList.length != 0) {
        for (const item of imageData.answerList) {
          item.isCheckFlag = false;
        }
      }
      // console.log(imageData);
      // console.log(imageData.value);
    }
  });
});
</script>
<style lang="scss" scoped>
.el-container {
  width: 1920px;
  height: 1080px;
  margin: 0 auto;
  margin-top: 50px;
  .el-tabs {
    height: 1000px;
  }
  .el-main {
    padding-block: inherit;
    padding: 0 !important;
  }
}
.el-tabs--border-card {
  background-color: #f5f5f5;
}
</style>
