//Pick attribute from the original object
const pick = (object, keys) => {
  return keys.reduce((chosenObject, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      chosenObject[key] = object[key];
    }
    return chosenObject;
  }, {});
};

module.exports = pick;
