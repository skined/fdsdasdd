1.vuex 里面写登陆请求 token 存在本地存储
1.npm install iview --save 2.请求没完成之前有遮罩 请求完成之后隐藏 3.每次都会传入一个 url.发送请求时我们用队列存储这个 url 每次响应回来我们删除 url 一次 url 不在有了表示所有请求结束了
