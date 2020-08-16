<template>
  <div class="plItem" @click="imgdetail">
    <img :src="showimg"  @load="imgonload"/>
    <div class="plItem-info">
      <p>{{plItem.title}}</p>
      <span class="price">¥{{plItem.price}}</span>
      <span class="cfav">{{plItem.cfav}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    plItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imgonload(){
      this.$bus.$emit('imgonLoad')
    },
    imgdetail(){
      if(this.plItem.iid){
      this.$router.push('/detail/' + this.plItem.iid)
      }else{
        this.$router.push('/detail/' + this.plItem.item_id)
      }
    }
  },
  computed: {
    showimg(){
      return this.plItem.image || this.plItem.show.img
    },
  },
};
</script>
<style scoped>
  .plItem {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .plItem img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .plItem-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .plItem-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .plItem-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .plItem-info .cfav {
    position: relative;
  }

  .plItem-info .cfav::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/collect.svg") 0 0/14px 14px;
  }
</style>