<template>
  <div class="DetailNavbar">
    <nav-bar class="detail-nav">
      <div slot="left" class="left">
        <img src="~assets/img/tabbar/back.svg" alt @click="back" />
      </div>

      <div slot="center" class="title">
        <span
          class="title-item"
          v-for="(item, index) in centertitles"
          :key="index"
          :class="{'active': index===currindex}"
          @click="tabClick(index)"
        >{{item}}</span>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavbar",
  data() {
    return {
      centertitles: ["商品", "参数", "评论", "推荐"],
      currindex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    //监听点击对应的tab
    tabClick(index) {
      this.currindex = index;
      this.$emit("tabClick", index);
    },
    //返回
    back() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.left img {
  width: 25px;
  height: 25px;
  padding-top: 10px;
}
.detail-nav {
  background-color: #fff;
  font-weight: normal;
}
.title {
  display: flex;
  padding: 0 20px;
  font-size: 14px;
}
.title-item {
  flex: 1;
}
.title-item.active {
  color: var(--color-high-text);
}
</style>