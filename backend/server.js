const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "build")));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("database connected");
});

const exerciseRouter = require("./routes/exercise");
const usersRouter = require("./routes/users");
app.use((req, res, next) => {
  console.log(req);
  next();
});
app.use("/api/exercises", exerciseRouter);
app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "production") {
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
