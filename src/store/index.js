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
  beauty: null,
  home: {
    datas: [],
    page: 1,
    type: 'all',
  },
  frontEnd: {
    datas: [],
    page: 1,
    type: '前端',
  },
  ios: {
    datas: [],
    page: 1,
    type: 'iOS',
  },
  android: {
    datas: [],
    page: 1,
    type: 'Android',
  },
  welfare: {
    datas: [],
    page: 1,
    type: '福利',
  },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
});
