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
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute();
// background: linear-gradient(to right, #ffbd26 50%, #b0b912 50%);
const emit = defineEmits(['handleClkItem'])
const isCheck = ref(false)
const bgIndex = props.bgIndex
console.info(bgIndex,"22222222222222222222222222")
if (route.name === 'checkConfig') {
  isCheck.value = true
}
const soundList = ref([
  { soundVal: '00', active: false, },
  { soundVal: '01', active: false, },
  { soundVal: '02', active: false, },
  { soundVal: '03', active: false, },
  { soundVal: '04', active: false, },
  { soundVal: '05', active: false, },
  { soundVal: '06', active: false, },
  { soundVal: '07', active: false, },
  { soundVal: '08', active: false, },
  { soundVal: '09', active: false, },
  { soundVal: '10', active: false, },
  { soundVal: '11', active: false, },
])
const getActive = (item, index) => {
  let clz = {
    'dot-control': true,
    'error-active': item.active && index <= 4,
    'success-active': item.active && index > 5 && index <= 10,
  };
  if (props.deviceConfig && props.deviceConfig.length != 0) {
    if (props.deviceConfig[index]?.signalCalibrated && props.deviceConfig[index]?.environmentalCalibrated) {
      clz['config-active3'] = true
    } else if (props.deviceConfig[index]?.signalCalibrated) {
      clz['config-active2'] = true
    } else if (props.deviceConfig[index]?.environmentalCalibrated) {
      clz['config-active1'] = true
    }
    return clz
  }
  if(props.soundIndex == undefined){
    return clz
  }
  // 
  // 'config-active3':props.deviceConfig && props.deviceConfig.length != 0 && props.deviceConfig[index]?.signalCalibrated && props.deviceConfig[index]?.environmentalCalibrated,
  // 'config-active1':props.deviceConfig && props.deviceConfig.length != 0 && props.deviceConfig[index]?.signalCalibrated,
  // 'config-active2':props.deviceConfig && props.deviceConfig.length != 0 && props.deviceConfig[index]?.environmentalCalibrated || props.soundIndex == index
  let isSingl =  props.soundIndex.some(x=>x == index * 2 + 1)
  let bi = parseInt(props.bgIndex / 2)
  console.info(bi,"11111111111111111111111")
  if (isSingl && bi == index) {//两者相同，则混合样式
    clz['config-active3'] = true
  } else if (isSingl) {
    clz['config-active2'] = true
  } else if (bi == index) {
    clz['config-active1'] = true
  }
  return clz;
}
const getBgCor = (item, index) => {
  const obj = {
    backgroundColor: ''
  }
  // if (index === 0 || index === 6) {
  //   obj['backgroundColor'] = '#fff'
  //   obj['color'] = '#000'
  // }
  if (isCheck) {
    soundList.value.forEach((item, itemIndex)=> {
      if (item.active && index === itemIndex) {
        if (index === 0 || index === 6) {
          obj['color'] = '#000'
          obj['backgroundColor'] = '#fff'
        } else {
          index < 6 ? obj['backgroundColor'] = 'red' : obj['backgroundColor'] ='#3357C4'
        }
        // return index < 6 && index !== 0 ? obj['backgroundColor'] = 'red' : index === 6 || index === 0 ? obj['backgroundColor'] = '#fff' : obj['backgroundColor'] ='configActive4'
      }
    })
  }
  return obj
}

type Props = {
  sounds: any;
  deviceConfig: any;
  soundIndex: Number [];
  bgIndex: Number;
};
const props = defineProps<Props>();
watch(() => props.sounds, (newValue, oldValue) => {
  if (props.sounds && props.sounds.length != 0) {
    for (const item of props.sounds) {
      for (const obj of soundList.value) {
        if (item.active && obj.soundVal == item.id) {
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