<template>
  <div v-if="Object.keys(imgDetail).length !== 0" class="imgDetail-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{imgDetail.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{imgDetail.detailImage[0].key}}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in imgDetail.detailImage[0].list"
        :src="item"
        alt
        :key="index"
        @load="Dimgonload"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailImginfo",
  props: {
    imgDetail: {
      type: Object
    }
  },
  data() {
    return {
      counter:0,
      imagesLength:0
    };
  },
  methods: {
    Dimgonload() {
      // 判断 当所有的图片都加载完了，才能进行一次回调
        if(++this.counter === this.imagesLength) {
          this.$emit('imgonLoad');
        }
    }
  },
  watch: {
      imgDetail() {
        //获取图片的个数
        this.imagesLength = this.imgDetail.detailImage[0].list.length;
      }
    }
};
</script>

<style scoped>
.imgDetail-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.info-desc {
  padding: 0 15px;
}
.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}
.info-desc .start {
  float: left;
}
.info-desc .end {
  float: right;
}
.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}
.info-desc .end::after {
  right: 0;
}
.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}
.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}
.info-list img {
  width: 100%;
}
</style>