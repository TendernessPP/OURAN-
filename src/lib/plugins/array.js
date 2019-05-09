// export function upItem(item, index) {
//     if (index !== 0) {
//         let arr = [];
//         let items = this.data.items;
//         let items2 = items.splice(index);
//         arr.push(items2.shift());
//         arr.push(items.pop());
//         arr.forEach(item => items.push(item));
//         this.data.items = [...items, ...items2];
//     }
// }
//
// export function downItem(item, index) {
//     if (index !== this.data.items.length - 1) {
//         let arr = [];
//         let items = this.data.items;
//         let items2 = items.splice(index + 1);
//         arr.push(items2.shift());
//         arr.push(items.pop());
//         arr.forEach(item => items.push(item));
//         this.data.items = [...items, ...items2];
//     }
// }

/*获得字符串里面每个元素的个数*/
var arrString = 'abcdaabc';
var result = arrString.split('').reduce(function (res, cur) {
    res[cur] ? res[cur]++ : res[cur] = 1;
    return res;
}, {});
console.log(result);

var letters = ['A', 'B', 'C', 'C', 'B', 'C', 'C'];
var letterObj = letters.reduce(function (acc, cur) {
    acc[cur] = acc[cur] ? ++acc[cur] : 1;
    return acc;
}, {});
console.log(letterObj); // {A: 1, B: 2, C: 4}


/*数组去重*/
var letters2 = ['A', 'B', 'C', 'C', 'B', 'C', 'C'];
var letterArr = letters2.reduce(function (acc, cur) {
    if (acc.indexOf(cur) === -1) {
        acc.push(cur);
    }
    return acc;
}, []);
console.log(letterArr); //  ["A", "B", "C"]


/*对象浅拷贝和深拷贝*/
function shallowCopy(source, target = {}) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source [key];
        }
    }
    return target;
}

function deepCopy(source, target = {}) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            if (typeof (source[key] === 'object')) {
                target[key] = Array.isArray(source[key]) ? [] : {};
                deepCopy(source[key], target[key]);
            }else {
                target[key] = source[key];
            }
        }
    }
    return target;
}


/*返回数组的最大值*/
const arrayMax = arr => Math.max(...arr);
console.log(arrayMax([10, 1, 5]));
// arrayMax([10, 1, 5]) -> 10


/*将数组块划分为指定大小的较小数组*/
const chunk = (arr, size) =>
    Array.from({length: Math.ceil(arr.length / size)}, (v, i) => arr.slice(i * size, i * size + size));
console.log(chunk([1,2,3,4,5], 2));
// chunk([1,2,3,4,5], 2) -> [[1,2],[3,4],[5]]


/*返回两个数组之间的差异*/
const difference = (a, b) => { const s = new Set(b); return a.filter(x => !s.has(x)); };
console.log(difference([1,2,3], [1,2,4]));
// difference([1,2,3], [1,2,4]) -> [3]

/*拼合数组。*/
const flatten = arr => arr.reduce((acc, cur) => acc.concat(cur), []);
console.log(flatten([1,[2],3,4]));
// flatten([1,[2],3,4]) -> [1,2,3,4]


/*从对象中选取对应于给定键的键值对。*/
const pick = (obj, arr) =>
    arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});
console.log(pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']));
// pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']) -> { 'a': 1, 'c': 3 }







