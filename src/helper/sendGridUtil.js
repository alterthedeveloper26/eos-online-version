const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { VERIFICATION_ENDPOINT } = require("../constant/sendEmail");

const sendVerificationEmail = async (userEmail, code) => {
  const msg = {
    to: userEmail,
    from: "baohoang0206@gmail.com", // Use the email address or domain you verified above
    subject: "RETLA, Verify your email",
    text: `
      Nguoi dung doi thay
      Dung voi buong tay
      De con tim nay mot lan ruc chay 
    `,
    html: `
    <body>
      <h3>Click in the link below to verify your email: </h3>
      <a href="${process.env.BASE_URL}${VERIFICATION_ENDPOINT.VERIFY_EMAIL_ENDPOINT}/${code}">Reset password</a>
    </body>
    `,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error.response.body);
  }
};

const sendResetPasswordEmail = async (userEmail, code) => {
  const msg = {
    to: userEmail,
    from: "baohoang0206@gmail.com", // Use the email address or domain you verified above
    subject: "RETLA, Verify your email",
    text: `
      Vi ngay nguoi di tuong nhu
      Qua dat nay vo vun roi
    `,
    html: `
    <body>
      <h3>Click in the link below to start reset your password: </h3>
      <a href="${process.env.BASE_URL}${VERIFICATION_ENDPOINT.VERIFY_PASSWORD_RESET}/${code}">Reset password</a>
    </body>
    `,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error.response.body);
  }
};

module.exports = { sendVerificationEmail, sendResetPasswordEmail };
