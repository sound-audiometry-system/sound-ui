<script setup>
import hear from "./hear/Sound.vue"
import vision from "./vision/index.vue"
</script>

<template>
  <el-tabs type="border-card">
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <span>言语识别采集</span>
        </span>
      </template>
      <hear></hear>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <span>言语测试视觉辅助</span>
        </span>
      </template>
      <vision></vision>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>
.custom-tabs-label {
  margin-left: 0px;
  margin-top: 0px;
  width: 400px;
  /* background-color: #819323; */

}
.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  
}
.el-tab-pane{
  height: 500px;
}
</style>
