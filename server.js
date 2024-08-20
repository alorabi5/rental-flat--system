// server.js
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const usersRouter = require("./controllers/users");
const profilesRouter = require("./controllers/profiles");
const flatRouter = require("./controllers/flat");
const rentalRouter = require("./controllers/rental");

const verifyToken = require("./middleware/verify-token");

const morgan = require("morgan");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(cors());
app.use(express.json());


app.use(morgan("dev"));

// Routes
app.use("/users", usersRouter);
app.use("/profiles", verifyToken, profilesRouter);
app.use("/flat", verifyToken, flatRouter);
app.use("/rental", verifyToken, rentalRouter);  

app.listen(process.env.PORT, () => {
  console.log("The express app is ready!");
});
