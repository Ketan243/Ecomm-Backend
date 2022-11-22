const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.DB_CONNECT || process.env.LOCAL_SETUP;
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .catch((error) => console.log(error));
    const connection = mongoose.connection;
    console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = connectDB;