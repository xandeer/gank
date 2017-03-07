<template lang='pug'>
#app(:style='modeStyle')
  transition(name='fade', mode='out-in')
    .mask(v-show='maskVisibility', @click='hideMask')
      .mask-img
        img(:src='maskImage')
  transition(name='fade', mode='out-in')
    router-view
  mt-tabbar(v-model='selected', fixed, :style='modeStyle', ref='tabbar')
    mt-tab-item(id="0", href='#/home') 首页
      span.iconfont.icon-home(slot="icon")
    mt-tab-item(id="1", href='#/discover') 发现
      span.iconfont.icon-discover(slot="icon")
    mt-tab-item(id="2", href='#/my') 我的
      span.iconfont.icon-my(slot="icon")
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { setFlex } from './utils/flexible';

export default {
  name: 'app',
  data() {
    return {
      selected: '0',
    };
  },
  computed: {
    ...mapState([
      'isLoading',
      'theme',
      'appSelected',
      'maskVisibility',
      'maskImage',
    ]),
    ...mapGetters([
      'modeStyle',
    ]),
  },
  methods: {
    hideMask() {
      this.$store.commit('updateMaskVisibility', false);
    },
    refreshTheme(index) {
      const bars = this.$refs.tabbar.$children;
      const selectedBar = bars[index].$el;

      for (let i = 0; i < bars.length; i += 1) {
        bars[i].$el.style.color = '#999';
      }
      selectedBar.style.color = this.theme;
    },
  },
  watch: {
    selected(index) {
      this.refreshTheme(index);
      this.$store.commit('updateAppSelected', index);
    },
    theme() {
      this.refreshTheme(this.selected);
    },
    appSelected(selected) {
      this.selected = selected;
    },
  },
  created() {
    const localMode = this.$localStorage.get('mode');
    const localTheme = this.$localStorage.get('theme');

    if (localMode !== 'mode') {
      this.$store.commit('updateMode', localMode);
    }
    if (localTheme !== 'theme') {
      this.$store.commit('updateTheme', localTheme);
    }
  },
  mounted() {
    setFlex(window, window.lib || (window.lib = {}));
    this.refreshTheme(this.selected);
    this.selected = this.appSelected;
  },
  updated() {
    if (this.selected !== '0') {
      this.$nextTick(this.hideMask);
    }
  },
};
</script>

<style lang='scss'>
@import url('//at.alicdn.com/t/font_0j6ycruegu7q4cxr.css');
// @import './style/common';

* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
  text-align: center;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  overflow: hidden;
}

.mint-tabbar {
  height: 4em;
  box-shadow: 0 -1px 0px rgba(34, 25, 25, 0.4);

  .mint-tab-item.is-selected {
    background-color: inherit;
    color: inherit;
  }
}

.mint-tab-item {
  color: #999;

  .mint-tab-item-label {
    font-size: 0.9em;
  }
  .mint-tab-item-icon {
    width: 2em;
    height: 2em;
    margin-bottom: 0.5em;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 2;
  background-color: hsla(220, 7%, 25%, 0.95);
  display: flex;
  align-items: center;

  .mask-img {
    flex: 1;
    background-color: hsla(220, 7%, 25%, 0.8);

    img {
      width: 100%;
    }
  }
}

.iconfont {
  text-align: center;
  font-size: 2em;
}

a {
  text-decoration: none !important;
}

.mint-header{
  font-size: 1.5em;
  height: 2em;
}

.mint-header-button {
  height: 2em;
  .mint-button {
    height: 100%;
    .mintui {
      font-size: 1em;
    }
  }
}

</style>
