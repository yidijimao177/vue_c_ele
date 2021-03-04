import Vue from "vue";
import VueRouter from "vue-router";
import tabk from './modules/tabk'
import login from "./modules/login";
import addressdata from './modules/address'

Vue.use(VueRouter);

const routes = [ 
  {
    path: '/',
    name: 'index',
    redirect:'/home',
    component: ()=>import('../views/index.vue'),
    children:[
      ...tabk,
      ...addressdata,
    ]
  },
  login,
  {
    path:'*',
    component:()=>import('../views/404/index')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  //ele_login为真则是登录，否则就是没登录
  const isLogin = window.localStorage.ele_login ? true : false;
  //路径如果在login界面，则直接放行
  if (to.path == "/login") {
    next();
  } else {
    //路径不在login界面，判断是否登录，登录则放行，没有则跳转到登录界面
    isLogin ? next() : next("/login");
  }
});

export default router;
