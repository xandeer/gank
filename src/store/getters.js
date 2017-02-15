import {
  themes,
} from 'config';

/* eslint-disable no-confusing-arrow */
const theme = (state) => {
  if (state.isNight) {
    return themes.night;
  }
  return themes[state.themeType];
};

export default {
  theme,
};
