import Vue from 'vue';
import Router from 'vue-router';
import Home from 'views/home';
import My from 'views/my';
import Discover from 'views/discover';
import Swiper from 'views/swiper';
import ContainerHome from 'components/home';
import FrontEnd from 'components/frontEnd';
import IOS from 'components/ios';
import Android from 'components/android';
import Welfare from 'components/welfare';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/home',
    component: Home,
    children: [{
      path: '',
      component: ContainerHome,
    }, {
      path: 'frontEnd',
      name: 'frontEnd',
      component: FrontEnd,
    }, {
      path: 'ios',
      name: 'ios',
      component: IOS,
    }, {
      path: 'android',
      name: 'android',
      component: Android,
    }, {
      path: 'welfare',
      name: 'welfare',
      component: Welfare,
    }, {
      path: '*',
      name: 'home',
      component: ContainerHome,
    }],
  }, {
    path: '/discover',
    name: 'discover',
    component: Discover,
  }, {
    path: '/my',
    name: 'my',
    component: My,
  }, {
    path: '/swiper',
    name: 'swiper',
    component: Swiper,
  }, {
    path: '*',
    component: Home,
  }],
});
