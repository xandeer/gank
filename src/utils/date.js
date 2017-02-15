/**  计算输入时间和当前时间的差
 *  @param {string} str ISO 8601扩展格式，如：2017-02-10T11:38:22.122Z
 *  @return {string} 一分钟内返回‘刚刚’，
 *                   一小时内返回如‘23分钟前’，
 *                   24小时内返回如‘8小时前’，
 *                   48小时内返回‘昨天’，
 *                   超过48小时返回如‘3天前’，
 *                   超过30天返回如‘2个月前’，
 *                   超过360天返回如'3年前'
 */
function howLongAgo(str) {
  let ret = '';

  // Date.parse 无法处理字母时区，因此在这里手动替换
  const date = new Date(`${str.slice(0, -1)}+08:00`);
  const now = new Date();

  switch (true) {
    case now - date < 60 * 1000:
      ret = '刚刚';
      break;
    case now - date < 60 * 60 * 1000:
      ret = `${now.getMinutes() - date.getMinutes()}分钟前`;
      break;
    case now - date < 24 * 60 * 60 * 1000 && now.getDate() === date.getDate():
      ret = `${parseInt((now - date) / 60 / 60 / 1000, 10)}小时前`;
      break;
    case now - date < 48 * 60 * 60 * 1000 && now.getDate() - date.getDate() ===
    1:
      ret = '昨天';
      break;
    case now - date < 30 * 24 * 60 * 60 * 1000:
      ret = `${parseInt((now - date) / 24 / 60 / 60 / 1000, 10) + 1}天前`;
      break;
    case now - date < 12 * 30 * 24 * 60 * 60 * 1000:
      ret = `${parseInt((now - date) / 30 / 24 / 60 / 60 / 1000, 10)}个月前`;
      break;
    default:
      ret = `${now.getFullYear() - date.getFullYear()}年前`;
  }

  return ret;
}

exports.howLongAgo = howLongAgo;
