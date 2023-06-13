import  type {MutationTree,ActionTree,GetterTree}  from 'vuex'
import  type  {State}  from '../index'
export  interface UsersState{
    testData:Array<any>,
    imitateData: any,
}


let state:UsersState = {
    testData:[],
    imitateData: {}

};
//<UsersState,State>//参数1是为了访问当前模块下的state的变量  参数2是引入的主模块下的
//不知道类型注解几个参数看上图
let getters:GetterTree<UsersState,State> = {
    // dobulecount:state=>state.age*2
    // 或者
    // dobulecount(state){
    //     return state.age*2
    // }
    getTestData: state=> state.testData,
    getImitateData: state=> state.imitateData
};
let mutations:MutationTree<UsersState> = {
    setTestData(state, testData){
        state.testData = testData
    },
    setImitateData(state, imitateData){
        state.imitateData = imitateData
    }
};
let actions:ActionTree<UsersState,State> = {};
export default {
  namespace: true,//开始模块命名空间
  state,
  getters,
  mutations,
  actions,
};
