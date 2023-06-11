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
          <div @click="handleClkItem(index)" v-for="(item, index) in soundList" :key="index" :class="{ 'dot-control': true, 'error-active': item.active && index <= 4, 'success-active': item.active && index > 5 && index <= 10 }">
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
import { onMounted, ref, watch } from 'vue'
import { auditionApi } from "@/serve/api/user";
import { findLastKey } from 'lodash';
const emit = defineEmits(['handleClkItem'])
const soundList = ref([
  {
    value: '0',
    active: false,
  },
  {
    value: '1',
    active: false,
  },
  {
    value: '2',
    active: false,
  },
  {
    value: '3',
    active: false,
  },
  {
    value: '4',
    active: false,
  },
  {
    value: '5',
    active: false,
  },
  {
    value: '6',
    active: false,
  },
  {
    value: '7',
    active: false,
  },
  {
    value: '8',
    active: false,
  },
  {
    value: '9',
    active: false,
  },
  {
    value: '10',
    active: false,
  },
  {
    value: '11',
    active: false,
  },

])
type Props = {
  sounds: any;
};
const props = defineProps<Props>();
watch(()=> props.sounds, (newValue, oldValue)=> {
  if (props.sounds && props.sounds.length != 0) {
    for (const item of props.sounds) {
    for (const obj of soundList.value) {
      if (obj.value == item.substring(1,2)) {
        item.active = true
      }
    }
  }
  }
})
onMounted(async ()=> {
  // const res = await auditionApi.getDevice()
  // if (res.code == 0) {
  //   console.log(res)
  // }
})
const handleClkItem = (index: number) => {
    emit('handleClkItem', index)
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>