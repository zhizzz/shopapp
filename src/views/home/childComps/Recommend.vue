<template>
  <div class="recommend_box">
    <div class="recommend_content" v-for="(recommend,index) in recommends" :key="index">
      <a href>
        <img :src="recommend.image" alt />
        <div>{{recommend.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "Recommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style scoped>
.recommend_box{
    display: flex;
    width: 100%;
    text-align: center;
    border-bottom: 8px solid #eee;
}
.recommend_content{
   flex: 1;
   font-size: 12px;
   padding: 10px 0px 20px 0px;

}
.recommend_content img{
   width: 80%;
}
</style>