// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import MintUI from 'mint-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'mint-ui/lib/style.css';
import App from './App';
import router from './router';
import store from './store';

Vue.use(VueResource);
Vue.use(MintUI);
Vue.use(VueAwesomeSwiper);

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition;
  }
  const position = {};
  // new navigation.
  // scroll to anchor by returning the selector
  if (to.hash) {
    position.selector = to.hash;
  }
  // check if any matched route config has meta that requires scrolling to top
  if (to.matched.some(m => m.meta.scrollToTop)) {
    // cords will be used if no selector is provided,
    // or if the selector didn't match any element.
    position.x = 0;
    position.y = 0;
  }
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  return false;
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  scrollBehavior,
  router,
  store,
  template: '<App/>',
  components: {
    App,
  },
});
