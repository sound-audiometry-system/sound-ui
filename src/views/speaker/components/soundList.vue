<template>
  <div style="width: 100%;font-size: 14px;height: 460px;overflow-y: auto;">
      <div v-for="(item, index) in props.sounds" :key="index"  :style="{width: '100%',height: '90px',border: '1px solid #d5d5d5',padding: '10px','margin-bottom': '20px'}" @mouseenter="item.move = true" @mouseleave="item.move = false">
          <el-row style="align-items: center;" :gutter="10">
              <el-col style="margin-top: 4px;" span="4"><img src="../../../assets/yl.png" alt="" width="24"></el-col>
              <el-col style="display: flex;align-items: center;" span="10">
                  <span :class="getActive(item)" style="display: inline-block;width: 30px;height: 30px;line-height: 30px;border-radius:50%;margin-right: 8px;color: #fff;text-align: center;font-size: 16px;">{{item?.index >=0 ? parseInt(item.index / 2) : parseInt(item?.bgIndex / 2) }}</span>
                  <span style="font-size: 18px;font-weight: bold;">{{item?.index >=0 ? parseInt(item.index / 2) : parseInt(item?.bgIndex / 2) }}号音箱</span>
              </el-col>
              <el-col style="margin-left: 14px;display: flex;align-items: center;" span="10">
                  <span v-if="item.bgVolume && item.volume || item.bgVolume === 0 && item.volume === 0" style="display: inline-block;width: 42px;height: 24px;line-height: 24px;border: 1px solid #ccc;text-align: center;">{{ item.bgVolume ? item.volume + ',' + item.bgVolume : item.volume }}</span><span v-else-if="item.volume || item.volume === 0" style="display: inline-block;width: 42px;height: 24px;line-height: 24px;border: 1px solid #ccc;text-align: center;">{{ item.volume }}</span><span v-else-if="item.bgVolume || item.bgVolume === 0 " style="display: inline-block;width: 42px;height: 24px;line-height: 24px;border: 1px solid #ccc;text-align: center;">{{ item.bgVolume }}</span><span style="font-weight: bold;">（分贝db）</span><span  v-if="index===0" style="margin-left: 10px;"><img width="20" src="../../../assets/zd.png" alt=""></span>
              </el-col>
              <el-col style="margin-top:10px" span="24">
                  当前播放: <span v-if="item.name && item.bgName" style="color: #4C71C5;font-weight: bold;">{{ item.bgName ? item?.name + ',' +item.bgName : item.name }}</span>
                  <span v-else-if="item.name">{{ item.name }}</span>
                  <span v-else>{{ item.bgName }}</span>
              </el-col>
          </el-row>
      </div>
      <el-empty style="margin: auto;" description="暂无数据" v-if="!sounds || sounds.length === 0" :image-size="100"></el-empty>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
type Props = {
  bgIndex: any;
  sounds:any;
};
const props = defineProps<Props>();
const bgIndex = props.bgIndex
const soundList = ref([
{ soundVal: '00', active: false, move: false },
{ soundVal: '01', active: false, move: false },
{ soundVal: '02', active: false, move: false },
{ soundVal: '03', active: false, move: false },
{ soundVal: '04', active: false, move: false },
{ soundVal: '05', active: false, move: false },
{ soundVal: '06', active: false, move: false },
{ soundVal: '07', active: false, move: false },
{ soundVal: '08', active: false, move: false },
{ soundVal: '09', active: false, move: false },
{ soundVal: '10', active: false, move: false },
{ soundVal: '11', active: false, move: false },
])
const getActive = (item) => {
  let clz = {}
  let isSingl = false
  let bi = -1
//   let isSingl =  props.sounds.filter(x=>x.index == index * 2 + 1)
// if(isSingl)
if(item?.index >= 0) isSingl = true
if(item?.bgIndex >= 0) {
  bi = parseInt(item?.bgIndex / 2)
}
//   let bi = parseInt(item.bgIndex / 2)
if (item?.index >=0 && isSingl && bi == parseInt(item.index / 2)) {//两者相同，则混合样式
  clz['config-active3'] = true
} else if (isSingl) {
  clz['config-active2'] = true
} else if (bi >=0) {
  clz['config-active1'] = true
}
return clz;
}
</script>

<style lang="scss" scoped>
//环境声
.config-active1 {
color: #fff;
background-color: #FFBE26;
}
//信号声
.config-active2 {
color: #fff;
background-color: #B0B912;
}
//混合声
.config-active3 {
color: #fff;
background: linear-gradient(to right, #b0b912 50%, #FFBD26 0);
}
</style>