const success = (res, payload) => {
  res.status(200).send({
    status: 200,
    payload: payload,
  });
};

module.exports = success;
