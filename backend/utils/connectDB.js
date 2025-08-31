import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log("Db connected successfully");
  } catch (err) {
    console.log("Error during db connection: " + err.message);
    process.exit(1);
  }
};

export default connectDB