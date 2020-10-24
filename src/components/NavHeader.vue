<template>
  <div class="nav-header">
    <!-- 头部头条栏 -->
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MIUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a v-if="username" href="javascript:;">{{ username }}</a>
          <a v-else href="javascript:;" @click="login">登录</a>
          <a v-if="username" href="javascript:;">我的订单</a>
          <a href="javascript:;" class="my-cart" @click="goCart">
            <span class="icon-cart"></span> 购物车({{ cartCount }})</a
          >
        </div>
      </div>
    </div>
    <!-- 头部导航 -->
    <div class="header">
      <div class="container">
        <!-- logo -->
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <!-- 菜单 -->
        <div class="header-menu">
          <!-- 子菜单 -->
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="item in phoneList" :key="item.id">
                  <a :href="'/#/product/' + item.id" target="_blank">
                    <div class="product-pic">
                      <img v-lazy="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="product-name">{{ item.name }}</div>
                    <div class="product-price">{{ item.price | price }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>Redmi红米</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children"></div>
          </div>
        </div>
        <!-- 搜索框 -->
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'nav-header',
  data() {
    return {
      phoneList: [],
    }
  },
  computed: {
    username() {
      return this.$store.state.username
    },
    cartCount() {
      return this.$store.state.cartCount
    },
    // ...mapState(['username', 'cartCount']),
  },
  created() {
    this.getProductList()
    let params = this.$route.params
    if (params && params.from == 'login') {
      this.getCartCount()
    }
  },
  methods: {
    //登录函数
    login() {
      this.$router.push('/login')
    },
    //跳转购物车
    goCart() {
      this.$router.push('/cart')
    },
    //获取产品详情列表
    getProductList() {
      this.$axios
        .get('/products', {
          params: {
            categoryId: '100012',
            pageSize: 6,
          },
        })
        .then(res => {
          // console.log(res)
          this.phoneList = res.list
          console.log(this.phoneList)
        })
    },
    //获取购物车
    getCartCount() {
      this.$axios.get('/carts/products/sum').then((res = 0) => {
        this.$store.dispatch('saveCartCount', res)
      })
    },
  },
}
</script>

<style lang="scss">
@import '../assets/scss/base.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';
.nav-header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: $colorB;
    .container {
      @include flex();
      a {
        text-align: center;
        margin-right: 17px;
        color: #b0b0b0;
      }
      .my-cart {
        display: inline-block;
        width: 110px;
        background-color: $colorA;
        margin: 0;
        color: #ffffff;
        .icon-cart {
          @include bgimg(16px, 12px, '/imgs/icon-cart-checked.png');
          margin-right: 4px;
        }
      }
    }
  }
  .header {
    .container {
      position: relative;
      height: 112px;
      @include flex();
      .header-logo {
        height: 55px;
        width: 55px;
        background-color: $colorA;
        a {
          display: inline-block;
          width: 110px;
          height: 55px;
          transition: all, 0.3s;
          &::before {
            content: '';
            @include bgimg(55px, 55px, '/imgs/mi-logo.png');
          }
          &::after {
            content: '';
            @include bgimg(55px, 55px, '/imgs/mi-home.png');
          }
          &:hover {
            margin-left: -55px;
          }
        }
      }
      .header-menu {
        display: inline-block;
        width: 643px;
        padding-left: 209px;
        .item-menu {
          display: inline-block;
          font-size: 16px;
          font-weight: 700;
          line-height: 112px;
          margin-right: 20px;
          color: $colorB;
          span {
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
              border-top: 1px solid $colorH;
            }
          }
          .children {
            position: absolute;
            overflow: hidden;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0px;
            opacity: 0;
            // border-top: 1px solid $colorH;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 10;
            transition: all 0.5s;
            background-color: #fff;
            .product {
              position: relative;
              float: left;
              width: 16.6%;
              height: 220px;
              font-size: 12px;
              line-height: 12px;
              text-align: center;
              &:before {
                content: '';
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid $colorF;
                height: 100px;
                width: 1px;
              }
              &:last-child::before {
                border: none;
              }
              a {
                display: inline-block;
                .product-pic {
                  height: 137px;
                  img {
                    height: 111px;
                    margin-top: 26px;
                  }
                }
                .product-name {
                  font-weight: 700;
                  margin-top: 19px;
                  margin-bottom: 8px;
                  color: $colorB;
                }
                .product-price {
                  color: $colorA;
                }
              }
            }
          }
        }
      }
      .header-search {
        width: 319px;
        .wrapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          input {
            box-sizing: border-box;
            width: 264px;
            height: 50px;
            border: none;
            border-right: 1px solid #e0e0e0;
            padding-left: 14px;
          }
          a {
            @include bgimg(18px, 18px, '/imgs/icon-search.png');
            margin-left: 18px;
          }
        }
      }
    }
  }
}
</style>
