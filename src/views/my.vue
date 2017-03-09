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
  padding: 4em 0;
  min-height: 100vh;
  overflow: auto;
}

.mint-cell {
  font-size: 1.5em;
  text-align: left;
  background-image: none;
  height: 3em;
  line-height: 3em;
  padding-left: 1em;
}

.mint-cell-allow-right::after {
  width: 1em;
  height: 1em;
  margin-right: 1em;
}

.link-gank {
  height: 5em;
  line-height: 5em;
  font-size: 1.5em;
  position: relative;
  margin-top: 2em;

  .circle {
    display: inline-block;
    width: 4em;
    height: 4em;
    line-height: 4em;
    text-align: center;
    border-radius: 50%;
    background-color: #26a2ff;
    color: #fff;
    margin-right: 1em;
  }
}

.mode {
  position: relative;

  .mode-switch {
    display: inline-block;
    width: 3.5em;
    height: 1.8em;
    position: absolute;
    right: 1em;
    top: 50%;
    transform: translateY(-50%);
  }
}

.github, .theme {
  margin-top: 2em;
  border-bottom: 1px solid #ccc;
}
</style>

<style lang="scss">
.mint-switch-core {
  width: 100%;
  height: 100%;
  border-radius: 1.5em;
  line-height: 1.5em;

  &:before {
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    border-radius: calc(1.5em - 1px);
    margin-top: 1px;
    margin-left: 1px;
  }
  &:after {
    width: calc(50% - 2px);
    height: calc(100% - 2px);
    border-radius: 50%;
    margin-top: 1px;
    margin-left: 1px;
  }
}

.mint-switch-input:checked + .mint-switch-core::after {
  transform: translateX(calc(100% + 2px));
}
</style>
