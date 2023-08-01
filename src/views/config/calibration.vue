<!-- 测试声音阈校准 -->
<template>
  <div v-loading="loading" class="main">
    <el-row :gutter="20">
      <el-col :span="23">
        <el-input
          v-model="value"
          class="w-50 m-2"
          placeholder="搜索"
          :prefix-icon="Search"
        />
      </el-col>
      <!-- <el-col :span="8">
        <div class="mb-2 flex items-center text-sm">
          <el-radio-group v-model="radio1" class="ml-4">
            <el-radio label="1" size="large">仅显示已校准</el-radio>
            <el-radio label="2" size="large">仅显示未校准</el-radio>
          </el-radio-group>
        </div>
      </el-col> -->
    </el-row>
    <el-table :height="770" :data="tableData" stripe style="width: 100%" empty-text="暂无数据">
      <el-table-column prop="name" label="测试名称" min-width="180" />
      <el-table-column prop="level1EntryName" label="测试模式" min-width="180" />
      <el-table-column prop="level2EntryName" label="测试分类" />
      <el-table-column  label="状态">
        <template #default="scope">
          <span v-if="scope.row.calibrated" class="status-box1 status"
            >已校准</span
          >
          <span v-if="!scope.row.calibrated" class="status-box2 status"
            >未校准</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="text"
            @click="handleCalibration(scope.$index, scope.row)"
            >点击校准</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;justify-content: flex-end;padding-right: 20px;position: absolute;bottom: 10px;right: 10px;">
      <!-- <el-pagination background layout="prev, pager, next" :total="1000" /> -->
      <el-pagination style="margin-top: 16px;" background layout="prev, pager, next, jumper" 
      :page-size="queryForm.size" :current-page="queryForm.current" :total="queryForm.total" @current-change="currentChange" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
const value = ref("");
const radio1 = ref("1");
let loading = ref(false);
import { imitateApi } from "@/serve/api/user";
let tableData = ref([]);

let tableDatas = []
const queryForm = reactive({});
const currentChange = (current:number) => {
  queryForm.current = current
  getListTestMode()
};
const getListTestMode = async (name: string = "") => {
  loading.value = true;
  const res = await imitateApi.getListThresholdMode({name: name, ...queryForm });
  console.log(res);
  loading.value = false;
  if (res.code == 0) {
    tableData.value = res.data.records;
    tableDatas = res.data;
    queryForm.total = res.data.total
    queryForm.current = res.data.current
    queryForm.size = res.data.size
  }
};
watch(value, (newValue, oldValue)=> {
  if(newValue) {
    tableData.value = tableData.value.filter(item=> item.name.includes(newValue))
  } else {
    tableData.value = tableDatas
  }
})
onMounted(() => {
  getListTestMode();
});
</script>
<style scoped lang="scss">
.main {
  width: 100%;
  background-color: #fff;
  margin: 20px 20px 0px 20px;
  .status {
    display: inline-block;
    width: 56px;
    height: 24px;
    line-height: 24px;
    border-radius: 1px;
    text-align: center;
  }
  .status-box1 {
    background: #e4e6c8;
    border: 1px solid #bfc554;
    color: #686e00;
  }
  .status-box2 {
    background: #fff0de;
    border: 1px solid #e4bf60;
    color: #d36600;
  }
}
</style>