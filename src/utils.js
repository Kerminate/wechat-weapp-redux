const getIn = (obj, path, defaultVal = null) => {
  const ret = path.reduce((xs, x) => (xs && xs[x] !== undefined ? xs[x] : null), obj) || defaultVal;
  return ret;
}

const assign = function (target) {
  'use strict';
  // We must check against these specific cases.
  if (target === undefined || target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source !== undefined && source !== null) {
          for (var nextKey in source) {
              if (source.hasOwnProperty(nextKey)) {
                  output[nextKey] = source[nextKey];
              }
          }
      }
  }
  return output;
};

const isNeedDelay = (diff, point) => {
  let isNeed = true;
  Object.keys(diff).forEach(key => {
    // TODO: 支持变量引入
    // const reg = new RegExp(`\/\.${point}(\[\d+\])?$\/`);
    if (!/\.userAvatars(\[\d+\])?$/.test(key)) {
      isNeed = false;
    }
  })
  return isNeed;
}

module.exports = {
  getIn: getIn,
  assign: assign,
  isNeedDelay: isNeedDelay,
}
