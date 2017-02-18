import Vue from 'vue';
import Vuex from 'vuex';
import * as mutations from './mutations';
import * as actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const state = {
  isLoading: false,
  isNight: false,
  themeType: 'day',
  homeSelected: 'home',
  beauty: null,
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
