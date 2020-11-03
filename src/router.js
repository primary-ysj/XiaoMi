import Vue from 'vue'
import Router from 'vue-router'



//引入页面组件
import Home from './pages/home.vue'
const Index = () =>
    import ('./pages/index.vue')
const Product = () =>
    import ('./pages/product.vue')
const Detail = () =>
    import ('./pages/detail.vue')
const Cart = () =>
    import ('./pages/cart.vue')
const Order = () =>
    import ('./pages/order.vue')
const OrderList = () =>
    import ('./pages/orderList.vue')
const OrderConfirm = () =>
    import ('./pages/orderConfirm.vue')
const OrderPay = () =>
    import ('./pages/orderPay.vue')
const AliPay = () =>
    import ('./pages/aliPay.vue')
const Login = () =>
    import ('./pages/login.vue')
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
        redirect: '/index',
        children: [{
            path: 'index',
            name: 'index',
            component: Index,
        }, {
            path: 'product/:id',
            name: 'product',
            component: Product,
        }, {
            path: 'detail/:id',
            name: 'detail',
            component: Detail,
        }]
    }, {
        path: '/cart',
        name: 'cart',
        component: Cart,
    }, {
        path: '/login',
        name: 'login',
        component: Login,
    }, {
        path: '/order',
        name: 'order',
        component: Order,
        children: [{
            path: 'list',
            name: 'order-list',
            component: OrderList,
        }, {
            path: 'confirm',
            name: 'order-confirm',
            component: OrderConfirm,
        }, {
            path: 'pay',
            name: 'order-pay',
            component: OrderPay,
        }, {
            path: 'aliPay',
            name: 'ali-pay',
            component: AliPay,
        }]
    }]
})