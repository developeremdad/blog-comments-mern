const mongoose = require("mongoose");

module.exports.dbConnect = async () => {
  try {
    const dbUrl = process.env.DB_URL;
    const dbName = "blog-comments";

    await mongoose.connect(dbUrl, { useNewUrlParser: true, dbName });
    console.log(`Connected to the database...`);
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
