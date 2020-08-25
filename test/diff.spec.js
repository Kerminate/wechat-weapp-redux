// import { getIn } from '../src/utils.js'

// test('123', () => {
//   expect(getIn({a: 1}, ['a'])).toBe(1);
// })

const diff = require('../src/diff.js')

const res = diff({a: 1}, {});
console.log(res)