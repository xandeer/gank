<template lang='pug'>
#home
  mt-tabbar.fixed-top(v-model='selected', :style='theme')
    mt-tab-item(id="home", href='#/home') 首页
    mt-tab-item(id="front-end", href='#/home/front-end') 前端
    mt-tab-item(id="ios", href='#/home/ios') iOS
    mt-tab-item(id="android", href='#/home/android') Android
    //- mt-tab-item(id="welfare", icon='more', href='#/home/welfare') 福利
    //- mt-button(icon='more')
  .container
    router-view
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      selected: 'home',
    };
  },
  computed: {
    ...mapGetters([
      'theme',
    ]),
  },
};
</script>

<style lang='scss'>
#home {
  width: 100vw;
}

.container {
  padding-top: 36px;
}

.fixed-top {
  position: fixed;
  bottom: inherit;
  z-index: 99;
  box-shadow: 0 1px 2px rgba(34, 25, 25, 0.4);
  background-position: left bottom;
}
</style>
