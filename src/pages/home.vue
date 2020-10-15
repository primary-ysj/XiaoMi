<template>
  <div>
    <nav-header></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
//引入通用组件
import NavFooter from '../components/NavFooter'
import NavHeader from '../components/NavHeader'
// import Vue from 'vue'
// Vue.component('nav-footer', NavFooter)
// Vue.component('nav-header', NavHeader)
export default {
  name: 'home',
  components: {
    NavFooter,
    NavHeader,
  },
}
</script>

<style></style>
