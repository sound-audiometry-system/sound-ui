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
          <div @click="handleClkItem(index)" v-for="(item, index) in soundList" :key="index" :class="getActive(item, index)" :style="getBgCor(item, index)">
            {{ index }}
          </div>
        </div>
        <div style="display: flex; flex-direction: column;align-items: flex-end;">
          <div style="display: flex; align-items: center;">
            <div style="width: 16px; height: 16px; border-radius: 50%; background-color: #B0B912"></div>
            <label style="width: 80px; margin-left: 5px;">信号声</label>
          </div>
          <div style="display: flex; align-items: center;">
            <div style="width: 16px; height: 16px; border-radius: 50%; background-color: #FFBE26"></div>
            <label style="width: 80px; margin-left: 5px;">环境声</label>
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
import { useRoute } from 'vue-router'
const route = useRoute();
// background: linear-gradient(to right, #ffbd26 50%, #b0b912 50%);
const emit = defineEmits(['handleClkItem'])
const isCheck = ref(false)
const bgIndex = props.bgIndex
if (route.name === 'checkConfig') {
  isCheck.value = true
}
const soundList = ref([
  { soundVal: '0', active: false, },
  { soundVal: '1', active: false, },
  { soundVal: '2', active: false, },
  { soundVal: '3', active: false, },
  { soundVal: '4', active: false, },
  { soundVal: '5', active: false, },
  { soundVal: '6', active: false, },
  { soundVal: '7', active: false, },
  { soundVal: '8', active: false, },
  { soundVal: '9', active: false, },
  { soundVal: '10', active: false, },
  { soundVal: '11', active: false, },
])
const getActive = (item, index) => {

  let clz = {
    'dot-control': true,
    'error-active': item.active && index <= 4,
    'success-active': item.active && index > 5 && index <= 10,
  };
  // 
  // 'config-active3':props.deviceConfig && props.deviceConfig.length != 0 && props.deviceConfig[index]?.signalCalibrated && props.deviceConfig[index]?.environmentalCalibrated,
  // 'config-active1':props.deviceConfig && props.deviceConfig.length != 0 && props.deviceConfig[index]?.signalCalibrated,
  // 'config-active2':props.deviceConfig && props.deviceConfig.length != 0 && props.deviceConfig[index]?.environmentalCalibrated || props.soundIndex == index
  let si = parseInt(props.soundIndex / 2)
  let bi = parseInt(props.bgIndex / 2)
  if (si == index && bi == index) {//两者相同，则混合样式
    clz['config-active3'] = true
  } else if (si == index) {
    clz['config-active2'] = true
  } else if (bi == index) {
    clz['config-active1'] = true
  }
  if (props.deviceConfig && props.deviceConfig.length != 0) {
    if (props.deviceConfig[index]?.signalCalibrated && props.deviceConfig[index]?.environmentalCalibrated) {
      clz['config-active3'] = true
    } else if (props.deviceConfig[index]?.signalCalibrated) {
      clz['config-active2'] = true
    } else if (props.deviceConfig[index]?.environmentalCalibrated) {
      clz['config-active1'] = true
    }
  }
  return clz;
}
const getBgCor = (item, index) => {
  const obj = {
    backgroundColor: ''
  }
  if (index === 0 || index === 6) {
    obj['backgroundColor'] = '#fff'
    obj['color'] = '#000'
  }
  if (isCheck && index !== 0 && index !== 6) {
    soundList.value.forEach((item, itemIndex)=> {
      if (item.active && index === itemIndex) {
        return index < 6 ? obj['backgroundColor'] = 'red' : obj['backgroundColor'] ='configActive4'
      }
    })
    // if (index) {

    // }
  }
  return obj
}

type Props = {
  sounds: any;
  deviceConfig: any;
  soundIndex: Number;
  bgIndex: Number;
};
const props = defineProps<Props>();
watch(() => props.sounds, (newValue, oldValue) => {
  if (props.sounds && props.sounds.length != 0) {
    for (const item of props.sounds) {
      for (const obj of soundList.value) {
        if (obj.soundVal == item.substring(1, 2)) {
          obj.active = true
        }
      }
    }
  }
}, { deep: true })

onMounted(async () => {

})
const handleClkItem = (index: number) => {
  emit('handleClkItem', index)
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>