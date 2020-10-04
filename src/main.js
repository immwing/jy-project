import Vue from 'vue'
import App from './App.vue'

import router from './router/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
Vue.use(ElementUI)

import VueFilterDateFormat from 'vue-filter-date-format';
Vue.use(VueFilterDateFormat);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
