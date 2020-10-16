import Vue from 'vue'
import router from './router'
import axios from 'axios'
import App from './App.vue'
import env from './env'


Vue.config.productionTip = false
Vue.prototype.$axios = axios

//代理方式设置axios的基础配置
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000

//jsonp cors方式获取基地址
axios.defaults.baseURL = env.baseURL

//响应拦截
axios.interceptors.response.use(function(response) {
    let res = response.data;
    if (res.status == 0) {
        return res.data
    } else if (res.status == 10) {
        window.location.href = '/#/login'
    } else {
        alert(res.msg)
    }
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')