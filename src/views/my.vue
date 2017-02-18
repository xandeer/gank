<template lang="pug">
#my(:style='mode')
  mt-header(title='我的', fixed, :style='themeBg')
  .container
    a.mint-cell.link-gank(href='http://gank.io', target='_blank', :style='cellBg')
      span.circle(:style='themeBg') Gank
      span Gank.io
      span.mint-cell-allow-right
    a.mint-cell.theme(href='#/my/theme', :style='cellBg') 主题颜色
      span.mint-cell-allow-right
    mt-cell(title='夜间模式', :style='cellBg')
      mt-switch(v-model='nightSwitch')
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'my',
  data() {
    return {
      nightSwitch: false,
    };
  },
  computed: {
    ...mapState([
      'modeType',
    ]),
    ...mapGetters([
      'mode',
      'theme',
    ]),
    themeBg() {
      return {
        backgroundColor: this.theme,
      };
    },
    cellBg() {
      return {
        backgroundColor: this.mode.cellBg,
      };
    },
    isNight() {
      return this.modeType === 'night';
    },
  },
  watch: {
    nightSwitch(val) {
      if (val) {
        this.$store.commit('updateMode', 'night');
      } else {
        this.$store.commit('updateMode', 'day');
      }
    },
  },
  created() {
    this.nightSwitch = this.isNight;
  },
};
</script>

<style lang="scss" scoped>
#my {
  background-color: #F4F4F4;
  height: 100vh;
}

.mint-cell {
  text-align: left;
  background-image: none;
}

.theme {
  line-height: 48px;
  padding-left: 10px;
}

.link-gank {
  height: 100px;
  line-height: 100px;
  padding: 0 10px;
  font-size: 20px;
  position: relative;
  margin-top: 70px;
  margin-bottom: 20px;

  .circle {
    display: inline-block;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 50%;
    background-color: #26a2ff;
    color: #fff;
    margin-right: 20px;
  }

  .mint-cell-allow-right::after {
    width: 10px;
    height: 10px;
  }
}
</style>
