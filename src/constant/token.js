const TOKEN = {
  TOKEN_EXPIRED: 86400, // 1 day
  REFRESH_TOKEN_EXPIRED: 86400 * 90, // 90 days
};

const JWT_SECRET = "toi_biet_em_khong_biet";

module.exports = { TOKEN, JWT_SECRET };
