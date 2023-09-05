
<!--  -->
<template>
  <el-container>
    <el-header></el-header>
    <el-main
      style="display: flex; justify-content: center; background-color: #f2f3f5"
    >
      <div
        style="
          width: 50%;
          height: 100%;
          overflow-y: auto;
          background-color: white;
          flex-direction: column;
        "
      >
        <div style="display: flex; margin: 3% 3% 0 3%; flex-direction: column">
          <el-form
            :model="form"
            ref="form"
            label-width="200px"
            class="form"
            @submit.native.prevent="() => searchImitate"
          >
            <el-form-item>
              <el-input
                v-model="imitateName"
                placeholder="请输入"
                class="input-with-select"
                clearable
                @clear="userSearchData = []"
                @blur="searchImitate"
              >
                <template #prepend>
                  <el-button @click="searchImitate" :icon="Search" />
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <div
            class="userItem"
            v-for="(item, idx) in testData"
            :key="idx"
            v-if="testData.length > 0"
          >
            <div
              style="
                display: flex;
                align-items: center;
                margin: 2px 0px 2px 15px;
                width: 500px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: large; font-weight: bold
              "
              :title="item.name"
            >{{ item.name }}
            </div>
            <el-button
              type="success"
              style="text-align: end; margin-right: 2%"
              @click="toTest(item)"
              >开始模拟</el-button
            >
          </div>
          <el-empty description="暂无数据" v-else />
        </div>
      </div>
    </el-main>
    <footer-tab></footer-tab>
    <!-- <el-footer>
      <div
        class="footer-div"
        :class="{ activeColor: active == 1 }"
        @click="chooseItem(1)"
      >
        <Tickets class="icon" color="white" />
        <text class="font">听力测试</text>
      </div>
      <div
        class="footer-div"
        :class="{ activeColor: active == 2 }"
        @click="chooseItem(2)"
      >
        <Setting class="icon" color="white" />
        <text class="font">配置检查</text>
      </div>
      <div
        class="footer-div"
        :class="{ activeColor: active == 3 }"
        @click="chooseItem(3)"
      >
        <Monitor class="icon" color="white" />
        <text class="font">言语实景模拟</text>
      </div>
    </el-footer> -->
  </el-container>
</template>
<script setup lang="ts" >
import { ref, reactive, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { imitateApi } from "@/serve/api/user";
import { useStore } from "vuex";
import footerTab from "../../components/footerTab.vue";
// import { useStore } from '../../store'
let store = useStore();
// console.log()
// const queryData = async () => {
//     const res = await userApi.getPageData(params)
// }
const router = useRouter();
const active = ref(1);
let isStart = false;
const form = reactive({});
//模拟方案搜索
const imitateName = ref("");

//测试列表
const testData = ref([]);
const getListTestMode = async (name: string = "") => {
  const res = await imitateApi.getListTestMode({ name: name });
  if (res.code == 0) {
    testData.value = res.data;
  }
};
//测试结果
const testResult = ref();

//搜索模拟方案
const searchImitate = () => {
  //后续为远程搜索用户信息
  getListTestMode(imitateName.value);
};
const handleNav = () => {
  // chooseTypeVisble.value = false;
  // const testArr = testData.value.filter(item=> item.id == testResult.value)
  // store.commit("setTestData", testArr)
  // // if (testResult.value == 1) {
  //   router.push({ path: "/speaker" });
  // }
};
// 加载测试数据
// loadTestData()
// getUserInfo();

//跳转到测试页面
const toTest = (info) => {
  // chooseTypeVisble.value = true;
  // store.commit("setImitateData", info);
  // console.log(info)
  // console.log([info])
  store.commit("setTestData", [info]);
  // router.push("/imitate-plan");
  router.push({ path: "/speaker", query: { type: "2" } });
};

onMounted(() => {
  // 调用模拟列表
  // console.log(22222222)
  getListTestMode();
});
</script>
<style lang="scss" scoped>
.font {
  font-size: small;
  font-weight: bold;
  color: white;
}

.userItem {
  display: flex;
  margin-top: 2%;
  background-color: #f2f3f5;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.icon {
  width: 1.5em;
  height: 1.5em;
}

.activeColor {
  background-color: #c7d8d4;

  .icon {
    color: rgb(30, 25, 25);
  }

  .font {
    color: rgb(30, 25, 25);
  }
}

.el-container {
  width: 1920px;
  height: 967px;
  margin: 0 auto;
  margin-top: 50px;
  .el-header {
    background-color: #208571;
  }

  .el-footer {
    background-color: rgb(30, 25, 25);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer-div {
    width: 10%;
    height: 100%;
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
:deep(.el-form-item__content) {
  margin-left: 0 !important;
}
</style>