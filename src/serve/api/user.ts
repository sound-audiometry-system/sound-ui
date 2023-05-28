import http from '../httpClient'
import { PageData } from './types/request'
import { UserInfo } from './types/dataType'

class UserApi {
    /**
   * 根据用户id获取用户信息
   * @param params 查询参数
   * @returns
   */
  getUserInfo(data: object) {
    return http.request<UserInfo>({
      url: '/hy_saas_client_gateway/ym_fha/hearing_service/api/patient/info',
      method: 'POST',
      data,
      // headers: {
      //   Accept: "application/json, text/plain, */*",
      //   "Content-Type": "application/json",
      //   "X-Requested-With": "XMLHttpRequest",
      // },
    })
  }
  /**
   * 根据用户id获取用户配置信息
   * @param data 查询参数
   * @returns
   */
  getUserPatient(data: object) {
    return http.request<UserInfo>({
      url: '/hy_saas_client_gateway/ym_fha/hearing_service/api/patient/testList',
      method: 'POST',
      data,
    })
  }
}

class AuditionApi {
  /** 
   * 听力测试开始
   * @param data 传递参数
   * @returns
  */
  startTest(data: object) {
    return http.request({
      url: '/native/play',
      method: 'POST',
      data,
    })
  }

  /** 
   * 听力测试结束
   * @param 无参数
   * @returns
  */
  stopTest() {
    return http.request({
      url: '/native/stop',
      method: 'POST',
    })
  }
}

export const userApi = new UserApi()
export const auditionApi = new AuditionApi()
 
// export default {
//   userApi,
//   auditionApi
// }


// import userApi from '@/api/user'

// const queryData = async () => {
//     const res = await userApi.getPageData(params)
// }