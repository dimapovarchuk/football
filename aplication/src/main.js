import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import locale from './locale'
Vue.config.productionTip = false
Vue.prototype.$locale = locale
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
