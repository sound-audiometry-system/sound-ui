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
          <div @click="handleClkItem(index)" v-for="(item, index) in soundList" :key="index" :class="{ 
            'dot-control': true, 
            'error-active': item.active && index <= 4, 
            'success-active': item.active && index > 5 && index <= 10,
            'config-active3':props.deviceConfig && props.deviceConfig.length != 0 && props.deviceConfig[index]?.signalCalibrated && props.deviceConfig[index]?.environmentalCalibrated,
            'config-active1':props.deviceConfig && props.deviceConfig.length != 0 && props.deviceConfig[index]?.signalCalibrated,
            'config-active2':props.deviceConfig && props.deviceConfig.length != 0 && props.deviceConfig[index]?.environmentalCalibrated || props.soundIndex == index  }">
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
import { onMounted, ref, watch, watchEffect } from 'vue'
// background: linear-gradient(to right, #ffbd26 50%, #b0b912 50%);
const emit = defineEmits(['handleClkItem'])
const soundList = ref([
  {
    soundVal: '0',
    active: false,
  },
  {
    soundVal: '1',
    active: false,
  },
  {
    soundVal: '2',
    active: false,
  },
  {
    soundVal: '3',
    active: false,
  },
  {
    soundVal: '4',
    active: false,
  },
  {
    soundVal: '5',
    active: false,
  },
  {
    soundVal: '6',
    active: false,
  },
  {
    soundVal: '7',
    active: false,
  },
  {
    soundVal: '8',
    active: false,
  },
  {
    soundVal: '9',
    active: false,
  },
  {
    soundVal: '10',
    active: false,
  },
  {
    soundVal: '11',
    active: false,
  },

])
type Props = {
  sounds: any;
  deviceConfig:any;
  soundIndex: Number;
};
const props = defineProps<Props>();
watch(()=>props.sounds, (newValue, oldValue)=> {
  if (props.sounds && props.sounds.length != 0) {
    console.log(props.sounds,"sounds")
    for (const item of props.sounds) {
      for (const obj of soundList.value) {
        if (obj.soundVal == item.substring(1,2)) {
          obj.active = true
        }
      }
    }
  }
}, {deep: true})
// watchEffect(()=> {
//   console.log(props)
// })
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