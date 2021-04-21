// import shallowEqual from './shallowEqual.js'
import deepEqual from './deepEqual.js'
import diff from "./diff.js";
import warning from './warning.js'
import wrapActionCreators from './wrapActionCreators.js'
import storeConfig from './storeConfig.js'
import { getIn, assign, isNeedDelay } from './utils.js'

const defaultMapStateToProps = state => ({}) // eslint-disable-line no-unused-vars
const defaultMapDispatchToProps = dispatch => ({dispatch})

function connectPage(mapStateToProps, mapDispatchToProps, store, name) {
  const shouldSubscribe = Boolean(mapStateToProps)
  const mapState = mapStateToProps || defaultMapStateToProps
  const app = typeof getApp === 'function' && getApp({ allowDefault: true });
  const storeName = name || storeConfig.get('name');
  if (!app[storeName]) {
    app[storeName] = store;
  }

  let time
  let mapDispatch
  if (typeof mapDispatchToProps === 'function') {
    mapDispatch = mapDispatchToProps
  } else if (!mapDispatchToProps) {
    mapDispatch = defaultMapDispatchToProps
  } else {
    mapDispatch = wrapActionCreators(mapDispatchToProps)
  }

  return function wrapWithConnect(pageConfig) {

    function handleChange(options) {
      // console.log(" %c dispatch 触发","color:red");
      if (!this.unsubscribe) {
        return
      }

      // console.log('before getState', Date.now())
      const state = this.store.getState()
      // console.log('after getState', Date.now())
      const mappedState = mapState(state, options);
      // console.log('after mapState', Date.now())
      if (!this.data || !mappedState || !Object.keys(mappedState)) return;
      const originData = {};
      for (let key in mappedState) {
        originData[key] = this.data[key];
      }
      const diffResult = diff(mappedState, originData);
      if (Object.keys(diffResult).length === 0) return;
      // TODO:深拷贝待优化
      const res = JSON.parse(JSON.stringify(diffResult));
      // console.log(res);
      if (!isNeedDelay(res)) {
        // console.log('after diff', Date.now())
        const start = Date.now();
        this.setData(res, () => {
          // console.log('%c setData 耗时', "color: yellow", Date.now() - start);
          // console.log('after setData', Date.now())
        });
      }
      // console.log('after deepequal', Date.now())
    }

    const {
      onLoad: _onLoad,
      onUnload: _onUnload,
    } = pageConfig

    function onLoad(options) {
      if (!app[storeName]) {
        app[storeName] = store;
      }
      this.store = store;
      if (!this.store) {
        warning("Store对象不存在!")
      }
      if(shouldSubscribe){
        this.unsubscribe = this.store.subscribe(handleChange.bind(this, options));
        handleChange.call(this, options)
      }
      if (typeof _onLoad === 'function') {
        _onLoad.call(this, options)
      }
    }

    function onUnload() {
      if (typeof _onUnload === 'function') {
        _onUnload.call(this)
      }
      typeof this.unsubscribe === 'function' && this.unsubscribe()
    }

    return assign({}, pageConfig, mapDispatch(store.dispatch), {onLoad, onUnload})
  }
}

function connectComponent(mapStateToProps, mapDispatchToProps, store, name, actionDoneName, reducerDonePath = []) {
  const shouldSubscribe = Boolean(mapStateToProps)
  const mapState = mapStateToProps || defaultMapStateToProps
  const app = typeof getApp === 'function' && getApp({ allowDefault: true });
  const storeName = name || storeConfig.get('name');
  if (!app[storeName]) {
    app[storeName] = store;
  }

  let mapDispatch
  if (typeof mapDispatchToProps === 'function') {
    mapDispatch = mapDispatchToProps
  } else if (!mapDispatchToProps) {
    mapDispatch = defaultMapDispatchToProps
  } else {
    mapDispatch = wrapActionCreators(mapDispatchToProps)
  }

  return function wrapWithConnect(componentConfig) {

    function actionDone(status) {
      const actions = mapDispatch(store.dispatch);
      Object.keys(actions).forEach(name => {
        if (name === actionDoneName) {
          actions[name](status);
        }
      });
    }

    function updateStart() {
      console.log('updateStart');
      actionDone(true);
    }

    function updateEnd() {
      console.log('updateEnd')
      actionDone(false);
    }

    function handleChange(options) {
      if (!this.unsubscribe) {
        return
      }

      const state = this.store.getState();
      // let isActionStart = false;
      // if (reducerDonePath && reducerDonePath.length > 0) {
      //   isActionStart = getIn(state, reducerDonePath);
      // }
      // const globalDiffStore = this.store.globalDiffStore || {};
      const mappedState = mapState(state, options);

      if (!this.data || !mappedState || !Object.keys(mappedState)) return;
      // console.log(isActionStart);
      // if (isActionStart) return;
      const originData = {};
      for (let key in mappedState) {
        originData[key] = this.data[key];
      }
      // TODO:优化代码待检验
      const diffResult = diff(mappedState, originData);
      // console.log(diffResult);
      // TODO:深拷贝待优化
      // console.log('after diff', Date.now())
      // if (Object.keys(diffResult).length === 0 && (!globalDiffStore || Object.keys(globalDiffStore).length === 0)) return;
      if (Object.keys(diffResult).length === 0) return;
      const res = JSON.parse(JSON.stringify(diffResult));
      // console.log(res);
      const start = Date.now();
      this.setData(res, () => {
        // console.log('%c setData 耗时', "color: yellow", Date.now() - start);
        // console.log('after setData', Date.now())
      });
    }

    const {
      ready: _ready,
      detached: _detached,
    } = componentConfig

    function ready(options) {
      if (!app[storeName]) {
        app[storeName] = store;
      }
      this.store = store;
      if (!this.store) {
        warning("Store对象不存在!")
      }
      if(shouldSubscribe){
        this.unsubscribe = this.store.subscribe(handleChange.bind(this, options));
        handleChange.call(this, options)
      }
      if (typeof _ready === 'function') {
        _ready.call(this, options)
      }
    }

    function detached() {
      if (typeof _detached === 'function') {
        _detached.call(this)
      }
      typeof this.unsubscribe === 'function' && this.unsubscribe()
    }

    const methods = assign({}, componentConfig.methods || {}, mapDispatch(store.dispatch), { updateStart, updateEnd });

    return assign({}, componentConfig, { ready, detached, methods })
  }
}

module.exports = {
  connectPage,
  connectComponent,
}