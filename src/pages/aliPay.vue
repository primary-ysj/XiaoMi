<template>
  <div>
    <!-- 顶部组件 -->
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <div v-html="content"></div>
    <loading></loading>
  </div>
</template>

<script>
export default {
  name: 'ali-pay',
  data() {
    return {
      orderId: this.$route.query.orderId,
      content: '',
    }
  },
  created() {
    this.getForm()
  },
  methods: {
    getForm() {
      this.$axios
        .post('/pay', {
          orderId: this.orderId,
          orderName: 'Vue高仿小米商城',
          amount: 0.01, //单位元
          payType: 1, //1支付宝，2微信
        })
        .then(res => {
          console.log(res)
          this.content = res.content
          setTimeout(() => {
            document.forms[0].submit()
          }, 100)
          // console.log(123)
        })
    },
  },
}
</script>

<style></style>
