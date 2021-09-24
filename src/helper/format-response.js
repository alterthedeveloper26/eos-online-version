const success = (res, payload) => {
  res.status(200).json({
    payload: payload,
  });
};

//400 Bad Request
const badRequest = (res) => {
  res.status(400).json({
    message: "Invalid syntax.",
  });
};

//401 Unauthorized
const unauthorized = (res) => {
  res.status(401).json({
    message: "You haven't login yet!!!",
  });
};

//403 Forbidden
const forbidden = (res) => {
  res.status(403).json({
    message: "You are not allowed to enter!!!.",
  });
};

module.exports = { success, badRequest, unauthorized, forbidden };
