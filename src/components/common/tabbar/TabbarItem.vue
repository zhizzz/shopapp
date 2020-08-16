<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="cssActive">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabbarItem",
  props: {
    path: String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data() {
    return {
      // isActive: true
    };
  },
  computed: {
    isActive(){
      return this.$route.path.includes(this.path)
      // return this.$route.path.indexOf(this.path) !== -1
    },
    cssActive(){
      return this.isActive? {color:this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path)
    }
  }
};
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
}
.tab-bar-item img {
  height: 24px;
  widows: 24px;
  vertical-align: middle;
  margin-top: 3px;
  margin-bottom: 2px;
}
.active {
  color: red;
}
</style>