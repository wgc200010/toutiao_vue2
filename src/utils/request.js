import theAxios from 'axios'
import router from '@/router'
import { Notify } from 'vant'
import { getToken } from '@/utils/token.js'
// 新建一个新的axios实例
const axios = theAxios.create({
  baseURL: 'https://toutiao.itheima.net', // 基地址
  timeOut: 2000
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    // 如果发起请求，但提交的数据里没有token，就在此处为他加上token,
    // 所以不需要在每个API里带headers
    config.headers.Authorization = `Bearer ${getToken()}`
    // console.log(config)
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.dir(error)
  if (error.response.status === 401) {
    Notify({ type: 'warning', message: '身份过期，重新登陆' })
    router.replace('/login')
  }
  return Promise.reject(error)
})

// 导出自定义函数, 参数对象解构赋值,默认get
export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({
    url: url,
    method: method,
    params: params,
    data: data,
    headers: headers
  })
}
