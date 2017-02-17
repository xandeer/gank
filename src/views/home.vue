<template lang="pug">
  swiper(:options="swiperOption", ref='swiper')
    swiper-slide(v-for="slide in swiperSlides")
      contents.container(:type='slide', :id='slide', :ref='slide')
    .swiper-pagination(slot="pagination", :style='theme')
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { swiperPlugins } from 'vue-awesome-swiper';
import contents from 'components/contents';

const TAB_NAME = ['首页', '前端', ' iOS', 'Android', ' 福利'];

export default {
  name: 'home',
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
  created() {
    const that = this;
    swiperPlugins.debugger = function swiperCallback(swiper) {
      return {
        onSlideChangeStart() {
          const container = that.$refs[that.homeSelected][0];
          that.$store.commit('updateScrollY', {
            type: that.homeSelected,
            scrollY: container.scrollTop,
          });
        },
        onSlideChangeEnd() {
          const type = that.swiperSlides[swiper.activeIndex];
          const scrollY = that.$store.state[type].scrollY;
          const container = that.$refs[that.homeSelected][0];

          that.$store.commit('updateHomeSelected', type);

          if (scrollY === 0 && that.$store.state[type].datas.length === 0) {
            that.$store.dispatch('datasAsync', type);
          } else {
            container.scrollTop = scrollY;
          }
        },
      };
    };
  },
  mounted() {
    const swiper = this.$refs.swiper.swiper;
    const index = this.swiperSlides.indexOf(this.homeSelected);
    const container = this.$refs[this.homeSelected][0].$el;
    const scrollY = this.$store.state[this.homeSelected].scrollY;

    swiper.slideTo(index, 0);
    container.scrollTop = scrollY;
  },
  beforeDestroy() {
    const container = this.$refs[this.homeSelected][0].$el;
    this.$store.commit('updateScrollY', {
      type: this.homeSelected,
      scrollY: container.scrollTop,
    });
  },
};
</script>

<style lang='scss'>
.swiper-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}

.container {
  padding: 50px 0;
  height: 100vh;
  margin-right: -100px;
  padding-right: 100px;
  overflow: auto;
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
