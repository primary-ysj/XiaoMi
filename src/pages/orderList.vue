<template>
  <div class="order-list">
    <!-- 头部组件 -->
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>

    <!-- 页面主体 -->
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <!-- 等待数据 缓冲组件 -->
          <loading v-if="loading"></loading>
          <div v-for="item in list" :key="item.id" class="order">
            <!-- 上部标题 -->
            <div class="order-title">
              <div class="item-info fl">
                {{ item.createTime }}
                <span>|</span>
                {{ item.receiverName }}
                <span>|</span>
                订单号：{{ item.orderNo }}
                <span>|</span>
                {{ item.paymentTypeDesc }}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{ item.payment }}</span>
                <span>元</span>
              </div>
            </div>
            <!-- 商品图及支付状态 -->
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div
                  class="good-list"
                  v-for="(i, index) in item.orderItemVoList"
                  :key="index"
                >
                  <div class="good-img">
                    <img v-lazy="i.productImage" alt="" />
                  </div>
                  <div class="good-name">
                    <div class="p-name">
                      {{ i.productName }}
                    </div>
                    <div class="p-money">
                      {{ i.totalPrice }} X {{ i.quantity }}元
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="good-state fr"
                v-if="item.status == 10"
                @click="goPay(item.orderNo)"
              >
                <a href="javascript:;">{{ item.statusDesc }}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;">{{ item.statusDesc }}</a>
              </div>
            </div>
          </div>
          <no-data v-if="!loading && list.length == 0"></no-data>
          <!-- 分页器 -->
          <el-pagination
            background
            layout="prev, pager,jumper, next"
            :total="total"
            :page-size="pageSize"
            @current-change="changePage"
            :disabled="disabled"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'order-list',
  data() {
    return {
      loading: false, //是否显示缓冲加载组件
      list: [], //订单列表
      pageSize: 3, //每次获取的订单条数
      pageNum: 1, //获取第几页订单
      total: 1, //总订单数
      disabled: false,
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    //获取订单列表
    getOrderList() {
      this.loading = true
      this.$axios
        .get('/orders', {
          params: {
            pageSize: this.pageSize,
            pageNum: this.pageNum,
          },
        })
        .then(res => {
          console.log(res)
          this.list = res.list
          this.total = res.total
          this.loading = false
          this.disabled = false
        })
        .catch(() => {
          this.loading = false
          this.disabled = false
        })
    },
    //去支付页面
    goPay(orderNo) {
      this.$router.push({
        path: '/order/pay',
        query: {
          orderNo,
        },
      })
    },
    //换页
    changePage(page) {
      this.pageNum = page
      this.disabled = true
      this.getOrderList()
    },
  },
}
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .el-pagination {
        text-align: center;
      }
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
      .pagination {
        text-align: right;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff6600;
      }
      .el-button--primary {
        background-color: #ff6600;
        border-color: #ff6600;
      }
      .load-more,
      .scroll-more {
        text-align: center;
      }
    }
  }
}
</style>
