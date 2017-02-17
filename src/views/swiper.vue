<template lang="pug">
#swiper
  swiper(:options="swiperOption", ref='swiper')
    swiper-slide(v-for="slide in swiperSlides")
      .container
        contents(:type='slide')
    .swiper-pagination(slot="pagination", :style='theme')
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import contents from 'components/contents';

const TAB_NAME = ['首页', '前端', ' iOS', 'Android', ' 福利'];

export default {
  name: 'swiper-test',
  components: {
    contents,
  },
  computed: {
    ...mapGetters([
      'theme',
    ]),
    ...mapState([
      'homeSelected',
    ]),
  },
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 30,
        paginationBulletRender(swiper, index, className) {
          return `<div class="${className} swiper-pagination-bullet-custom">${TAB_NAME[index]}</div>`;
        },
      },
      swiperSlides: ['home', 'frontEnd', 'ios', 'android', 'welfare'],
    };
  },
  mounted() {
    const swiper = this.$refs.swiper.swiper;
    swiper.slideTo(this.swiperSlides.indexOf(this.homeSelected), 0);
    swiper.onTransitionEnd = () => {
      this.$store.commit('updateHomeSelected', this.swiperSlides[swiper.activeIndex]);
    };
  },
};
</script>

<style lang='scss'>
.swiper-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.container {
  padding-top: 50px;
}

.swiper-item {
  height: 100%;
}

.swiper-pagination-bullet-custom {
  width: 100% !important;
  flex: 1;
  height: 100% !important;
  margin:0 !important;
  text-align: center;
  line-height: 50px;
  color: #999999;
  background-color: inherit;
  border-radius: 0 !important;
  opacity: 1 !important;
}

.swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
  color: #26a2ff;
  font-size: 18px;
  border-bottom: 2px solid #26a2ff;
  background: inherit;
  background-color: inherit;
}

.swiper-pagination {
  position: fixed;
  top: 0;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100% !important;
  border-bottom: 1px solid #666;
}
</style>
