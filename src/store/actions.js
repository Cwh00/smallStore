import { getCarts } from 'network/shopingCart';
const actions = {
    updateCartCount({ commit }) {
        getCarts().then(res=>{
            let num = res.data.length || 0
            commit('modifyCartCount',{num})
        })
    }
}

export default actions;