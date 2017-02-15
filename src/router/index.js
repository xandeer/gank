import Vue from 'vue';
import Router from 'vue-router';
import Home from 'views/home';
import My from 'views/my';
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
      path: 'front-end',
      component: FrontEnd,
    }, {
      path: 'ios',
      component: IOS,
    }, {
      path: 'android',
      component: Android,
    }, {
      path: 'welfare',
      component: Welfare,
    }, {
      path: '*',
      name: 'home',
      component: ContainerHome,
    }],
  }, {
    path: '/my',
    name: 'my',
    component: My,
  }, {
    path: '*',
    component: Home,
  }],
});
