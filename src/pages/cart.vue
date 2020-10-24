<template>
  <div>
    <order-header></order-header>
    cart
    <server-bar></server-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader'
import NavFooter from '../components/NavFooter'

export default {
  name: 'cart',
  components: {
    OrderHeader,
    NavFooter,
  },
}
</script>

<style></style>
