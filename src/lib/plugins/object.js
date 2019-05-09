const person = {
    name: 'jazz',
    gender: 'male',
    age: 24
};
// const personUnknowAge = Object.keys(person).filter((key) => {
//     return key !== 'age';
// })
//     .map((key) => {
//         return {
//             [key]: person[key]
//         }
//     })
//     .reduce((acc, cur) => {
//         console.log(acc,cur);
//         return {...acc, ...cur};
//     }, {});
// console.log(personUnknowAge);
var {age,...personUnknowAge2} = person;
console.log(personUnknowAge2);

