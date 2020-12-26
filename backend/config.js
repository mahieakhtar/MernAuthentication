require("dotenv").config();

module.exports = {
  DB: process.env.databaseURL,
  JWT: process.env.JWT_SECRET,
};
