<template>
  <div class="detail">
    <detail-navbar class="detailNavbar" @tabClick="tabClick" ref="nav" />
    <scroll class="content" ref="scroll" :probetype="3" @scroll="detailScoll">
      <detail-swiper :swiperImgs="swiperImg" />
      <detail-baseinfo :baseInfo="baseInfo" />
      <detail-shopinfo :shop="shop" />
      <detail-imginfo :imgDetail="imgDetail" @imgonLoad="imgonLoad" />
      <detail-paraminfo :paramInfo="paramInfo" ref="params" />
      <detail-commentinfo :commentInfo="commentInfo" ref="comment" />
      <product-list :productlist="productlist" ref="product" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShow" class="back" />
    <detail-bottombar @addToCart="addToCart"/>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";
import DetailNavbar from "./childComps/DetailNavbar";
import DetailSwiper from "./childComps//DetailSwiper";
import DetailBaseinfo from "./childComps/DetailBaseinfo";
import DetailShopinfo from "./childComps/DetailShopinfo";
import DetailImginfo from "./childComps/DetailImginfo";
import DetailParaminfo from "./childComps/DetailParaminfo";
import DetailCommentinfo from "./childComps/DetailCommentinfo";
import ProductList from "components/content/productlist/ProductList";
import BackTop from "components/common/BackTop";
import DetailBottombar from './childComps/DetailBottombar';


import {
  getDetailData,
  BaseInfo,
  Shop,
  Params,
  getRecommend
} from "network/detail";
import { debounce } from "common/utils";
export default {
  name: "Detail",
  data() {
    return {
      iid: String,
      swiperImg: [],
      baseInfo: {},
      shop: {},
      imgDetail: {},
      paramInfo: {},
      commentInfo: {},
      productlist: [],
      taboffsetTopY: [],
      getTabY: null,
      isShow: false,
      currentIndex: 0
    };
  },
  components: {
    Scroll,
    DetailNavbar, //顶部导航栏
    DetailSwiper, //轮播图
    DetailBaseinfo, //商品基本信息
    DetailShopinfo, //店铺基本信息
    DetailImginfo, //商品图片详情
    DetailParaminfo, //商品参数信息
    DetailCommentinfo, //评论信息
    ProductList, //推荐信息
    BackTop,//回到顶部
    DetailBottombar,//底部导航
    
  },
  methods: {
    //回到顶部方法
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500); //获取Scroll.vue里面的backTop方法
    },
    //监听图片加载
    imgonLoad() {
      this.$refs.scroll.refresh();
      this.getTabY();
    },
    //跳转到对应的主题tab
    tabClick(index) {
      this.$refs.scroll.scrollTo(0, -this.taboffsetTopY[index], 500);
    },
    //监听滚动
    detailScoll(position) {
      this.isShow = -position.y > 800;//监听backTop的显示
      //监听滚动到哪一个主题
      const positionY = -position.y + 44;
      let length = this.taboffsetTopY.length;
      for (let i = 0; i < length; i++) {
        //console.log(i); //str 下面 i+ 1会有问题
        // }
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.taboffsetTopY[i] &&
            positionY < this.taboffsetTopY[i + 1]) ||
            (i === length - 1 && positionY >= this.taboffsetTopY[i]))
        ) {
          //对于上面一长串的范围判断使用this.taboffsetTopY.push(Number.MAX.VALUE);
          //这样可以省去 || 之后的判断代码
          this.currentIndex = i;
          this.$refs.nav.currindex = this.currentIndex;
        }
      }
    },
    //添加购物车
    addToCart(){
     const product = {}
     product.image = this.swiperImg[0];
     product.title = this.baseInfo.title;
     product.desc = this.baseInfo.desc;
     product.price = this.baseInfo.nowPrice;
     product.iid = this.iid;
     product.isCheck = false;
     this.$store.commit('addCart',product)

     this.$toast.show('添加成功', 2000)
    }
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid;
    //请求商品详情数据
    getDetailData(this.iid).then(res => {
      console.log(res);
      const data = res.data.result;
      this.swiperImg = data.itemInfo.topImages; //1、获取顶部图片 的 轮播数据
      //获取商品基本信息
      this.baseInfo = new BaseInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //获取店铺信息
      this.shop = new Shop(data.shopInfo);

      //获取商品图片详情
      this.imgDetail = data.detailInfo;

      //获取商品参数信息
      this.paramInfo = new Params(data.itemParams.info, data.itemParams.rule);

      //获取部分评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //请求推荐数据
    getRecommend().then(res => {
      this.productlist = res.data.data.list;
    });

    //给getTabY赋值(进行防抖）
    this.getTabY = debounce(() => {
      this.taboffsetTopY = [];
      this.taboffsetTopY.push(0);
      this.taboffsetTopY.push(this.$refs.params.$el.offsetTop - 44);
      this.taboffsetTopY.push(this.$refs.comment.$el.offsetTop - 44);
      this.taboffsetTopY.push(this.$refs.product.$el.offsetTop - 44);
    }, 200);
  },
  mounted() {
    //监听item中图片加载完成    debounce防抖,减少refresh()的使用频率
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$on("imgonLoad", () => {
      refresh(); //Scroll.vue的方法
    });
  },
};
</script>
<style scoped>
.detail {
  position: relative;
  background: #fff;
  z-index: 9;
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
  overflow: hidden;
}
.detailNavbar {
  position: relative;
  z-index: 9;
  background: #fff;
}
.back {
  z-index: 999;
}
</style>