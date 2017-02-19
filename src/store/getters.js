import {
  modes,
} from 'config';

// 返回模式相关样式属性对象
const modeStyle = state => modes[state.mode];

export default {
  modeStyle,
};
