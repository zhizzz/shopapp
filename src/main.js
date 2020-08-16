import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
import toast from './components/common/toast/index'

Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper);
import Moment  from 'moment'; //导入模块
Moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn'); 
// 定义全局时间戳过滤器
Vue.filter('formatDate', function(value) {
  return Moment(value*1000).format('YYYY-MM-DD HH:mm')
})

Vue.prototype.$bus = new Vue()//添加事件总线
//注册toast插件
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
