<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="sound-form">
        <div style="float: left;">
          给声方式<br />
          <el-select v-model="value" clearable placeholder="Select" style="width: 200px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div style="float: right;">
          测试模式<br />
          <el-select v-model="value" clearable placeholder="Select" style="width: 200px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <div class="sound-buttn" style="margin-top: 80px;">
        <el-row class="mb-4">
          <el-button size="small">开始</el-button>
          <el-button size="small">暂停</el-button>
          <el-button size="small">保存</el-button>
          <el-button size="small">保存并生成记录</el-button>
          <el-button type="info" size="small">重置</el-button>
        </el-row>
      </div>
      <div class="sound-slider" style="margin-block: 20px;">
        <div style="margin-block: 20px; background-color: #33343426;">
          言语声信号(分贝dB)<br>
          <el-slider v-model="dbValue" :step="12" show-stops />
        </div>
        <div style="margin-block: 20px; background-color: #33343426;">
          环境声信号(分贝dB)<br>
          <el-slider v-model="dbValue" :step="12" show-stops />
        </div>
      </div>
      <div class="sound-buttn">55</div>
    </el-col>
    <el-col :span="10">
      <div class="sound-form">231</div>
      <div class="sound-buttn">11</div>
      <div class="sound-buttn">22</div>
      <div class="sound-buttn">55</div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'

const dbValue = ref([0, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80])

const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>