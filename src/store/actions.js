/* eslint-disable no-shadow, no-param-reassign */
import Vue from 'vue';

export const datasAsync = ({
  commit,
  state,
}, type) => {
  commit('updateLoading', true);
  Vue.http.get(
      `http://gank.io/api/data/${state[type].type}/10/${state[type].page}`)
    .then((response) => {
      commit('updateDatas', {
        datas: response.body.results,
        type,
      });
      // Vue.nextTick(() => {
      commit('updateLoading', false);
      // });
    });
};

export const beautyAsync = ({
  commit,
}) => {
  commit('updateLoading', true);
  Vue.http.get(
      'http://gank.io/api/data/福利/1/1')
    .then((response) => {
      commit('updateBeauty', response.body.results[0]);
      Vue.nextTick(() => {
        commit('updateLoading', false);
      });
    });
};
