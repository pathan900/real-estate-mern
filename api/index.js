import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import listingRoute from "./routes/listing.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected !!!");
    app.listen(3000, () => {
      console.log("server is running at port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error.";
  return res.status(statusCode).json({
    statusCode,
    message,
    success: false,
  });
});
