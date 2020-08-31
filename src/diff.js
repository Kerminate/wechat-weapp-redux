const ARRAYTYPE = '[object Array]'
const OBJECTTYPE = '[object Object]'
const FUNCTIONTYPE = '[object Function]'

export default function diff(current, pre) {
// function diff(current, pre) {
  const result = {}
  syncKeys(current, pre)
  _diff(current, pre, '', result)
  return result
}

function lackKey(current, pre) {
  for (let key in pre) {
    if (current[key] === undefined && pre[key] !== undefined) {
      return true
    }
  }
  return false
}

function syncKeys(current, pre) {
  if (current === pre) return
  const rootCurrentType = type(current)
  const rootPreType = type(pre)
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    if (!lackKey(current, pre)) {
      for (let key in pre) {
        const currentValue = current[key]
        // if (currentValue === undefined) {
        //   current[key] = null
        // } else {
          syncKeys(currentValue, pre[key])
        // }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index) => {
        syncKeys(current[index], item)
      })
    }
  }
}

function _diff(current, pre, path, result) {
  if (current === pre) return
  const rootCurrentType = type(current)
  const rootPreType = type(pre)
  if (rootCurrentType == OBJECTTYPE) {
    // if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length && path !== '') {
    if (rootPreType != OBJECTTYPE || lackKey(current, pre) && path !== '') {
      setResult(result, path, current)
    } else {
      for (let key in current) {
        const currentValue = current[key]
        const preValue = pre[key]
        const currentType = type(currentValue)
        const preType = type(preValue)
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue !== pre[key]) {
            setResult(result, concatPathAndKey(path, key), currentValue)
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(result, concatPathAndKey(path, key), currentValue)
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, concatPathAndKey(path, key), currentValue)
            } else {
              currentValue.forEach((item, index) => {
                _diff(item, preValue[index], concatPathAndKey(path, key) + '[' + index + ']', result)
              })
            }
          }
        } else if (currentType == OBJECTTYPE) {
          // if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
          if (preType != OBJECTTYPE || lackKey(currentValue, preValue)) {
            setResult(result, concatPathAndKey(path, key), currentValue)
          } else {
            for (let subKey in currentValue) {
              const realPath = concatPathAndKey(path, key) + (subKey.includes('.') ? `["${subKey}"]` : `.${subKey}`)
              _diff(currentValue[subKey], preValue[subKey], realPath, result)
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current)
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current)
      } else {
        current.forEach((item, index) => {
          _diff(item, pre[index], path + '[' + index + ']', result)
        })
      }
    }
  } else {
    setResult(result, path, current)
  }
}

function concatPathAndKey(path, key) {
  return key.includes('.') ?
    path + `["${key}"]` :
    (path == '' ? '' : path + ".") + key
}

function setResult(result, k, v) {
  const t = type(v)
  if (t != FUNCTIONTYPE) {
    //if (t != OBJECTTYPE && t != ARRAYTYPE) {
    if (k === '') {
      for (let key in v) {
        result[key] = v[key]
      }
    } else {
      result[k] = v
    }
    // } else {
    //     result[k] = JSON.parse(JSON.stringify(v))
    // }
  }
}

function type(obj) {
  return Object.prototype.toString.call(obj)
}

// const res1 = diff({a: { b: 1}}, {});
// console.log(res1)
// const res2 = diff({}, {a: { b: 1}});
// console.log(res2)
// const res3 = diff({a: {}, aa: 2}, {a: { b: 1}, aa: 1});
// console.log(res3)
// const res4 = diff({a: {1: [2], 2: [4]} }, {a: {2: [3,4], 3: [2]}})
// console.log(res4)
// const res5 = diff({a: 2}, {a:3, b: 4})
// console.log(res5)
// const res6 = diff({a: 2, c: 1}, {a:3, b: 4})
// console.log(res6)
// const res7 = diff({a: {b: 1}}, {a: 2})
// console.log(res7)
// const res8 = diff({a: {b: 1, d: 3, f: 2 }}, {a: {b: 1, c: 2, e: 4}})
// console.log(res8)