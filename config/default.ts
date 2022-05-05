require("dotenv").config();

export default {
  port: process.env.PORT,
  dbUri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mxiat.mongodb.net/test?retryWrites=true&w=majority`,
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};
