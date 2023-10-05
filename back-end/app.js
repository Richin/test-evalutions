require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth-routes");
const userRouter = require("./routes/user-routes")
const cors = require("cors")

const app = express();
const PORT = 3001;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => console.log(err));

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("helo");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => console.log("connected"));
