<template>
    <el-form-item label="测试名称">
        <el-input disabled v-model="testName" />
    </el-form-item>
    <el-container>
        <el-aside>
            <div class="es-switch">
                <span><el-switch v-model="value1" :before-change="beforeChange1" />
                    <label style="font-size: 16px;">左显示器</label></span>
                <span><el-switch v-model="value2" class="ml-2" /><label>右显示器</label> </span>
            </div>
            <div style="margin-left: 10px; width: 320px;height: 240px; background-color: #8cdcfe;"></div>

            <el-row class="error-a">
                <label style="margin-left: 5px;font-size: large;">错误走向</label>
                <el-button size="small" style="margin-right: 5px;"><el-icon style="color: red;margin-right: 2px;">
                        <CircleClose />
                    </el-icon>错误</el-button>
                <!-- <el-icon><CircleCloseFilled /></el-icon>   :icon="CircleClose"-->
            </el-row>
            <el-row style="margin-left: 10px; width: 400px;height: 200px; background-color: #8cdcfe;">
                错误展示
            </el-row>
        </el-aside>

        <el-main>
            <el-button style="margin: 3px 0px 5px 0px;" link><el-icon style="margin-right: 2px;" circle ><Microphone /></el-icon>开启录音</el-button>
            <div style="height: 280px;width: 465px;"><sound @handleClkItem="handleClkItem"></sound></div>
            <el-row class="el-btn a">
                <el-button size="small">开始</el-button>
                <el-button size="small">保存</el-button>
                <el-button size="small">保存并生成记录</el-button>
                <el-button size="small">提前结束</el-button>
                <el-button size="small">测试文件</el-button>
            </el-row>
            <el-row class="el-btn b">
                <el-button size="small">上一个</el-button><el-button size="small">下一个</el-button><el-button
                    size="small">重复</el-button>
            </el-row>
            <el-row>
                <div style="height: 110px;width: 465px;background-color: #E9E9E9;padding: 12px 20px;">
                <div style="display: flex;justify-content: space-between;margin-bottom: 16px;align-items: center;"><span style="font-weight: bold;">答题进度</span><span style="font-size: 12px;" @click="handleClk">查看全部<el-icon><CaretRight /></el-icon></span></div>
                <div style="height: 24px;overflow: hidden;"><span v-for="(item, index) in 20" :key="index" :class="{'answer-num': true, 'success-active': index === 0 || index === 1, 'error-active': index===2 || index===3}">{{ index+1 }}</span></div>
                </div>
            </el-row>
        </el-main>
        <answer-dialog ref="answerDialogRef"></answer-dialog>
        <sound-dialog ref="soundDialogRef"></sound-dialog>
    </el-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Edit, CircleClose } from "@element-plus/icons-vue";
import answerDialog from "./components/answerDialog.vue";
import soundDialog from "./components/soundDialog.vue";
import sound from "../../components/sound/index.vue";
let testName = ref("儿童视觉测试");
const answerDialogRef = ref(null);
const soundDialogRef = ref(null);
let value1 = ref(true);
let value2 = ref(true);
// answerDialogRef.value.show([])
let beforeChange1 = (value1) => {
  console.info(111);
  if (value1) {
    value1 = false;
  } else {
    value1 = true;
  }
  return value1;
};
const handleClk = () => {
  console.log(answerDialogRef.value);
  answerDialogRef.value.show([]);
};
const handleClkItem = (index) => {
    console.log(index)
    soundDialogRef.value.show(index)
}
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
</style>
