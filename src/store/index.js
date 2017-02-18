import Vue from 'vue';
import Vuex from 'vuex';
import * as mutations from './mutations';
import * as actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const state = {
  // 是否在请求数据
  isLoading: false,
  // 模式选择：day | night
  modeType: 'day',
  // 当前主题颜色索引值
  themeIndex: 0,
  // 首页展示项：home | frontEnd | ios | android | welfare
  homeSelected: 'home',
  // 首页美女图片信息
  beauty: null,

  // 数据及页面位置缓存
  random: {
    datas: [],
    page: 1,
    type: 'random',
    scrollY: 0,
  },
  home: {
    datas: [],
    page: 1,
    type: 'all',
    scrollY: 0,
  },
  frontEnd: {
    datas: [],
    page: 1,
    type: '前端',
    scrollY: 0,
  },
  ios: {
    datas: [],
    page: 1,
    type: 'iOS',
    scrollY: 0,
  },
  android: {
    datas: [],
    page: 1,
    type: 'Android',
    scrollY: 0,
  },
  welfare: {
    datas: [],
    page: 1,
    type: '福利',
    scrollY: 0,
  },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
});
