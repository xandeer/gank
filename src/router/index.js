import Vue from 'vue';
import Router from 'vue-router';
import Home from 'views/home';
import My from 'views/my';
import Discover from 'views/discover';
import Theme from 'views/theme';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/home',
    component: Home,
    name: 'home',
  }, {
    path: '/discover',
    name: 'discover',
    component: Discover,
  }, {
    path: '/my',
    name: 'my',
    component: My,
  }, {
    path: '/my/theme',
    name: 'theme',
    component: Theme,
  }, {
    path: '*',
    component: Home,
  }],
});
