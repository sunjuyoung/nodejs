const monggose = require("mongoose");

const connectDB = async () => {
  try {
    await monggose.connect(process.env.DATABASE_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
