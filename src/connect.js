import shallowEqual from './shallowEqual.js'
import deepEqual from './deepEqual.js'
import diff from "./diff.js";
import warning from './warning.js'
import wrapActionCreators from './wrapActionCreators.js'
import storeConfig from './storeConfig.js'
import {assign} from './utils/Object.js'

const defaultMapStateToProps = state => ({}) // eslint-disable-line no-unused-vars
const defaultMapDispatchToProps = dispatch => ({dispatch})

function connectPage(mapStateToProps, mapDispatchToProps) {
  const shouldSubscribe = Boolean(mapStateToProps)
  const mapState = mapStateToProps || defaultMapStateToProps
  const app = getApp();
  const storeName = storeConfig.get('name');

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
      const originData = {};
      for (let key in mappedState) {
        originData[key] = this.data[key];
      }
      const diffResult = diff(mappedState, originData);
      // console.log('after diff', Date.now())
      if (Object.keys(diffResult).length === 0) return;
      const start = Date.now();
      this.setData(diffResult, () => {
        // console.log('%c setData 耗时', "color: yellow", Date.now() - start);
        // console.log('after setData', Date.now())
      });
      // console.log('after deepequal', Date.now())
    }

    const {
      onLoad: _onLoad,
      onUnload: _onUnload,
    } = pageConfig

    function onLoad(options) {
      this.store = app[storeName];
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

    return assign({}, pageConfig, mapDispatch(app[storeName].dispatch), {onLoad, onUnload})
  }
}

function connectComponent(mapStateToProps, mapDispatchToProps) {
  const shouldSubscribe = Boolean(mapStateToProps)
  const mapState = mapStateToProps || defaultMapStateToProps
  const app = getApp();
  const storeName = storeConfig.get('name');

  let mapDispatch
  if (typeof mapDispatchToProps === 'function') {
    mapDispatch = mapDispatchToProps
  } else if (!mapDispatchToProps) {
    mapDispatch = defaultMapDispatchToProps
  } else {
    mapDispatch = wrapActionCreators(mapDispatchToProps)
  }

  return function wrapWithConnect(componentConfig) {

    function handleChange(options) {
      if (!this.unsubscribe) {
        return
      }

      const state = this.store.getState()
      const mappedState = mapState(state, options);

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
      const originData = {};
      for (let key in mappedState) {
        originData[key] = this.data[key];
      }
      const diffResult = diff(mappedState, originData);
      // console.log('after diff', Date.now())
      if (Object.keys(diffResult).length === 0) return;
      const start = Date.now();
      this.setData(diffResult, () => {
        // console.log('%c setData 耗时', "color: yellow", Date.now() - start);
        // console.log('after setData', Date.now())
      });
    }

    const {
      ready: _ready,
      detached: _detached,
    } = componentConfig

    function ready(options) {
      this.store = app[storeName];
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


    const methods = assign({}, componentConfig.methods || {}, mapDispatch(app[storeName].dispatch));

    return assign({}, componentConfig, { ready, detached, methods })
  }
}

module.exports = {
  connectPage,
  connectComponent,
}