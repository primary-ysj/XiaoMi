<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
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
      <div class="ads-box"></div>
      <div class="banner"></div>
      <div class="product-box"></div>
    </div>

    <server-bar></server-bar>
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
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
}
</script>

<style lang="scss">
.index {
  .swiper-box {
    .swiper-container {
      height: 451px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
