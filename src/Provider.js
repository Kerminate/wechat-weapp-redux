import warning from './warning.js'
import { assign } from './utils.js'
import storeConfig from './storeConfig.js'

function checkStoreShape(store) {
  const missingMethods = ['subscribe', 'dispatch', 'getState'].filter(m => !store.hasOwnProperty(m));

  if(missingMethods.length > 0) {
    warning(
      'Store似乎不是一个合法的Redux Store对象: ' +
      '缺少这些方法: ' + missingMethods.join(', ') + '。'
    )
  }
}

function Provider(store, name) {
  checkStoreShape(store)
  if (name) {
    storeConfig.set('name', name);
  }
  return function(appConfig) {
    return assign({}, appConfig, { [name]: store })
  }
}

export default Provider;