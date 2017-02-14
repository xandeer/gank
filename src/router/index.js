import Vue from 'vue';
import Router from 'vue-router';
import Home from 'views/home';
import FrontEnd from 'views/frontEnd';
import IOS from 'views/ios';
import Android from 'views/android';
import Welfare from 'views/welfare';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
  }, {
    path: '/front-end',
    name: 'frontEnd',
    component: FrontEnd,
  }, {
    path: '/ios',
    name: 'ios',
    component: IOS,
  }, {
    path: '/android',
    name: 'android',
    component: Android,
  }, {
    path: '/welfare',
    name: 'welfare',
    component: Welfare,
  }, {
    path: '*',
    component: Home,
  }],
});
