<template>
  <div class="product-params" :class="{ is_flxed: isFixed }">
    <div class="container">
      <div class="left">{{ title }}</div>
      <div class="right">
        <a href="javascript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a class="usereva" href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'productparam',
  props: ['title'],
  data() {
    return {
      isFixed: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.initHeight)
  },
  methods: {
    initHeight() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      this.isFixed = scrollTop > 152 ? true : false
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.initHeight, false)
  },
}
</script>

<style lang="scss">
.product-params {
  height: 70px;
  box-sizing: border-box;
  border-top: 1px solid #e5e5e5;
  background-color: #fff;
  z-index: 15;
  &.is_flxed {
    position: fixed;
    top: 0;
    width: 100%;
    box-shadow: 0 5px 5px #ccc;
  }
  .container {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      font-size: 18px;
      color: #333333;
      line-height: 60px;
      font-weight: bold;
    }
    .right {
      a {
        color: #666666;
        font-size: 14px;
        font-weight: bold;
      }
      .usereva {
        margin-right: 10px;
      }
      span {
        margin: 0 10px;
      }
      .buy {
        display: inline-block;
        width: 110px;
        height: 30px;
        cursor: pointer;
        background-color: #ff7301;
        color: #fff;
        line-height: 30px;
        text-align: center;
      }
    }
  }
}
</style>
