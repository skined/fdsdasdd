import AjaxRequest from '../libs/axios.js'
import axios from 'axios'
export let loginApi = (user, pass) => {
  console.log(1234)
  return AjaxRequest.request({
    url: '/login',
    method: 'post',
    data: {
      user,
      pass
    }
  })
}
//验证是否登陆得请求
export let isloginApi = () =>
  AjaxRequest.request({
    url: '/validate',
    method: 'post'
  })
