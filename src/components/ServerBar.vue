<template>
  <div class="server-bar">
    <div class="container">
      <ul>
        <li><span class="icon-setting"></span>预约维修服务</li>
        <li><span class="icon-7day"></span>7天无理由退货</li>
        <li><span class="icon-15day"></span>15天免费换货</li>
        <li><span class="icon-post"></span>满150元包邮</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'server-bar',
}
</script>

<style lang="scss">
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';
.server-bar {
  padding: 33px 0;
  background-color: $colorG;
  color: $colorC;
  font-size: 16px;
  li {
    display: inline-block;
    width: 24.9%;
    text-align: center;
    height: 24px;
    line-height: 24px;

    border-right: 1px solid $colorH;
    &:last-child {
      border: none;
    }
    span {
      vertical-align: middle;
      margin-right: 8px;
    }
    .icon-setting {
      @include bgimg(20px, 20px, '/imgs/icon-setting.png');
    }
    .icon-7day {
      @include bgimg(20px, 20px, '/imgs/icon-7day.png');
    }
    .icon-15day {
      @include bgimg(20px, 20px, '/imgs/icon-15day.png');
    }
    .icon-post {
      @include bgimg(20px, 20px, '/imgs/icon-post.png');
    }
  }
}
</style>
