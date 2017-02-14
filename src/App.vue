<template lang='pug'>
#app
  mt-tabbar.fixed-top(v-model='selected')
    mt-tab-item(id="home", href='/#/home') 首页
    mt-tab-item(id="front-end", href='/#/front-end') 前端
    mt-tab-item(id="ios", href='/#/ios') iOS
    mt-tab-item(id="android", href='/#/android') Android
    mt-tab-item(id="welfare", href='/#/welfare') 福利
  mt-spinner.spinner(v-show='isLoading', type="fading-circle", color='#3193DE', :size='36')
  .container
    router-view
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      selected: 'home',
      isLoading: false,
    };
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
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .container {
    padding-top: 26px;
  }
}

a {
  color: #000;
}

.fixed-top {
  position: fixed;
  bottom: inherit;
  z-index: 99;
  border-bottom: 1px solid #888;
}

.spinner {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 50%);
}
</style>
