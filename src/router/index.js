import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const Home = ()=>import('views/home/Home.vue')
const Cart = ()=>import('views/cart/Cart.vue')
const Category = ()=>import('views/category/Category.vue')
const Profile = ()=>import('views/profile/Profile.vue')
const Detail = ()=>import('views/detail/Detail.vue')
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/category",
    name: "Category",
    component: Category
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/detail/:iid",
    name: "Detail",
    component: Detail
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
  // 重写路由的push方法
  // 解决，相同路由跳转时，报错
  const originalPush = VueRouter.prototype.push;
  VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch((err) => err);
  };
export default router;
