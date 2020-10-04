import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/HomePage.vue')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

  // 掛載路由導航守衛
router.beforeEach((to, from, next) => {
  // to 將要訪問的路徑
  // from 代表從那個路徑跳轉過來
  // next 是一個函數，表示放行
  //   next() 放行 next('/login') 強行跳轉
  if(to.path === '/login') return next();
  // 獲取token
  const token = sessionStorage.getItem('token')
  if(!token) return next('/login')
  next()
})

export default router