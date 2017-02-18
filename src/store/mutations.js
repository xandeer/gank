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

// 更新数据缓存
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

// 更新首页展示项
export const updateHomeSelected = (state, selected) => {
  state.homeSelected = selected;
};

// 更新页面滚动位置，为下一次回到此页时定位在离开时的位置
export const updateScrollY = (state, {
  type,
  scrollY,
}) => {
  state[type].scrollY = scrollY;
};
