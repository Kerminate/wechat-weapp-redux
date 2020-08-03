const NUMBERTYPE = '[object Number]';
const STRINGTYPE = '[object String]';
const ARRAYTYPE = '[object Array]';
const OBJECTTYPE = '[object Object]';
const FUNCTIONTYPE = '[object Function]';

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
  const sourceType = getType(sourceObj);
  const compareType = getType(compareObj);
  // console.log(sourceType)
  // console.log(compareType)
  if (sourceType !== compareType) return false;
  if (sourceType === NUMBERTYPE || sourceType === STRINGTYPE) {
    if (sourceObj === compareObj) return true;
    else return false;
  } else if (sourceType === OBJECTTYPE) {
    if (Object.keys(sourceObj).length !== Object.keys(compareObj).length) return false;
    for (let key in sourceObj) {
      // console.log(sourceType[key])
      // console.log(compareObj[key])
      if (deepEqual(sourceObj[key]) !== deepEqual(compareObj[key])) {
        return false;
      }
    }
    return true;
  } else if (sourceType === ARRAYTYPE) {
    if (compareObj.length !== compareObj.length) return false;
    for (let index = 0; index < sourceObj.length; index++) {
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