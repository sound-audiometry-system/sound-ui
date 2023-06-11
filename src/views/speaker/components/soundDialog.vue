<template>
  <el-dialog
    v-model="dialogVisible"
    :title="soundIndex + '号音响'"
    width="20%"
    :before-close="handleClose"
  >
    <div class="answer-box">
      <el-row style="display: flex; align-items: center" :gutter="10">
        <el-col :span="12">
          <div>
            <el-radio-group v-model="radio1" class="ml-4">
              <el-radio label="1" size="large">信号声</el-radio>
            </el-radio-group>
          </div>
        </el-col>
        <el-col style="text-align: center;" :span="12">
          <p>间隔时间</p>
        </el-col>
        <el-col :span="9"><el-input v-model="queryForm.fileName" placeholder="文件名" /></el-col>
        <el-col :span="6"><el-button type="info" plain>查看</el-button></el-col>
        <el-col :span="9"><el-select v-model="queryForm.delay" class="m-2" placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select></el-col>
      </el-row>
      <el-row style="display: flex; align-items: center;margin-top: 12px;" :gutter="10">
        <el-col style="font-size: 14px;color: #3A3A3A;" :span="6">信号声</el-col>
      <el-col :span="4"><el-input size="small" v-model="queryForm.signal" placeholder="52" /></el-col>
      <el-col :span="6">（分贝dB）</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-slider style="width: 100%" v-model="queryForm.signal" :min="25" :max="80" :marks="marks" />
        </el-col>
      </el-row>
      <el-row style="display: flex; align-items: center;margin-top: 40px;" :gutter="10">
        <el-col :span="24">
          <div>
            <el-radio-group v-model="radio1" class="ml-4">
              <el-radio label="1" size="large">环境声</el-radio>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span="9"><el-input v-model="queryForm.fileName" placeholder="文件名" /></el-col>
        <el-col :span="6"><el-button type="info" plain>查看</el-button></el-col>
      </el-row>
      <el-row style="display: flex; align-items: center;margin-top: 12px;" :gutter="10">
        <el-col style="font-size: 14px;color: #3A3A3A;" :span="6">环境声</el-col>
      <el-col :span="4"><el-input size="small" v-model="queryForm.signal" placeholder="52" /></el-col>
      <el-col :span="6">（分贝dB）</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-slider style="width: 100%" v-model="queryForm.signal" :min="25" :max="80" :marks="marks" />
        </el-col>
      </el-row>
    </div>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template> -->
  </el-dialog>
</template>

<script setup lang="ts">
import { ref,reactive } from "vue";
import type { CSSProperties } from 'vue'
import { userApi } from "@/serve/api/user";
const dialogVisible = ref(false);
const soundIndex = ref(0);
const radio1 = ref("1");
const queryForm = reactive({
  fileName: null,
  delay: '1',
  signal: 52,
  ambient: null
})
interface Mark {
  style: CSSProperties
  label: string
}
type Marks = Record<number, Mark | string>
  const marks = reactive<Marks>({
  30: '30',
  35: '35',
  40: '40',
  45: '45',
  50: '50',
  55: '55',
  60: '60',
  65: '65',
  70: '70',
  75: '75',
  80: '80',
})
const options = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
]
const getUserPatient = ()=> {
  userApi.getUserPatient({ uid: '1' })
}
const handleClose = (done: () => void) => {
  done();
};
getUserPatient()
const show = (index) => {
  dialogVisible.value = true;
  soundIndex.value = index;
};
defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.answer-num {
  display: inline-block;
  width: 24px;
  line-height: 24px;
  border-radius: 50%;
  text-align: center;
  /* background-color: #DADADA; */
  background-color: #fff;
  color: #9f9f9f;
  margin-right: 12px;
  margin-bottom: 16px;
}
.success-active {
  background-color: #c9d681;
}
.error-active {
  background-color: #d63639;
  color: #fff;
}
.answer-box {
  width: 100%;
  padding-bottom: 20px;
  /* background-color: #f1f1f1; */
  height: 300px;
}
.el-dialog__body {
  padding-top: 0 !important;
}
:deep(.el-slider__marks) {
  width: 98%;
}
:deep(.el-dialog__body) {
  height: 400px;
}
</style>