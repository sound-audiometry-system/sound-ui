<template>
  <el-container>
    <el-main
      >标签页
      <el-tabs type="border-card">
        <el-tab-pane style="width: 540px" label="设备连接">
          <equipment />
        </el-tab-pane>
        <el-tab-pane style="width: 1040px" label="测试声音阈校准">
          <calibration></calibration>
        </el-tab-pane>
      </el-tabs>
    </el-main>  
    <el-footer>
      <FooterTab />
    </el-footer>
  </el-container>
</template>
<script setup lang="ts">
import FooterTab from "../../components/footerTab.vue";
import equipment from "./equipment.vue";
import calibration from "./calibration.vue";
</script>

<style scoped lang="scss">
.el-container {
  width: 1080px;
  height: 803px;

  .el-main {
    height: 655px;
    padding: 0px;

    .el-tabs {
      height: 719px;
      :deep(.el-tabs__item) {
        width: 590px;
      }
    }
  }
}
:deep(.el-footer) {
  width: 1080px;
  padding: 0;
}
</style>
