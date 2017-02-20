// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueLocalStorage from 'vue-localstorage';
import {
  InfiniteScroll,
  Lazyload,
  Button,
  Header,
  Tabbar,
  TabItem,
  Cell,
  Spinner,
  Switch,
} from 'mint-ui';
import 'mint-ui/lib/style.css';
import App from './App';
import router from './router';
import store from './store';

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
