/* eslint-disable no-shadow, no-param-reassign */

export const updateLoading = (state, isLoading) => {
  state.isLoading = isLoading;
};

// 只支持 ‘day’ | 'night'
export const updateMode = (state, type) => {
  state.modeType = type;
};

export const updateThemeIndex = (state, index) => {
  state.themeIndex = index;
};

export const updateDatas = (state, {
  type,
  datas,
}) => {
  state[type].datas = state[type].datas.concat(datas);
  state[type].page += 1;
};

export const updateBeauty = (state, beauty) => {
  state.beauty = beauty;
};

export const updateHomeSelected = (state, selected) => {
  state.homeSelected = selected;
};

export const updateScrollY = (state, {
  type,
  scrollY,
}) => {
  state[type].scrollY = scrollY;
};
