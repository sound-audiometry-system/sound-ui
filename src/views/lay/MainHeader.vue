<!-- 头部个人信息 -->
<template>
  <el-row :gutter="20">
    <el-col :span="6" style="width: 120px">
      <el-icon size="24">
        <Avatar />
      </el-icon>
      <!-- <label style="margin-left: 10px; line-height: 48px;">{{ userInfo[0].name}}</label> -->
      <el-select
        :v-model="userInfo.name"
        class="m-2"
        :placeholder="userInfo.name"
        size="large"
        @change="changePlan"
        :disabled="props.isPlay"
      >
        <el-option-group
          v-for="group in testSelectData"
          :key="group.label"
          :label="group.label"
        >
          <el-option
            v-for="item in group.data"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-option-group>
      </el-select>
    </el-col>
    <!-- <el-col :span="6">
            <el-button link>测试</el-button>
        </el-col> -->
    <el-col :span="12">
      <div class="testClass">
        <img src="../../assets/test.png" style="height: 18px; widows: 18px" />
      </div>
      <text>测试</text>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
let store = useStore();
const router = useRouter();
type Props = {
  isPlay: any;
};
const props = defineProps<Props>();
const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "");
console.info(userInfo,"111111111111111111111111111111111111111111")
const testData = sessionStorage.getItem("testData") ? JSON.parse(sessionStorage.getItem("testData") || "") : "";
let revertData = [
  {
    label: "切换测试模式",
    data: testData,
  },
];
let testSelectData = ref(revertData);
console.info(testSelectData, "testData");
const changePlan = (val) => {
  //TODO 处理方案变化
  // console.info(val, "val");
  // console.info(testSelectData.value[0], "testSelectData");
  ElMessageBox.confirm("确定切换测试方案？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    const testDataFlt = testSelectData.value[0].data.filter(
      (item) => item.id === val
    );
    // console.log(testDataFlt)
    store.commit("setTestData", testDataFlt);
    // console.log(22222)
    // if (testResult.value == 1) {
    router.push({ path: "/speaker", query: { type: "2", t: Date.now() } });
  });
};
</script>
<style scoped lang="scss">
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #c8d8d5;
  color: #000;
}
.testClass {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  border-radius: 16px;
  background-color: #208570;
}
.el-col {
  width: 120px;
  height: 48px;
  display: flex;
  background-color: #ffffff;
  font-size: large;
  line-height: 48px;
  justify-content: flex-start;
  align-items: center;

  .el-button {
    font-size: large;
    line-height: 65px;
  }
}
</style>