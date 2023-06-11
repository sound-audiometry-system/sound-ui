<template>
  <el-dialog
    v-model="dialogVisible"
    title="答题进度"
    width="30%"
    :before-close="handleClose"
  >
    <span class="answer-box">
        <span v-for="(item, index) in props.answerMarks" :class="{
                'answer-num': true,
                'success-active': item.answerMark == 2,
                'error-active': item.answerMark == 3,
              }">{{ index+1 }}</span>
    </span>
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
type Props = {
  answerMarks: any;
};
const props = defineProps<Props>();
const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
  done();
};
const show = (arr: []) => {
    dialogVisible.value = true;
};
defineExpose({
  show,
});
</script>

<style scoped>
.answer-num {
    display: inline-block;
    width: 24px;
    line-height: 24px;
    border-radius: 50%;
    text-align: center;
    /* background-color: #DADADA; */
    background-color: #fff;
    color: #9F9F9F;
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
    display: inline-block;
    padding: 20px;
    background-color: #F1F1F1;
    height: 300px;
}
</style>