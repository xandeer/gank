<template lang="pug">
#swiper
  swiper(:options="swiperOption")
    swiper-slide(v-for="slide in swiperSlides") Slide {{ slide }}
      contents(:type='slide')
    .swiper-pagination(slot="pagination")
    //- .swiper-button-prev(slot="button-prev")
    //- .swiper-button-next(slot="button-next")
</template>

<script>
import contents from 'components/contents';

const TAB_NAME = ['首页', '前端', ' iOS', 'Android', ' 福利'];

export default {
  name: 'swiper-test',
  components: {
    contents,
  },
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        pagination: '.swiper-pagination',
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        // slidesPerView: 4,
        // centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30,
        paginationBulletRender(swiper, index, className) {
          return `<div class="${className} swiper-pagination-bullet-custom">${TAB_NAME[index]}</div>`;
        },
        onTransitionStart(swiper) {
          console.log(swiper);
        },
      },
      swiperSlides: ['home', 'frontEnd', 'ios', 'android', 'welfare'],
    };
  },
};
</script>

<style lang='scss'>
.swiper-container {
  width: 100%;
  height: 100%;
  // height: 100vh;
  margin: 0 auto;
}
.swiper-item {
  height: 100%;
}
.swiper-pagination-bullet-custom {
  width: 100% !important;
  height: 100% !important;
  margin:0 !important;
  text-align: center;
  line-height: 50px;
  color: #999999;
  border-radius: 0 !important;
  background: #fff !important;
  opacity: 1 !important;
}
.swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
  color: #03a9f4;
  background: #03a9f4;
  font-size: 20px
}
.swiper-pagination{
  top:0;
  height:50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width:100%;
}
</style>
