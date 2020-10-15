<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import storage from './storage'
export default {
  name: 'App',
  components: {},
  mounted() {
    storage.setItem('a', { 'a.name': 'ss' })
    console.log(storage.getItem('a.name', 'a'))
    storage.clear('a.name', 'a')
    console.log(storage.getStorage())
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
