/* eslint-disable no-shadow, no-param-reassign */

export const updateLoading = (state, isLoading) => {
  state.isLoading = isLoading;
};

export const updateNight = (state, isNight) => {
  state.isNight = isNight;
};

// 当前只支持 ‘day’ | 'night'
export const updateTheme = (state, type) => {
  state.themeType = type;
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
