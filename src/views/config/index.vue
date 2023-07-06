<template>
  <el-container>
    <el-main>
      <el-tabs type="border-card">
        <el-tab-pane  label="设备连接">
          <equipment />
        </el-tab-pane>
        <el-tab-pane  label="测试声音阈校准">
          <calibration
            @handleCalibration="handleCalibration"
            v-if="!isConfig"
          ></calibration>
          <calibration-config
            @handleBack="handleBack"
            :test-data="testData"
            v-else
          ></calibration-config>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-footer>
      <FooterTab />
    </el-footer>
  </el-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import FooterTab from "../../components/footerTab.vue";
import equipment from "./equipment.vue";
import calibration from "./calibration.vue";
import calibrationConfig from "./calibration-config.vue";
const isConfig = ref(false);
const testData = ref({});
const handleCalibration = (index, row) => {
  isConfig.value = true;
  testData.value = row;
};
const handleBack = () => {
  isConfig.value = false;
};
</script>

<style scoped lang="scss">
.el-container {
  width: 100%;
  height: 95%;
  margin: 0 auto;
  margin-top: 50px;
  transform: scale(1);
  .el-main {
    width: 1920px;
    height: 940px;
    padding: 0px;
    .el-tabs {
      width: 1920px;
      height: 960px;
      // :deep(.el-tabs__item) {
      //   width: 590px;
      // }
    }
  }
}
:deep(.el-footer) {
  width: 1920px;
  padding: 0;
}
</style>
