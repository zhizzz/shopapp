<template>
  <swiper class="detailswiper">
    <swiper-slide v-for="(item,index) in swiperImgs" :key="index">
        <img :src="item"/>
    </swiper-slide>
  </swiper>
</template>

<script>
  import {Swiper, SwiperSlide} from 'components/common/swiper/index';
  export default {
    name: "HomeSwiper",
    props: {
      swiperImgs:Array
    },
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
      }
    },
    methods: {
    },
  }
</script>

<style scoped>
.detailswiper{
    width: 100%;
    height: 300px;
}
</style>