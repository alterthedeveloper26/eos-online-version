const SENDGRID_API_KEY = process.env.SENDGRID_SENDEMAIL_KEY;
const VERIFICATION_FIELD = {
  VERIFY_EMAIL: "verify-email",
  CHANGE_PASSWORD: "change-password",
  RESET_PASSWORD: "reset-password",
};

const VERIFICATION_ENDPOINT = {
  VERIFY_EMAIL_ENDPOINT: "auth/verify-email",
  VERIFY_PASSWORD_RESET: "auth/reset-password",
};

module.exports = { VERIFICATION_FIELD, VERIFICATION_ENDPOINT };
