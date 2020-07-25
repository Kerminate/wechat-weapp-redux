import shallowEqual from './shallowEqual.js'
import warning from './warning.js'
import wrapActionCreators from './wrapActionCreators.js'
import {assign} from './utils/Object.js'

const defaultMapStateToProps = state => ({}) // eslint-disable-line no-unused-vars
const defaultMapDispatchToProps = dispatch => ({dispatch})

function connect(mapStateToProps, mapDispatchToProps) {
  const shouldSubscribe = Boolean(mapStateToProps)
  const mapState = mapStateToProps || defaultMapStateToProps
  const app = getApp();

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
      if (!this.unsubscribe) {
        return
      }

      const state = this.store.getState()
      const mappedState = mapState(state, options);
      if (!this.data || shallowEqual(this.data, mappedState)) {
        return;
      }
      this.setData(mappedState)
    }

    // TODO:后期内部拆分2个逻辑，页面和组件复用不同逻辑，减少挂载的方法
    const {
      onLoad: _onLoad,
      onUnload: _onUnload,
      ready: _ready,
      detached: _detached,
    } = pageConfig

    function onLoad(options) {
      this.store = app.store;
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

    function ready(options) {
      this.store = app.store;
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

    function onUnload() {
      if (typeof _onUnload === 'function') {
        _onUnload.call(this)
      }
      typeof this.unsubscribe === 'function' && this.unsubscribe()
    }

    function detached() {
      if (typeof _detached === 'function') {
        _detached.call(this)
      }
      typeof this.unsubscribe === 'function' && this.unsubscribe()
    }

    return assign({}, pageConfig, mapDispatch(app.store.dispatch), {onLoad, onUnload, ready, detached})
  }
}

module.exports = connect