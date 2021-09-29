const buildResponse = (data) => {
  let response = {
    code: 200,
    message: "Request is submitted successfully!",
  };

  if (data) response = { ...response, data };

  return response;
};

module.exports = buildResponse;
