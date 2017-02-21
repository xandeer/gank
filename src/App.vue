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
    mt-tab-item(id="1", href='#/discover') 发现
    mt-tab-item(id="2", href='#/my') 我的
</template>

<script>
import { mapState, mapGetters } from 'vuex';

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
  height: 50px;
  box-shadow: 0 -1px 0px rgba(34, 25, 25, 0.4);

  .mint-tab-item.is-selected {
    background-color: inherit;
    color: inherit;
  }
}

.mint-tab-item {
  padding: 10px 0;
  color: #999;

  .mint-tab-item-label {
    font-size: 16px;
    line-height: 30px;
  }
}

.mint-header {
  height: 50px;
  font-size: 18px;
  letter-spacing: 0.5em;
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
</style>
