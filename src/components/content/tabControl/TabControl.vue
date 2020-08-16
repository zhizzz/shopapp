<template>
  <div class="tabControl">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tabControl-item"
      :class="{ active: index === currindex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currindex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currindex = index;
      this.$emit('tabClick',index)
    }
  }
};
</script>
<style scoped>
.tabControl {
  display: flex;
  font-size: 14px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  z-index: 999;
}
.tabControl-item {
  flex: 1;
}
.tabControl-item span {
  padding: 5px;
}
.active {
  color: var(--color-text);
}
.active span {
  border-bottom: 3px solid var(--color-text);
}
</style>
