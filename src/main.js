import 'mint-ui/lib/style.css';

import {
  Button,
  Cell,
  Header,
  InfiniteScroll,
  Lazyload,
  Spinner,
  Switch,
  TabItem,
  Tabbar,
} from 'mint-ui';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueLocalStorage from 'vue-localstorage';
import VueResource from 'vue-resource';
import router from './router';
import store from './store';
import App from './App';

Vue.use(VueResource);
Vue.use(VueAwesomeSwiper);
Vue.use(InfiniteScroll);
Vue.use(VueLocalStorage);
Vue.use(Lazyload);

Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Cell.name, Cell);
Vue.component(Spinner.name, Spinner);
Vue.component(Switch.name, Switch);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
  },
  localStorage: {
    mode: {
      type: String,
      default: 'mode',
    },
    theme: {
      type: String,
      default: 'theme',
    },
  },
});
