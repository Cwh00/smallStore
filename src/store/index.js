import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'
const state = {
  user: {
    isLogin: window.localStorage.getItem('token')? true: false
  },
  cartCount: 0
}
export default createStore({
  state,
  mutations,
  actions,
  modules
})
