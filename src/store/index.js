import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import posi from './modules/position'

Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {
    home:home,
    posi:posi
  }
})
