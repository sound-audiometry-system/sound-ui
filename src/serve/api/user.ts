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
      url: '/hearing_service/api/patient/info',
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
      url: '/hearing_service/api/patient/testList',
      method: 'POST',
      data,
    })
  }


}

const userApi = new UserApi()
 
export default userApi


// import userApi from '@/api/user'

// const queryData = async () => {
//     const res = await userApi.getPageData(params)
// }