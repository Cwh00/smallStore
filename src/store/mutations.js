const mutations = {
    setIsLogin(state,payload) {
        state.user.isLogin = payload
    },
    modifyCartCount(state,payload) {
        state.cartCount = payload.num
    }
}


export default mutations;