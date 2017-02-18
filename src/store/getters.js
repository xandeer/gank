import {
  modes,
  themes,
} from 'config';

// 返回模式相关样式属性对象
const mode = state => modes[state.modeType];

// 返回当前设置的主题颜色，如 '#26a2ff'
const theme = state => themes[state.themeIndex];

export default {
  mode,
  theme,
};
