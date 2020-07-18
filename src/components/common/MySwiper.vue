<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide><img src="~assets/images/swiper1.jpg" alt=""></swiper-slide>
    <swiper-slide><img src="~assets/images/swiper2.jpg" alt=""></swiper-slide>
    <swiper-slide><img src="~assets/images/swiper3.jpg" alt=""></swiper-slide>
    <swiper-slide><img src="~assets/images/swiper4.jpg" alt=""></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "MySwiper",
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable :true,
          // bulletClass : 'my-bullet',
        },
        loop: true,
        autoplay:true,
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  mounted() {
    // console.log("Current Swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false);
  }
};
</script>

<style scoped>
.swiper-container {
  height: 350px;
}

.my-bullet {
  width: 20px;
  height: 20px;
  background: #000;
}
</style>