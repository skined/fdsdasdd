import axios from 'axios'
import util from './local'
import store from '../store'
class AjaxRequest {
  constructor() {
    this.baseURL =
      process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/'
    this.timeout = 3000
    this.queue = {} //他是用来存放请求队列的
  }
  merge(options) {
    return { baseURL: this.baseURL, timeout: this.timeout, ...options }
  }
  setInterceptors(instance, url) {
    //设置请求拦截器
    instance.interceptors.request.use(
      config => {
        this.queue[url] = url
        if (Object.keys(this.queue).length) {
          console.log('显示loading')
          store.commit('showloading')
        }
        config.headers.authorization = util.getlocal('token')
        return config
      },
      err => {
        Promise.reject(err)
      }
    )

    //设置响应式拦截
    instance.interceptors.response.use(
      res => {
        delete this.queue[url]
        if (Object.keys(this.queue).length == 0) {
          //用定时器模拟一个一秒后响应完成
          setTimeout(() => {
            store.commit('hideloading')
            console.log('隐藏loding')
          }, 1000)
        }
        return res.data
      },
      err => {
        Promise.reject(err)
      }
    )
  }
  request(options) {
    const instance = axios.create()
    //把传进来的参数进行合并
    const config = this.merge(options)
    //设置拦截器
    console.log(config)
    this.setInterceptors(instance, options.url)
    return instance(config)
  }
}
export default new AjaxRequest()
