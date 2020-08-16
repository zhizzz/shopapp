<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      bscroll: null
    };
  },
  props: {
    probetype: Number,
    pullupload: Boolean
  },
  methods: {
    scrollTo(x, y, time) {
      this.bscroll.scrollTo(x, y, time);
    },
    finishpullup() {
      this.bscroll.finishPullUp();
    },
    refresh() {
      this.bscroll && this.bscroll.refresh();
    }
  },
  mounted() {
    this.bscroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probetype,
      click: true, //监听内部点击
      pullUpLoad: this.pullupload //监听上下拉动
    });
    //监听滚动的位置
    this.bscroll.on("scroll", position => {
      this.$emit("scroll", position);
    });
    //监听滚动到底部
    this.bscroll.on("pullingUp", () => {
      this.$emit("loadmore");
    });
  }
};
</script>