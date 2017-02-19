import {
  modes,
} from 'config';

// 返回模式相关样式属性对象
const mode = state => modes[state.modeType];

export default {
  mode,
};
