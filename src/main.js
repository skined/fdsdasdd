import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import VueResource from 'vue-resource'
import AjaxRequest from './libs/axios'
AjaxRequest.request({
  url: '/slider'
}).then(data => {
  console.log(data, 'promise')
})
Vue.use(VueResource)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
