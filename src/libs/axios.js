import axios from 'axios'
//process.env_NODE_ENV环境变量 生产环境 production 开发环境 development
class AjaxRequest {
  constructor() {
    //定义一些公共配置
    this.baseURL =
      process.env.NODE_ENV == 'development' ? 'http://132.232.89.22:3000' : '/'
    this.timeout = 3000
    //全局loading 做一个队列
    this.queue = {}
  }
  setInterceptors(instance) {
    //设置请求拦截器
    instance.interceptors.request.use(
      config => {
        if (!this.queue['url']) {
          //全局loading显示
        }
        this.queue['url'] = config.url
        //携带token
        config.headers['authorization'] = 'jkdlj'
        return config
      },
      err => {
        Promise.reject(err)
      }
    )
    //设置响应拦截器
    instance.interceptors.response.use(
      res => {
        delete this.queue['url']
        if (!this.queue['url']) {
          //全局loading隐藏
        }
        return res.data
      },
      err => {
        Promise.reject(err)
      }
    )
  }
  request(options) {
    //官方文档提供 用axios.create创建一个axios实例
    let instance = axios.create()
    //合并传进来的参数和默认参数
    //定义一个合并参数的方法
    let config = this.merge(options)
    //拦截器
    this.setInterceptors(instance)
    return instance(config)
  }
  merge(options) {
    //合并参数
    return { baseURL: this.baseURL, timeout: this.timeout, ...options }
  }
}
export default new AjaxRequest()
// AjaxRequest.request({
//     url:'',
//     methods:''
// })
// Accept :application/json,
