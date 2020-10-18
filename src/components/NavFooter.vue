<template>
  <div class="nav-footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="" />
    </div>
    <div class="footer-title">小米商城</div>
    <div class="footer-link">
      <a href="javascript:;">小米商城</a><span>|</span>
      <a href="javascript:;">米家</a><span>|</span>
      <a href="javascript:;">小米手机</a><span>|</span>
      <a href="javascript:;">小米电视</a>
    </div>
    <div class="copy">
      Copyright ©2020 <span class="past">mi.futurefe.com</span> All Rights
      Reserved.
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-footer',
}
</script>

<style lang="scss">
@import '../assets/scss/config.scss';
.nav-footer {
  height: 234px;
  background-color: $colorB;
  color: $colorD;
  text-align: center;
  font-size: 16px;
  border-top: 4px solid $colorA;
  .footer-logo {
    img {
      width: 53px;
      height: 36px;
      margin-top: 46px;
      margin-bottom: 13px;
    }
  }
  .footer-title {
    margin-bottom: 31px;
  }
  .footer-link {
    height: 28px;
    a {
      color: $colorD;
    }
    span {
      margin: 5px;
    }
  }
  .copy {
    .past {
      color: $colorA;
    }
  }
}
</style>
