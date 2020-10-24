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
    this.getUser()
    this.getCartCount()
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
