/**
 * Create a custom method for mongoose objectID validation
 * @param {*} value the value being validated
 * @param {*} helpers tbe helper for creating stuffs
 * @returns
 */
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

/**
 * Create a custom method for password validation
 * @param {*} value the value being validated
 * @param {*} helpers tbe helper for creating stuffs
 * @returns
 */
const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("password must be at least 8 characters");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    //generate error message
    return helpers.message(
      "password must contain at least 1 letter and 1 number"
    );
  }
  return value;
};

const name = (value, helpers) => {
  if (value.length < 3 || value > 30) {
    return helpers.message("name must be in the scope of 3-30 characters");
  }
  if (!value.match(/^[A-Za-z ]{0,}$/)) {
    //generate error message
    return helpers.message("name should only contain letter and space!");
  }
  return value;
};

module.exports = {
  objectId,
  password,
  name,
};
