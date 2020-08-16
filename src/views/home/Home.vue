<template>
  <div id="home">
    <nav-bar class="home-narbar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="currType"
      ref="tabcontrol1"
      class="tabshow"
      v-show="showtab"
    />
    <scroll
      class="content"
      ref="scroll"
      :probetype="3"
      @scroll="homeScoll"
      :pullupload="true"
      @loadmore="loadMore"
    >
      <home-swiper :banners="banner" @imgonload="imgonload" />
      <recommend :recommends="recommend" />
      <recommend-bg />
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="currType" ref="tabcontrol2" />
      <product-list :productlist="productlist[currtype].list" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShow" />
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar"; //顶部导航栏
import HomeSwiper from "./childComps/HomeSwiper"; //轮播图
import Recommend from "./childComps/Recommend"; //圆图推荐信息
import RecommendBg from "./childComps/RecommendBg"; //本周流行的北京图
import TabControl from "components/content/tabControl/TabControl"; //中间3个分页导航栏
import ProductList from "components/content/productlist/ProductList"; //商品列表
import Scroll from "components/common/scroll/Scroll"; //滚动
import BackTop from "components/common/BackTop"; //回到顶部按钮

import { getHomeMultidata, getHomeProductList } from "network/home"; //请求数据
import { debounce } from "common/utils";
export default {
  name: "Home",
  components: {
    NavBar, //顶部导航栏
    HomeSwiper, //轮播图
    Recommend, //圆图推荐信息
    RecommendBg, //本周流行的北京图
    TabControl, //中间3个分页导航栏
    ProductList, //商品列表
    Scroll, //滚动
    BackTop //回到顶部按钮
  },
  data() {
    return {
      banner: [], //存放轮播图
      recommend: [], //存放圆图推荐信息
      //存放商品列表
      productlist: {
        pop: { page: 0, list: [] }, //流行
        new: { page: 0, list: [] }, //新款
        sell: { page: 0, list: [] } //精选
      },
      currtype: "pop", //productlist[currtype]默认值pop
      isShow: false,  //返回顶部的
      taboffsetTop: 0, //储存tabcontrol的offsetTop值
      showtab: false, 
      saveY:0   //存储scroll的滚动值
    };
  },
  //组件创建完后调用
  created() {
    //请求轮播图和圆图
    this.getHomeMultidata();
    //请求商品列表
    this.getHomeProductList("pop");
    this.getHomeProductList("new");
    this.getHomeProductList("sell");
  },
  //组件挂载完后调用
  mounted() {
    //监听item中图片加载完成    debounce防抖,减少refresh()的使用频率
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("imgonLoad", () => {
      refresh(); //Scroll.vue的方法
    });
  },
  //活跃时调用，要配合keep-alive使用
  activated() {
    this.$refs.scroll.refresh()//先刷新，不然有时scroll会弹到顶部
    this.$refs.scroll.bscroll.scrollTo(0,this.saveY,0)//滚动到home离开时的y轴位置
  },
  //不活跃(离开)时调用，要配合keep-alive使用
  deactivated() {
     this.saveY = this.$refs.scroll.bscroll.y //保存home离开时的滚动y轴的位置
  },
  methods: {
    //事件监听相关方法
    //点击页面显示不同的数据['流行', '新款', '精选']
    currType(index) {
      switch (index) {
        case 0:
          this.currtype = "pop";
          break;
        case 1:
          this.currtype = "new";
          break;
        case 2:
          this.currtype = "sell";
          break;
          
      }
      //让不同的tabcontrol组件的currindex相同
      this.$refs.tabcontrol1.currindex = index
      this.$refs.tabcontrol2.currindex = index
    },
    //回到顶部方法
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500); //获取Scroll.vue里面的backTop方法
    },
    //监控滑动的位置
    homeScoll(position) {
      this.isShow = -position.y > 800;
      
      this.showtab = -position.y > this.taboffsetTop;
    },
    //加载更多
    loadMore() {
      this.getHomeProductList(this.currtype);
      //完成上拉加载更多
      this.$refs.scroll.finishpullup();
    },
    //获取tabcontrol的offsetTop值
    imgonload() {
      this.taboffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
    },

    //数据请求的方法
    //封装一下
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banner = res.data.data.banner.list;
        this.recommend = res.data.data.recommend.list;
      });
    },
    getHomeProductList(type) {
      const page = this.productlist[type].page + 1;
      getHomeProductList(type, page).then(res => {
        // for(let n of res.data.data.list){ 方法一
        //     this.productlist[type].list.push(n)
        // }
        //方法二   方法3 用conncat方法
        //不能直接push，应为只能push一页的数据，这里要加载多行数据
        this.productlist[type].list.push(...res.data.data.list);
        this.productlist[type].page += 1;
      });
    }
  },
  computed: {}
};
</script>
<style scoped>
.home-narbar {
  background-color: var(--color-text);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
}
#home {
  height: 100vh;
  position: relative;
}

/* .content{
  height: calc(100% - 93px); 
  margin-top: 44px;
  overflow: hidden;
} */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tabshow {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  z-index: 999;
  background: #fff;
}
</style>