import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible';

// import * as fundebug from "fundebug-javascript";
// import fundebugVue from "fundebug-vue";
// fundebug.apikey = "d1b7c9a69affd2d5020110cb13df61376c60baee8734a9eaa71ebb854cc0e7a3"
// fundebugVue(fundebug, Vue);


import {Button,Tabbar,TabbarItem,Icon ,NavBar } from 'vant'
Vue.use(Button).use(Tabbar).use(TabbarItem).use(Icon).use(NavBar)

// Dialog({ message: '提示' });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
