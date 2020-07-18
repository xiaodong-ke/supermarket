import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "./assets/css/base.css"

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'

Vue.use(ElementUI);

Vue.prototype.$bus = new Vue()

axios.defaults.baseURL = 'http://106.55.151.225:8888/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
})

Vue.prototype.$http = axios

router.afterEach((to, from) => {
  let bodySrcollTop = document.body.scrollTop
  // console.log(bodySrcollTop);
  if (bodySrcollTop !== 0) {
    document.body.scrollTop = 0
    return
  }
  let docSrcollTop = document.documentElement.scrollTop
  // console.log(docSrcollTop);
  if (docSrcollTop !== 0) {
    document.documentElement.scrollTop = docSrcollTop;
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
