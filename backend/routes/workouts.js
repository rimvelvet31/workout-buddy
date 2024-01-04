const express = require("express");

// import controllers
const {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

// import auth middleware
const requireAuth = require("../middleware/requireAuth");

// create router
const router = express.Router();

// require auth check to protect workout routes
router.use(requireAuth);

// get all work outs
router.get("/", getAllWorkouts);

// get single work out by using dynamic route
// route parameter (id) can be accessed under req.params
router.get("/:id", getWorkout);

// create new work out
router.post("/", createWorkout);

// delete a work out
router.delete("/:id", deleteWorkout);

// update a work out
router.patch("/:id", updateWorkout);

// don't forget to export
module.exports = router;
