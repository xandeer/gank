import {
  modes,
  themes,
} from 'config';

const mode = state => modes[state.modeType];

const theme = state => themes[state.themeIndex];

export default {
  mode,
  theme,
};
