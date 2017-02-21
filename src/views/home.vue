<template lang="pug">
  swiper(:options="swiperOption", ref='swiper', :style='modeStyle')
    swiper-slide(v-for="slide in swiperSlides")
      .container
        contents(:type='slide', :ref='slide')
    .swiper-pagination(slot="pagination", :style='modeStyle')
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { swiperPlugins } from 'vue-awesome-swiper';
import contents from 'components/contents';

const TAB_NAME = ['首页', '前端', 'iOS', 'Android', '福利'];

export default {
  name: 'home',
  components: {
    contents,
  },
  computed: {
    ...mapGetters([
      'modeStyle',
    ]),
    ...mapState([
      'theme',
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
  methods: {
    refreshTheme() {
      const swiper = this.$refs.swiper.swiper;
      const previousPagination = swiper.bullets[swiper.previousIndex];
      const currentPagination = swiper.bullets[swiper.activeIndex];

      previousPagination.style.color = '#999';
      currentPagination.style.color = this.theme;
      currentPagination.style.borderColor = this.theme;
    },
  },
  created() {
    const that = this;
    swiperPlugins.debugger = function swiperCallback(swiper) {
      return {
        onPaginationRendered(swp, paginationContainer) {
          const currentPagination = paginationContainer.childNodes[swp.activeIndex];
          if (currentPagination) {
            currentPagination.style.color = that.theme;
            currentPagination.style.borderColor = that.theme;
          }
        },
        onSlideChangeStart() {
          const container = that.$refs[that.homeSelected][0].$el;

          that.$store.commit('updateScrollY', {
            type: that.homeSelected,
            scrollY: container.scrollTop,
          });

          that.refreshTheme();
        },
        onSlideChangeEnd() {
          const type = that.swiperSlides[swiper.activeIndex];
          const scrollY = that.$store.state[type].scrollY;
          const container = that.$refs[type][0].$el;

          if (scrollY === 0 && that.$store.state[type].datas.length === 0) {
            that.$store.dispatch('datasAsync', type);
          }
          that.$store.commit('updateHomeSelected', type);
          container.scrollTop = scrollY;
        },
      };
    };
  },
  mounted() {
    const swiper = this.$refs.swiper.swiper;
    const index = this.swiperSlides.indexOf(this.homeSelected);

    for (let i = 0; i < this.swiperSlides.length; i += 1) {
      const type = this.swiperSlides[i];
      const container = this.$refs[type][0].$el;
      const scrollY = this.$store.state[type].scrollY;
      container.scrollTop = scrollY;
    }

    swiper.slideTo(index, 0);
  },
  beforeDestroy() {
    const container = this.$refs[this.homeSelected][0].$el;
    const scrollY = container.scrollTop;

    this.$store.commit('updateScrollY', {
      type: this.homeSelected,
      scrollY,
    });
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
  overflow: hidden;
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
  font-size: 18px;
  border-bottom: 2px solid transparent;
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
