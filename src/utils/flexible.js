/* eslint-disable no-param-reassign */
function setFlex(win, lib) {
  const doc = win.document;
  const docEl = doc.documentElement;
  let metaEl = doc.querySelector('meta[name="viewport"]');
  const flexibleEl = doc.querySelector('meta[name="flexible"]');
  let dpr = 0;
  let scale = 0;
  let tid;
  const flexible = lib.flexible || (lib.flexible = {});

  if (metaEl) {
    const match = metaEl.getAttribute('content').match(/initial-scale=([0-9.]+)/);
    if (match) {
      scale = parseFloat(match[1]);
      dpr = parseInt(1 / scale, 10);
    }
  } else if (flexibleEl) {
    const content = flexibleEl.getAttribute('content');
    if (content) {
      const initialDpr = content.match(/initial-dpr=([0-9.]+)/);
      const maximumDpr = content.match(/maximum-dpr=([0-9.]+)/);
      if (initialDpr) {
        dpr = parseFloat(initialDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
      if (maximumDpr) {
        dpr = parseFloat(maximumDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
    }
  }

  if (!dpr && !scale) {
    // const isAndroid = win.navigator.appVersion.match(/android/gi);
    const isIOS = win.navigator.appVersion.match(/(iphone)|(ipad)/gi);
    const devicePixelRatio = win.devicePixelRatio;
    if (isIOS) {
      // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
      if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
        dpr = 3;
      } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
        dpr = 2;
      } else {
        dpr = 1;
      }
    } else {
      // 其他设备下，仍旧使用1倍的方案
      dpr = 1;
    }
    scale = 1 / dpr;
  }

  docEl.setAttribute('data-dpr', dpr);
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', `initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no`);
    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl);
    } else {
      const wrap = doc.createElement('div');
      wrap.appendChild(metaEl);
      doc.write(wrap.innerHTML);
    }
  }

  function refreshRem() {
    let width = docEl.getBoundingClientRect().width;
    if (width / dpr > 540) {
      width = 540 * dpr;
    }
    const rem = width / 10;
    docEl.style.fontSize = `${rem}px`;
    flexible.rem = win.rem = rem;
  }

  win.addEventListener('resize', () => {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }, false);
  win.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);

  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = `${12 * dpr}px`;
  } else {
    doc.addEventListener('DOMContentLoaded', () => {
      doc.body.style.fontSize = `${12 * dpr}px`;
    }, false);
  }

  refreshRem();
}

export default {
  setFlex,
};

export {
  setFlex,
};
