<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="categoryCentent">
      <tab-menu :categorys="categorys" @tabClick="tabClick" class="tab-menu" />
      <scroll class="wrapper">
        <tab-content :subcategorys="subcategorys" />
        <tab-control :titles="['综合', '新品', '销量']"></tab-control>
      </scroll>
    </div>
  </div>
</template>
<script>
import { getCategory, getSubcategory } from "network/category";

import NavBar from "components/common/navbar/NavBar";
import TabMenu from "./childComps/TabMenu";
import TabContent from "./childComps/TabContent";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    TabContent,
    Scroll,
    TabControl
  },
  data() {
    return {
      categorys: [],
      tabIndex: -1,
      subcategorys: {}
    };
  },
  methods: {
    //分类左导航点击事件
    tabClick(index) {
      this.tabIndex = index;
      //点击不同的类型显示请求不同的数据
      if (this.tabIndex != -1) {
        this._getSubcategory();
      }
    },
    //请求分类数据内容
    _getSubcategory() {
      getSubcategory(this.categorys[this.tabIndex].maitKey).then(res => {
        this.subcategorys = {}; //将之前保存的数据情况再赋值
        this.subcategorys = res.data.data;
      });
    }
  },
  created() {
    //请求分类数据
    getCategory().then(res => {
      const data = res.data.data.category.list;
      this.categorys = data;
      //请求第一个分类的数据
      getSubcategory(data[0].maitKey).then(res => {
        this.subcategorys = res.data.data;
      });
    });
  }
};
</script>
<style scoped>
.nav-bar {
  background-color: var(--color-text);
  color: #fff;
  z-index: 999;
}
.categoryCentent {
  height: 100vh;
  display: flex;
}
.tab-menu {
  flex: 2;
}
.wrapper {
  flex: 5;
  height: calc(100% - 49px - 44px);
  overflow: hidden;
}
</style>