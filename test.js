// const _ = require("lodash");

// const answers = [
//   {
//     id: "61506ff3e849ed081d688457",
//     answer: [1],
//   },
//   {
//     id: "61506ff3e849ed081d68845a",
//     answer: [2],
//   },
// ];

// const correctAns = [
//   {
//     correctAnswers: [1],
//     _id: "61506ff3e849ed081d688457",
//   },
//   {
//     correctAnswers: [1],
//     _id: "61506ff3e849ed081d68845a",
//   },
// ];

// let point = 0;
// answers.forEach((answer) => {
//   const toCheck = correctAns.find(({ _id }) => _id === answer.id);
//   if (_.isEqual(answer.answer, toCheck.correctAnswers)) point++;
// });

// console.log(point);

let person = {
  bip: "bip tao",
};

person = { bip: "not bip" };

console.log(person);
