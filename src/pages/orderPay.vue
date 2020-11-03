<template>
  <div class="order-pay">
    <!-- 顶部组件 -->
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <!-- 主体 -->
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <!-- 订单提示 -->
          <div class="item-order">
            <div class="icon-succ"></div>
            <!-- 订单左侧提示 -->
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{ addressInfo }}</p>
            </div>
            <!-- 订单右侧提示 -->
            <div class="order-total">
              <p>
                应付总额：<span>{{ payment }}</span
                >元
              </p>
              <p>
                订单详情<em
                  class="icon-down"
                  :class="{ up: !showDetail }"
                  @click="showDetail = !showDetail"
                ></em>
              </p>
            </div>
          </div>
          <!-- 订单详情 -->
          <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{ orderId }}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">
                {{ addressInfo }}
              </div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item, index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage" />{{ item.productName }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div
              class="pay pay-ali "
              :class="{ checked: payType == 1 }"
              @click="pay(1)"
            ></div>
            <div
              class="pay pay-wechat"
              :class="{ checked: payType == 2 }"
              @click="pay(2)"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 微信二维码弹框 -->
    <scan-pay-code
      v-if="showPay"
      @close="closePayModal"
      :img="payImg"
    ></scan-pay-code>
    <!-- 取消二维码,弹框确认是否支付 -->
    <modal
      btnType="3"
      title="请确认支付"
      sureText="前往订单列表"
      cancelText="未支付"
      :showModal="showModal"
      @cancel="showModal = false"
      @submit="goOrderList"
    >
      <template v-slot:body>
        <div>您确认是否完成支付?</div>
      </template>
    </modal>
  </div>
</template>
<script>
import QRCode from 'qrcode'
export default {
  name: 'order-pay',
  data() {
    return {
      orderId: this.$route.query.orderNo, //订单号
      addressInfo: '', //收货地址信息
      orderDetail: [], //订单商品列表
      payment: 0, //订单总金额
      showDetail: false, //是否显示订单详情
      payType: '', //支付类型
      showPay: false, //微信支付模态框是否显示
      payImg: '', //二维码地址
      showModal: false, //弹框状态
      T: '', //定时器ID
    }
  },
  created() {
    this.getOrder()
    this.getCartCount()
  },
  methods: {
    //获取购物车
    getCartCount() {
      this.$axios.get('/carts/products/sum').then((res = 0) => {
        this.$store.dispatch('saveCartCount', res)
      })
    },
    //关闭微信弹框
    closePayModal() {
      this.showPay = false
      this.showModal = true
      clearInterval(this.T)
    },
    //获取支付订单信息
    getOrder() {
      this.$axios.get(`/orders/${this.orderId}`).then(res => {
        let item = res.shippingVo
        this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`
        this.orderDetail = res.orderItemVoList
        this.payment = res.payment
        // console.log(res)
      })
    },

    //去订单列表页
    goOrderList() {
      this.$router.push('/order/list')
    },
    //支付
    pay(num) {
      this.payType = num
      if (num == 1) {
        //支付宝支付

        window.open(`/#/order/alipay?orderId=${this.orderId}`, '_blank')
      } else {
        //微信支付
        this.$axios
          .post('/pay', {
            orderId: this.orderId,
            orderName: 'Vue高仿小米商城',
            amount: 0.01, //单位元
            payType: 2, //1支付宝，2微信
          })
          .then(res => {
            console.log(res)
            QRCode.toDataURL(res.content)
              .then(url => {
                console.log(url)
                this.payImg = url
                this.showPay = true
                this.loopOrderState()
              })
              .catch(() => {
                this.$message.error('微信二维码生成失败，请稍后重试')
              })
          })
      }
    },
    //订单状态轮询
    loopOrderState() {
      this.T = setInterval(() => {
        this.$axios.get(`/orders/${this.orderId}`).then(res => {
          if (res.status == 20) {
            clearInterval(this.T)
            this.goOrderList()
          }
        })
      }, 1000)
    },
  },
}
</script>
<style lang="scss">
.order-pay {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 61px;
    .order-wrap {
      padding: 62px 50px;
      background-color: #fff;
      font-size: 14px;
      margin-bottom: 30px;
      .item-order {
        display: flex;
        align-items: center;
        .icon-succ {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: url('/imgs/icon-gou.png') #80c58a no-repeat center;
          background-size: 60px;
          margin-right: 40px;
        }
        .order-info {
          margin-right: 248px;
          h2 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
          }
          p {
            color: #666666;
            span {
              color: #ff6700;
            }
          }
        }
        .order-total {
          & > p:first-child {
            margin-bottom: 30px;
          }
          span {
            font-size: 28px;
            color: #ff6700;
          }
          .icon-down {
            display: inline-block;
            width: 14px;
            height: 10px;
            background: url('/imgs/icon-down.png') no-repeat center;
            background-size: contain;
            margin-left: 9px;
            transition: all 0.5s;
            cursor: pointer;
            &.up {
              transform: rotate(180deg);
            }
          }
          .icon-up {
            transform: rotate(180deg);
          }
        }
      }
      .item-detail {
        border-top: 1px solid #d7d7d7;
        padding-top: 47px;
        padding-left: 130px;
        font-size: 14px;
        margin-top: 45px;
        .item {
          margin-bottom: 19px;
          .detail-title {
            float: left;
            width: 100px;
          }
          .detail-info {
            display: inline-block;
            img {
              width: 30px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .item-pay {
      padding: 26px 50px 72px;
      background-color: #ffffff;
      color: #333333;
      h3 {
        font-size: 20px;
        font-weight: 200;
        color: #333333;
        padding-bottom: 24px;
        border-bottom: 1px solid #d7d7d7;
        margin-bottom: 26px;
      }
      .pay-way {
        font-size: 18px;
        .pay {
          display: inline-block;
          width: 188px;
          height: 64px;
          border: 1px solid #d7d7d7;
          cursor: pointer;
          &:last-child {
            margin-left: 20px;
          }
          &.checked {
            border: 1px solid #ff6700;
          }
        }
        .pay-ali {
          background: url('/imgs/pay/icon-ali.png') no-repeat center;
          background-size: 103px 38px;
          margin-top: 19px;
        }
        .pay-wechat {
          background: url('/imgs/pay/icon-wechat.png') no-repeat center;
          background-size: 103px 38px;
        }
      }
    }
  }
}
</style>
