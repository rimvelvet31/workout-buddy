// load env variables into process.env
require("dotenv").config();

// import express module
const express = require("express");

// this allows the frontend to access resources
const cors = require("cors");

// import odm
const mongoose = require("mongoose");

// import routers
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// create express app
const app = express();

// for post/patch methods:
// checks if request contains data, parses it into json, & attaches it to req.body
app.use(express.json());

// middleware - code executed in between a request and response
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next(); // terminate and go to next middleware
});

// allow the frontend to access resources
app.use(cors());

// routing
// note: in (req, res) ordering matters
app.get("/", (req, res) => {
  res.json({ message: "I love Cynthia" });
});

// register routers
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // run server when succesfully connected to db
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB. Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// listen for requests
// app.listen(process.env.PORT, () => {
//   console.log(`Listening on port ${process.env.PORT}`);
// });
