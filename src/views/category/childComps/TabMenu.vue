<template>
  <div id="tab-menu">
    <scroll id="wrapper">
      <div class="menu-list">
        <div
          class="menu-list-item"
          :class="{active:index===currIndex}"
          v-for="(item, index) in categorys"
          :key="index"
          @click="itemClick(index)"
        >{{item.title}}</div>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "TabMenu",
  components: {
    Scroll
  },
  props: {
    categorys: Array
  },
  data() {
    return {
      currIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currIndex = index;
      this.$emit('tabClick',index)
    }
  }
};
</script>
<style scoped>
#tab-menu {
  background-color: #f6f6f6;
  height: 100vh;
}
.wrapper {
  height: calc(100% - 49px - 44px);
  overflow: hidden;
}

.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>