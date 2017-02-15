<template lang='pug'>
#app(:style='theme')
  mt-tabbar(v-model='selected', fixed, :style='theme')
    mt-tab-item(id="home", href='#/home') 首页
    mt-tab-item(id="discover", href='#/discover') 发现
    mt-tab-item(id="my", href='#/my') 我的
  mt-spinner.spinner(v-show='isLoading', type="fading-circle", color='#3193DE', :size='36')
  router-view
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'app',
  data() {
    return {
      selected: 'home',
    };
  },
  computed: {
    ...mapState([
      'isLoading',
    ]),
    ...mapGetters([
      'theme',
    ]),
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
}

.mint-tabbar {
  height: 40px;
  box-shadow: 0 -1px 0px rgba(34, 25, 25, 0.4);
  a {
    color: #666;
  }

  .mint-tab-item {
    padding: 10px 0;

    &.is-selected {
      background-color: inherit;
    }
  }

  .mint-tab-item-label {
    font-size: 16px;
  }
}

.spinner {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 50%);
}

a {
  color: #000;
}
</style>
