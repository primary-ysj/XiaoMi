<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  mounted() {
    if (this.$cookie.get('userId')) {
      let name = window.localStorage.getItem('username')
      // console.log(name)
      if (name) {
        this.$store.dispatch('saveUserName', name)
      } else {
        this.getUser()
      }
      this.getCartCount()
    }
  },
  methods: {
    getUser() {
      this.$axios
        .get('/user')
        .then((res = {}) => {
          // console.log(res)
          //保存vuex
          this.$store.dispatch('saveUserName', res.username)
        })
        .catch(res => {
          console.log(res)
          localStorage
        })
    },
    getCartCount() {
      this.$axios
        .get('/carts/products/sum')
        .then((res = 0) => {
          // console.log(res)
          //保存vuex
          this.$store.dispatch('saveCartCount', res)
        })
        .catch(res => {
          console.log(res)
        })
    },
  },
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
</style>
