<template lang="pug">
#my(:style='modeStyle')
  mt-header(title='我的', fixed, :style='themeBg')
  .my-container
    a.mint-cell.link-gank(href='http://gank.io', target='_blank', :style='cellBg')
      span.circle(:style='themeBg') Gank
      span Gank.io
      span.mint-cell-allow-right
    a.mint-cell.theme(href='#/my/theme', :style='cellBg') 主题颜色
      span.mint-cell-allow-right
    a.mint-cell.mode(:style='cellBg') 夜间模式
      mt-switch.mode-switch(v-model='nightSwitch')
    a.mint-cell.github(href='https://github.com/xandeer', target='_blank', :style='cellBg') Xandeer's Github
      span.mint-cell-allow-right
    a.mint-cell.source(href='https://github.com/xandeer/gank', target='_blank', :style='cellBg') 看看源码
      span.mint-cell-allow-right
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
      'mode',
      'theme',
    ]),
    ...mapGetters([
      'modeStyle',
    ]),
    themeBg() {
      return {
        backgroundColor: this.theme,
      };
    },
    cellBg() {
      return {
        backgroundColor: this.modeStyle.cellBg,
      };
    },
    isNight() {
      return this.mode === 'night';
    },
  },
  watch: {
    nightSwitch(val) {
      if (val) {
        this.$store.commit('updateMode', 'night');
        this.$localStorage.set('mode', 'night');
        document.body.style.opacity = 0.9;
      } else {
        this.$store.commit('updateMode', 'day');
        this.$localStorage.set('mode', 'day');
      }
    },
  },
  created() {
    this.nightSwitch = this.isNight;
    this.$store.commit('updateAppSelected', 2);
  },
};
</script>

<style lang="scss" scoped>
#my {
  padding: 50px 0;
  height: 100vh;
  margin-right: -100px;
  padding-right: 100px;
  overflow: auto;
}

.mint-cell {
  text-align: left;
  background-image: none;
  height: 48px;
  line-height: 48px;
  padding-left: 20px;
}

.mint-cell-allow-right::after {
  width: 10px;
  height: 10px;
}

.link-gank {
  height: 100px;
  line-height: 100px;
  font-size: 20px;
  position: relative;
  margin-top: 20px;

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
}

.mode {
  position: relative;

  .mode-switch {
    display: inline-block;
    width: 52px;
    height: 32px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.github, .theme {
  margin-top: 20px;
  border-bottom: 1px solid #ccc;
}

</style>
