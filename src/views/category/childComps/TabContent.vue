<template>
  <div id="tabcontent">
      <div v-for="(item,index) in subcategorys.list" :key="index" class="content">
         <a :href="item.link">
        <img :src="item.image"/>
        <div>{{item.title}}</div>
         </a>
      </div>
  </div>
</template>
<script>
export default {
  name: "TabContent",
  props: {
    subcategorys: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style scoped>
#tabcontent{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
.content{
  flex: 1;
  text-align: center;
  padding: 10px 0px;
}
.content img {
  width: 100px;
  height: 100px;
}

</style>