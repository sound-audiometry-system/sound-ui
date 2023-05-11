<template>
  <el-dialog
    v-model="dialogVisible"
    :title="soundIndex + '号音响'"
    width="20%"
    :before-close="handleClose"
  >
    <div class="answer-box">
      <el-row>
        <el-col :span="12">
          <div><el-radio-group v-model="radio1" class="ml-4">
      <el-radio label="1" size="large">信号声</el-radio>>
    </el-radio-group></div>
        </el-col>
        <el-col :span="12">
          <p>间隔时间</p>
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
import { ref } from "vue";

const dialogVisible = ref(false);
const soundIndex = ref(0);
const radio1 = ref('1')
const handleClose = (done: () => void) => {
  done();
};
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
  padding: 20px;
  /* background-color: #f1f1f1; */
  height: 300px;
}
.el-dialog__body {
  padding-top: 0 !important;
}
</style>