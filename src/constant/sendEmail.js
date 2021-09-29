const SENDGRID_API_KEY = process.env.SENDGRID_SENDEMAIL_KEY;

const VERIFICATION_ENDPOINT = {
  VERIFY_EMAIL_ENDPOINT: "auth/verify-email",
  VERIFY_PASSWORD_RESET: "auth/reset-password",
};

module.exports = { VERIFICATION_ENDPOINT };
