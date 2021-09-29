const _ = require("lodash");

const getRightAnswer = (questions) => {
  const rightAnswers = [];
  questions.forEach((question) => {
    let { correctAnswers, _id } = question;
    _id = _id.toString();
    rightAnswers.push({
      correctAnswers,
      _id,
    });
  });

  return rightAnswers;
};

const calculateScore = (rightAnswers, answers) => {
  let point = 0;
  answers.forEach((answer) => {
    const toCheck = rightAnswers.find(({ _id }) => _id === answer.id);
    if (_.isEqual(answer.answer, toCheck.correctAnswers)) point++;
  });

  return point;
};

module.exports = { getRightAnswer, calculateScore };
