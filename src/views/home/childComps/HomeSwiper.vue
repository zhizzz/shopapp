<template>
  <swiper v-if="banners.length>0">
    <swiper-slide v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt @load="imgOnload" />
      </a>
    </swiper-slide>
  </swiper>
</template>

<script>
  import {Swiper, SwiperSlide} from 'components/common/swiper/index'
  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        sentOnce:false
      }
    },
    methods: {
      imgOnload(){
        if (!this.sentOnce) {
        this.$emit('imgonload')
        this.sentOnce = true//只需要发送一次就可以获取offsetTop的值了
      }
       }
    },
  }
</script>

<style scoped>
</style>