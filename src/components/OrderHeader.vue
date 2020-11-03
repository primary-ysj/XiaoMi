<template>
  <div class="order-header">
    <div class="container">
      <!-- logo -->
      <div class="header-logo">
        <a href="/#/index"></a>
      </div>
      <div class="title">
        <h2>
          {{ title }}
        </h2>
        <slot name="tip"></slot>
      </div>
      <div class="username">
        <a href="javascript:;">{{ username }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order-header',
  props: {
    title: String,
  },
  data() {
    return {}
  },
  computed: {
    username() {
      return this.$store.state.username
    },
  },
}
</script>

<style lang="scss">
.order-header {
  border-bottom: 2px solid #ff6600;
  .container {
    height: 112px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-logo {
      overflow: hidden;
    }
    .title {
      width: 1000px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      h2 {
        font-size: 28px;
        line-height: 61px;
        margin-right: 16px;
      }
      span {
        font-size: 12px;
        color: #999999;
      }
    }
    .username {
      a {
        color: #666666;
      }
    }
  }
}
</style>
