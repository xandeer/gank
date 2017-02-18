<template lang='pug'>
#app(:style='mode')
  mt-spinner.spinner(v-show='isLoading', type="fading-circle", color='#3193DE', :size='36')
  transition(name='fade', mode='out-in')
    router-view
  mt-tabbar(v-model='selected', fixed, :style='mode', ref='tabbar')
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
    ]),
    ...mapGetters([
      'mode',
      'theme',
    ]),
  },
  methods: {
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
    },
    theme() {
      this.refreshTheme(this.selected);
    },
  },
  mounted() {
    this.refreshTheme(this.selected);
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
  min-height: 100vh;
  height: 100vh;
  overflow-y: hidden;
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

.spinner {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 50%);
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
</style>
