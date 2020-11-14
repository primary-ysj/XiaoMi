export default {
    saveUserName(state, username) {
        state.username = username
            // window.localStorage.set()
        window.localStorage.setItem('username', username)
    },
    saveCartCount(state, count) {
        // context.commit('saveCartCount', count) 
        state.cartCount = count
    }
}