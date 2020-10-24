export default {
    saveUserName(state, username) {
        state.username = username
    },
    saveCartCount(state, count) {
        // context.commit('saveCartCount', count) 
        state.cartCount = count
    }
}