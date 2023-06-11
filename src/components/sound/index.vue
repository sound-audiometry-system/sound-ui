<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <p>左</p>
        <div class="left-indicate"></div>
    </el-col>
      <el-col class="dot" :span="12">
        <div class="dot-outer">
          <div class="dot-center"><img src="../../assets/header.png" width="30" alt=""></div>
          <div @click="handleClkItem(index)" v-for="(item, index) in 12" :key="index" class="dot-control">
            {{ index }}
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <p>右</p>
        <div class="right-indicate"></div>
    </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { auditionApi } from "@/serve/api/user";
const emit = defineEmits(['handleClkItem'])
const soundList = ref([])
onMounted(async ()=> {
  const res = await auditionApi.getDevice()
  if (res.code == 0) {
    console.log(res)
  }
})
const handleClkItem = (index: number) => {
    emit('handleClkItem', index)
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>