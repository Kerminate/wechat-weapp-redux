(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WeAppRedux"] = factory();
	else
		root["WeAppRedux"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Provider = __webpack_require__(4);

	var _Provider2 = _interopRequireDefault(_Provider);

	var _connect = __webpack_require__(5);

	var _storeConfig = __webpack_require__(1);

	var _storeConfig2 = _interopRequireDefault(_storeConfig);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	  Provider: _Provider2.default,
	  connectPage: _connect.connectPage,
	  connectComponent: _connect.connectComponent,
	  storeConfig: _storeConfig2.default
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var storeConfig = {};

	var customStoreConfig = {
	  set: function set(key, value) {
	    storeConfig[key] = value;
	  },
	  get: function get(key) {
	    return storeConfig[key];
	  }
	};

	exports.default = customStoreConfig;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	var assign = function assign(target) {
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

	module.exports = {
	    assign: assign
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

	module.exports = warning;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _warning = __webpack_require__(3);

	var _warning2 = _interopRequireDefault(_warning);

	var _Object = __webpack_require__(2);

	var _storeConfig = __webpack_require__(1);

	var _storeConfig2 = _interopRequireDefault(_storeConfig);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var storeName = 'store';

	function checkStoreShape(store) {
	  var missingMethods = ['subscribe', 'dispatch', 'getState'].filter(function (m) {
	    return !store.hasOwnProperty(m);
	  });

	  if (missingMethods.length > 0) {
	    (0, _warning2.default)('Store似乎不是一个合法的Redux Store对象: ' + '缺少这些方法: ' + missingMethods.join(', ') + '。');
	  }
	}

	function Provider(store, name) {
	  checkStoreShape(store);
	  if (name) {
	    _storeConfig2.default.set('name', name);
	  }
	  return function (appConfig) {
	    return (0, _Object.assign)({}, appConfig, _defineProperty({}, name, store));
	  };
	}

	exports.default = Provider;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _shallowEqual = __webpack_require__(8);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _deepEqual = __webpack_require__(6);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _diff = __webpack_require__(7);

	var _diff2 = _interopRequireDefault(_diff);

	var _warning = __webpack_require__(3);

	var _warning2 = _interopRequireDefault(_warning);

	var _wrapActionCreators = __webpack_require__(9);

	var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);

	var _storeConfig = __webpack_require__(1);

	var _storeConfig2 = _interopRequireDefault(_storeConfig);

	var _Object = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultMapStateToProps = function defaultMapStateToProps(state) {
	  return {};
	}; // eslint-disable-line no-unused-vars
	var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
	  return { dispatch: dispatch };
	};

	function connectPage(mapStateToProps, mapDispatchToProps) {
	  var shouldSubscribe = Boolean(mapStateToProps);
	  var mapState = mapStateToProps || defaultMapStateToProps;
	  var app = getApp();
	  var storeName = _storeConfig2.default.get('name');

	  var mapDispatch = void 0;
	  if (typeof mapDispatchToProps === 'function') {
	    mapDispatch = mapDispatchToProps;
	  } else if (!mapDispatchToProps) {
	    mapDispatch = defaultMapDispatchToProps;
	  } else {
	    mapDispatch = (0, _wrapActionCreators2.default)(mapDispatchToProps);
	  }

	  return function wrapWithConnect(pageConfig) {

	    function handleChange(options) {
	      // console.log(" %c dispatch 触发","color:red");
	      if (!this.unsubscribe) {
	        return;
	      }

	      // console.log('before getState', Date.now())
	      var state = this.store.getState();
	      // console.log('after getState', Date.now())
	      var mappedState = mapState(state, options);
	      // console.log('after mapState', Date.now())
	      if (!this.data || !mappedState || !Object.keys(mappedState)) return;
	      // let isEqual = true;
	      // for (let key in mappedState) {
	      //   if (!deepEqual(this.data[key], mappedState[key])) {
	      //     isEqual = false;
	      //   }
	      // }
	      // if (isEqual) return;
	      // this.setData(mappedState, () => {
	      //   console.log('%c setData 耗时', "color: yellow", Date.now() - start);
	      //   console.log('after setData', Date.now())
	      // });
	      var originData = {};
	      for (var key in mappedState) {
	        originData[key] = this.data[key];
	      }
	      var diffResult = (0, _diff2.default)(mappedState, originData);
	      // console.log('after diff', Date.now())
	      if (Object.keys(diffResult).length === 0) return;
	      var start = Date.now();
	      this.setData(diffResult, function () {
	        // console.log('%c setData 耗时', "color: yellow", Date.now() - start);
	        // console.log('after setData', Date.now())
	      });
	      // console.log('after deepequal', Date.now())
	    }

	    var _onLoad = pageConfig.onLoad,
	        _onUnload = pageConfig.onUnload;


	    function onLoad(options) {
	      this.store = app[storeName];
	      if (!this.store) {
	        (0, _warning2.default)("Store对象不存在!");
	      }
	      if (shouldSubscribe) {
	        this.unsubscribe = this.store.subscribe(handleChange.bind(this, options));
	        handleChange.call(this, options);
	      }
	      if (typeof _onLoad === 'function') {
	        _onLoad.call(this, options);
	      }
	    }

	    function onUnload() {
	      if (typeof _onUnload === 'function') {
	        _onUnload.call(this);
	      }
	      typeof this.unsubscribe === 'function' && this.unsubscribe();
	    }

	    return (0, _Object.assign)({}, pageConfig, mapDispatch(app[storeName].dispatch), { onLoad: onLoad, onUnload: onUnload });
	  };
	}

	function connectComponent(mapStateToProps, mapDispatchToProps) {
	  var shouldSubscribe = Boolean(mapStateToProps);
	  var mapState = mapStateToProps || defaultMapStateToProps;
	  var app = getApp();
	  var storeName = _storeConfig2.default.get('name');

	  var mapDispatch = void 0;
	  if (typeof mapDispatchToProps === 'function') {
	    mapDispatch = mapDispatchToProps;
	  } else if (!mapDispatchToProps) {
	    mapDispatch = defaultMapDispatchToProps;
	  } else {
	    mapDispatch = (0, _wrapActionCreators2.default)(mapDispatchToProps);
	  }

	  return function wrapWithConnect(componentConfig) {

	    function handleChange(options) {
	      if (!this.unsubscribe) {
	        return;
	      }

	      var state = this.store.getState();
	      var mappedState = mapState(state, options);

	      if (!this.data || !mappedState || !Object.keys(mappedState)) return;
	      // let isEqual = true;
	      // for (let key in mappedState) {
	      //   if (!deepEqual(this.data[key], mappedState[key])) {
	      //     isEqual = false;
	      //   }
	      // }
	      // if (isEqual) return;
	      // this.setData(mappedState, () => {
	      //   console.log('%c setData 耗时', "color: yellow", Date.now() - start);
	      //   console.log('after setData', Date.now())
	      // });
	      var originData = {};
	      for (var key in mappedState) {
	        originData[key] = this.data[key];
	      }
	      var diffResult = (0, _diff2.default)(mappedState, originData);
	      // console.log('after diff', Date.now())
	      if (Object.keys(diffResult).length === 0) return;
	      var start = Date.now();
	      this.setData(diffResult, function () {
	        // console.log('%c setData 耗时', "color: yellow", Date.now() - start);
	        // console.log('after setData', Date.now())
	      });
	    }

	    var _ready = componentConfig.ready,
	        _detached = componentConfig.detached;


	    function ready(options) {
	      this.store = app[storeName];
	      if (!this.store) {
	        (0, _warning2.default)("Store对象不存在!");
	      }
	      if (shouldSubscribe) {
	        this.unsubscribe = this.store.subscribe(handleChange.bind(this, options));
	        handleChange.call(this, options);
	      }
	      if (typeof _ready === 'function') {
	        _ready.call(this, options);
	      }
	    }

	    function detached() {
	      if (typeof _detached === 'function') {
	        _detached.call(this);
	      }
	      typeof this.unsubscribe === 'function' && this.unsubscribe();
	    }

	    var methods = (0, _Object.assign)({}, componentConfig.methods || {}, mapDispatch(app[storeName].dispatch));

	    return (0, _Object.assign)({}, componentConfig, { ready: ready, detached: detached, methods: methods });
	  };
	}

	module.exports = {
	  connectPage: connectPage,
	  connectComponent: connectComponent
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	var NUMBERTYPE = '[object Number]';
	var STRINGTYPE = '[object String]';
	var ARRAYTYPE = '[object Array]';
	var OBJECTTYPE = '[object Object]';
	var FUNCTIONTYPE = '[object Function]';

	/**
	 * 返回对相应的数据类型
	 */
	function getType(data) {
	  return Object.prototype.toString.call(data);
	}

	/**
	 * @param {*} sourceObj     
	 * @param {*} compareObj    
	 */
	function deepEqual(sourceObj, compareObj) {
	  // number,string,null,undefined
	  if (sourceObj === compareObj) return true;
	  var sourceType = getType(sourceObj);
	  var compareType = getType(compareObj);
	  // console.log(sourceType)
	  // console.log(compareType)
	  if (sourceType !== compareType) return false;
	  if (sourceType === NUMBERTYPE || sourceType === STRINGTYPE) {
	    if (sourceObj === compareObj) return true;else return false;
	  } else if (sourceType === OBJECTTYPE) {
	    if (Object.keys(sourceObj).length !== Object.keys(compareObj).length) return false;
	    for (var key in sourceObj) {
	      // console.log(sourceType[key])
	      // console.log(compareObj[key])
	      if (deepEqual(sourceObj[key]) !== deepEqual(compareObj[key])) {
	        return false;
	      }
	    }
	    return true;
	  } else if (sourceType === ARRAYTYPE) {
	    if (compareObj.length !== compareObj.length) return false;
	    for (var index = 0; index < sourceObj.length; index++) {
	      // console.log(sourceObj[index])
	      // console.log(compareObj[index])
	      if (deepEqual(sourceObj[index]) !== deepEqual(compareObj[index])) {
	        return false;
	      }
	    }
	    return true;
	  }
	  return true;
	}

	module.exports = deepEqual;

	// const a = [1, [2,3], {age: 12}, { cart: [1], timp: [{id: 2, mthod: 1}] }];
	// const b = [1, [2,3], {age: 12}, { cart: [1], timp: [{mthod: 1, id: 2}] }];
	// console.log(deepEqual(a,b));
	// console.log(deepEqual(undefined, undefined));
	// console.log(deepEqual([undefined, {aa: 1 }], undefined, {aa:2}));
	// console.log(deepEqual(1,2));
	// console.log(Object.prototype.toString.call(undefined))
	// console.log(Object.prototype.toString.call(111))
	// console.log(Object.prototype.toString.call('jh'))
	// console.log(typeof undefined)
	// console.log(typeof null)
	// console.log(undefined === undefined)
	// console.log(null === null)

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = diff;
	var ARRAYTYPE = '[object Array]';
	var OBJECTTYPE = '[object Object]';
	var FUNCTIONTYPE = '[object Function]';

	function diff(current, pre) {
	  var result = {};
	  syncKeys(current, pre);
	  _diff(current, pre, '', result);
	  return result;
	}

	function syncKeys(current, pre) {
	  if (current === pre) return;
	  var rootCurrentType = type(current);
	  var rootPreType = type(pre);
	  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
	    //if(Object.keys(current).length >= Object.keys(pre).length){
	    for (var key in pre) {
	      var currentValue = current[key];
	      if (currentValue === undefined) {
	        current[key] = null;
	      } else {
	        syncKeys(currentValue, pre[key]);
	      }
	    }
	    //}
	  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
	    if (current.length >= pre.length) {
	      pre.forEach(function (item, index) {
	        syncKeys(current[index], item);
	      });
	    }
	  }
	}

	function _diff(current, pre, path, result) {
	  if (current === pre) return;
	  var rootCurrentType = type(current);
	  var rootPreType = type(pre);
	  if (rootCurrentType == OBJECTTYPE) {
	    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length && path !== '') {
	      setResult(result, path, current);
	    } else {
	      var _loop = function _loop(key) {
	        var currentValue = current[key];
	        var preValue = pre[key];
	        var currentType = type(currentValue);
	        var preType = type(preValue);
	        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
	          if (currentValue !== pre[key]) {
	            setResult(result, concatPathAndKey(path, key), currentValue);
	          }
	        } else if (currentType == ARRAYTYPE) {
	          if (preType != ARRAYTYPE) {
	            setResult(result, concatPathAndKey(path, key), currentValue);
	          } else {
	            if (currentValue.length < preValue.length) {
	              setResult(result, concatPathAndKey(path, key), currentValue);
	            } else {
	              currentValue.forEach(function (item, index) {
	                _diff(item, preValue[index], concatPathAndKey(path, key) + '[' + index + ']', result);
	              });
	            }
	          }
	        } else if (currentType == OBJECTTYPE) {
	          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
	            setResult(result, concatPathAndKey(path, key), currentValue);
	          } else {
	            for (var subKey in currentValue) {
	              var realPath = concatPathAndKey(path, key) + (subKey.includes('.') ? '["' + subKey + '"]' : '.' + subKey);
	              _diff(currentValue[subKey], preValue[subKey], realPath, result);
	            }
	          }
	        }
	      };

	      for (var key in current) {
	        _loop(key);
	      }
	    }
	  } else if (rootCurrentType == ARRAYTYPE) {
	    if (rootPreType != ARRAYTYPE) {
	      setResult(result, path, current);
	    } else {
	      if (current.length < pre.length) {
	        setResult(result, path, current);
	      } else {
	        current.forEach(function (item, index) {
	          _diff(item, pre[index], path + '[' + index + ']', result);
	        });
	      }
	    }
	  } else {
	    setResult(result, path, current);
	  }
	}

	function concatPathAndKey(path, key) {
	  return key.includes('.') ? path + ('["' + key + '"]') : (path == '' ? '' : path + ".") + key;
	}

	function setResult(result, k, v) {
	  var t = type(v);
	  if (t != FUNCTIONTYPE) {
	    //if (t != OBJECTTYPE && t != ARRAYTYPE) {
	    result[k] = v;
	    // } else {
	    //     result[k] = JSON.parse(JSON.stringify(v))
	    // }
	  }
	}

	function type(obj) {
	  return Object.prototype.toString.call(obj);
	}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";

	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if ((typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return bindActionCreators(actionCreators, dispatch);
	  };
	}

	module.exports = wrapActionCreators;

/***/ })
/******/ ])
});
;