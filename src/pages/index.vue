<template>
  <div class="index">
    <div class="container">
      <!-- 轮播 -->
      <div class="swiper-box">
        <!-- 侧列导航 -->
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item, index) in menuList" :key="index">
                  <li v-for="(sub, index) in item" :key="index">
                    <a :href="`/#/product/${sub.id}`">
                      <img v-lazy="sub.img" alt="" />{{ sub.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
              <div class="children">
                <ul v-for="(item, index) in menuList" :key="index">
                  <li v-for="(sub, index) in item" :key="index">
                    <a :href="`/#/product/${sub.id}`">
                      <img v-lazy="sub.img" alt="" />{{ sub.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
              <div class="children">
                <ul v-for="(item, index) in menuList" :key="index">
                  <li v-for="(sub, index) in item" :key="index">
                    <a :href="`/#/product/${sub.id}`">
                      <img v-lazy="sub.img" alt="" />{{ sub.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
              <div class="children">
                <ul v-for="(item, index) in menuList" :key="index">
                  <li v-for="(sub, index) in item" :key="index">
                    <a :href="`/#/product/${sub.id}`">
                      <img v-lazy="sub.img" alt="" />{{ sub.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
              <div class="children">
                <ul v-for="(item, index) in menuList" :key="index">
                  <li v-for="(sub, index) in item" :key="index">
                    <a :href="`/#/product/${sub.id}`">
                      <img v-lazy="sub.img" alt="" />{{ sub.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
              <div class="children">
                <ul v-for="(item, index) in menuList" :key="index">
                  <li v-for="(sub, index) in item" :key="index">
                    <a :href="`/#/product/${sub.id}`">
                      <img v-lazy="sub.img" alt="" />{{ sub.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
              <div class="children">
                <ul v-for="(item, index) in menuList" :key="index">
                  <li v-for="(sub, index) in item" :key="index">
                    <a :href="`/#/product/${sub.id}`">
                      <img v-lazy="sub.img" alt="" />{{ sub.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
              <div class="children">
                <ul v-for="(item, index) in menuList" :key="index">
                  <li v-for="(sub, index) in item" :key="index">
                    <a :href="`/#/product/${sub.id}`">
                      <img v-lazy="sub.img" alt="" />{{ sub.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <!-- 轮播图 -->
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for="(item, index) in sildeList" :key="index">
            <a :href="`/#/product/${item.id}`">
              <img :src="item.img" />
            </a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- 四张广告图 -->
      <div class="ads-box">
        <a
          :href="'/#/product/' + item.id"
          v-for="(item, index) in adsList"
          :key="index"
        >
          <img v-lazy="item.img" alt="" />
        </a>
      </div>
      <!-- banner -->
      <div class="banner">
        <a href="/#/product/30"><img v-lazy="'/imgs/banner-1.png'" alt=""/></a>
      </div>
    </div>
    <!-- 手机产品 -->
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35">
              <img v-lazy="'/imgs/mix-alpha.jpg'" alt="" />
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr, i) in phoneList" :key="i">
              <div class="item" v-for="(item, j) in arr" :key="j">
                <span v-if="j % 2 == 0" class="new-pro">新品</span>
                <span v-else class="kill-pro">秒杀</span>
                <div class="item-img">
                  <img v-lazy="item.mainImage" alt="" />
                </div>
                <div class="item-info">
                  <h3>{{ item.name }}</h3>
                  <p>{{ item.subtitle }}</p>
                  <p class="price" @click="addCart(item.id)">
                    {{ item.price | price }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <server-bar></server-bar>
    <!-- 模态框 -->
    <modal
      title="提示"
      sureText="查看购物车"
      btnType="1"
      modalType="middle"
      :showModal="isShowModal"
      @cancel="isShowModal = false"
      @submit="goToCart"
    >
      <template v-slot:body>
        <p>商品添加成功!</p>
      </template>
    </modal>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

import 'swiper/css/swiper.css'
export default {
  name: 'index',
  data() {
    return {
      swiperOptions: {
        autoplay: true,
        loop: true,
        effect: 'cube',
        cubeEffect: {
          shadowOffset: 100,
          shadowScale: 0.6,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      sildeList: [
        { id: '42', img: '/imgs/slider/slide-1.jpg' },
        { id: '45', img: '/imgs/slider/slide-2.jpg' },
        { id: '46', img: '/imgs/slider/slide-3.jpg' },
        { id: '42', img: '/imgs/slider/slide-4.jpg' },
        { id: '42', img: '/imgs/slider/slide-5.jpg' },
      ],
      menuList: [
        [
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
          { id: 31, img: '/imgs/item-box-2.png', name: '小米8青春版' },
          { id: 32, img: '/imgs/item-box-3.jpg', name: 'Redmi K20 Pro' },
          { id: 33, img: '/imgs/item-box-4.jpg', name: '移动4G+专区' },
        ],
        [
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
        ],
        [
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
        ],
        [
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
        ],
        [
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
        ],
        [
          { id: 30, img: '/imgs/item-box-1.png', name: '小米ccc9' },
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
          { id: 30, img: '/imgs/item-box-1.png', name: '小米cc9' },
        ],
      ],
      adsList: [
        {
          id: 33,
          img: '/imgs/ads/ads-1.png',
        },
        {
          id: 48,
          img: '/imgs/ads/ads-2.jpg',
        },
        {
          id: 45,
          img: '/imgs/ads/ads-3.png',
        },
        {
          id: 47,
          img: '/imgs/ads/ads-4.jpg',
        },
      ],
      phoneList: [],
      isShowModal: false,
    }
  },
  created() {
    this.init()
  },
  methods: {
    //添加购物车
    addCart(id) {
      this.$axios
        .post('/carts', {
          productId: id,
          selected: true,
        })
        .then(res => {
          this.isShowModal = true
          // console.log(res)
          this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
        })
        .catch(res => {
          console.log(res)
        })
    },
    //跳转购物车
    goToCart() {
      this.$router.push('/cart')
    },
    //展示手机列表
    init() {
      this.$axios
        .get('/products', {
          params: {
            categoryId: 100012,
            pageSize: 14,
          },
        })
        .then(res => {
          // console.log(res)
          this.phoneList = [res.list.slice(6, 10), res.list.slice(10, 14)]
          // console.log(this.phoneList)
        })
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
}
</script>

<style lang="scss">
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';

.index {
  .swiper-box {
    position: relative;
    .swiper-container {
      height: 451px;
      .swiper-button-prev {
        margin-left: 264px;
      }
      img {
        width: 1226px;
        height: 451px;
      }
    }
    .nav-menu {
      position: absolute;
      z-index: 9;
      width: 264px;
      height: 451px;
      padding: 26px 0;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.3);
      .menu-wrap {
        .menu-item {
          height: 16px;
          line-height: 16px;
          padding: 17px 30px;
          cursor: pointer;
          overflow: hidden;
          a {
            display: inline-block;
            width: 204px;
            font-size: 16px;
            color: #fff;
            &::after {
              content: '';
              float: right;
              @include bgimg(10px, 15px, '/imgs/icon-arrow.png');
            }
          }
          &:hover {
            background-color: $colorA;
          }
          &:hover .children {
            // display: block;
            width: 962px;
          }
          .children {
            // display: none;
            width: 0;
            overflow: hidden;
            height: 451px;
            background-color: $colorG;
            position: absolute;
            left: 264px;
            top: 0px;
            border: 1px solid $colorH;
            transition: all 0.5s;
            ul {
              display: flex;
              height: 75px;
              justify-content: space-between;
              li {
                height: 75px;
                line-height: 75px;
                flex: 1;
                padding-left: 23px;
                a {
                  img {
                    width: 42px;
                    height: 35px;
                    vertical-align: middle;
                    margin-right: 15px;
                  }
                  color: $colorB;
                  font-size: 14px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
  .ads-box {
    @include flex();
    margin-top: 14px;
    margin-bottom: 31px;
    a {
      display: inline-block;
      width: 100%;
      width: 296px;
      height: 167px;
    }
  }
  .banner {
    margin-bottom: 50px;
    height: 130px;
    a {
      display: inline-block;
      height: 130px;
    }
  }
  .product-box {
    background-color: $colorJ;
    padding: 30px 0 50px;
    h2 {
      font-size: $fontF;
      height: 21px;
      line-height: 21px;
      color: $colorB;
      margin-bottom: 20px;
    }
    .wrapper {
      display: flex;
      .banner-left {
        a {
          display: inline-block;
          width: 224px;
          height: 619px;
          margin-right: 16px;
        }
      }
      .list-box {
        flex: 1;
        .list {
          @include flex();
          margin-bottom: 14px;
          &:last-child {
            margin-bottom: 0;
          }
          .item {
            width: 236px;
            height: 302px;
            background-color: $colorG;
            text-align: center;
            span {
              display: inline-block;
              width: 67px;
              height: 24px;
              line-height: 24px;
              font-size: 14px;
              color: $colorG;
              &.new-pro {
                background-color: #7ecf68;
              }
              &.kill-pro {
                background-color: #e82626;
              }
            }
            .item-img {
              height: 195px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .item-info {
              h3 {
                font-size: $fontJ;
                color: $colorB;
                line-height: 14px;
                font-weight: 700;
              }
              p {
                color: $colorD;
                line-height: 13px;
                margin: 6px 0 13px;
              }
              .price {
                color: #f20a0a;
                font-weight: 700;
                font-size: 14px;
                cursor: pointer;
                vertical-align: middle;
                &::after {
                  content: '';
                  margin-left: 5px;
                  @include bgimg(22px, 22px, '/imgs/icon-cart-hover.png');
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
