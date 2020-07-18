import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Index = () => import('views/user/Index');
const Home = () => import('views/user/home/Home');
const Cart = () => import('views/user/cart/Cart');
const Detail = () => import('views/user/detail/Detail');
const Order = () => import('views/user/order/Order');
const Information = () => import('views/user/info/Information')
const ConfirmOrder = () => import('views/user/confirm/ConfirmOrder')
const Query = () => import('views/user/query/Query')

const Sellers = () => import('views/sellers/Sellers');
const SellersHome = () => import('views/sellers/childrenComp/Home');
const Orderlist = () => import('views/sellers/childrenComp/Orderlist');
const Message = () => import('views/sellers/childrenComp/Message');
const AddGoods = () => import('views/sellers/childrenComp/AddGoods');
const Goodlist = () => import('views/sellers/childrenComp/Goodlist');

const Mine = () => import('views/mine/Mine');
const Login = () => import('views/mine/Login');
const Register = () => import('views/mine/Register');
const ChangePass = () => import('views/mine/ChangePass');

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/mine',
    component: Mine,
    redirect: 'login',
    children: [
      {
        path: '/login',
        component: Login
      },
      {
        path: '/change',
        component: ChangePass
      }]
  },
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/cart/:userId',
        component: Cart
      },
      {
        path: '/detail/:productId',
        component: Detail
      },
      {
        path: '/order',
        component: Order
      },
      {
        path: '/info',
        component: Information
      },
      {
        path: '/confirm',
        component: ConfirmOrder
      },
      {
        path: '/query',
        component: Query
      }
    ]
  },
  {
    path: '/sellers',
    redirect: '/sellers/home',
    component: Sellers,
    children: [
      {
        path: '/sellers/home',
        component: SellersHome
      }, {
        path: '/sellers/orderlist',
        component: Orderlist
      }, {
        path: '/sellers/message',
        component: Message
      }, {
        path: '/sellers/addGoods',
        component: AddGoods
      }, {
        path: '/sellers/goodlist',
        component: Goodlist
      }
    ]
  },
  {
    path: '/register',
    component: Register
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // console.log(savedPosition);
    if (savedPosition) { //如果savedPosition存在，滚动条会自动跳到记录的值的地方
      return savedPosition
    } else {
      return { x: 0, y: 0 }//savedPosition也是一个记录x轴和y轴位置的对象
    }
  }
})

const whiteList = ['login', 'register', 'change', 'home', 'detail', 'query']

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
  let path = to.path.split('/');
  // console.log(path);
  if (token) {
    next();
  } else {
    if (whiteList.indexOf(path[1]) !== -1) {
      next();
    } else {
      next('/login');
    }
  }
})

export default router
