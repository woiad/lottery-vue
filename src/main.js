// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router/index'
import {fetch, post} from './util/http'
import {DatePicker} from 'element-ui'

Vue.config.productionTip = false
Vue.prototype.$fetch = fetch
Vue.prototype.$post = post
Vue.use(DatePicker)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
