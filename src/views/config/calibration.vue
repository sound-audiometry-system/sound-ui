<!-- 测试声音阈校准 -->
<template>
  <div class="main">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-input
          v-model="value"
          class="w-50 m-2"
          placeholder="搜索"
          :prefix-icon="Search"
        />
      </el-col>
      <el-col :span="8">
        <div class="mb-2 flex items-center text-sm">
          <el-radio-group v-model="radio1" class="ml-4">
            <el-radio label="1" size="large">仅显示已校准</el-radio>
            <el-radio label="2" size="large">仅显示未校准</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-table :height="520" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="测试名称" width="180" />
      <el-table-column prop="name" label="测试模式" width="180" />
      <el-table-column prop="address" label="测试分类" />
      <el-table-column prop="address" label="状态">
        <template #default="scope">
          <span class="status-box1 status">已校准</span>
          <!-- <span class="status-box2 status">未校准</span> -->
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
    <div style="display: flex;justify-content: flex-end;padding-right: 20px;">
        <el-pagination style="margin-top: 16px;" background layout="prev, pager, next, jumper" :total="1000" @current-change="currentChange" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
const value = ref("");
const radio1 = ref("1");
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
const emit = defineEmits([
  "handleCalibration",
]);
const handleCalibration = (index, row)=> {
  emit("handleCalibration", index, row);
}
const currentChange = ()=> {

}
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
    background: #E4E6C8;
border: 1px solid #BFC554;
color: #686E00;
  }
  .status-box2 {
    background: #fff0de;
    border: 1px solid #e4bf60;
    color: #D36600;
  }
}
</style>