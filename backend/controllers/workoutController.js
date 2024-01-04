// import model
const Workout = require("../models/workoutModel");

const mongoose = require("mongoose");

// get all work outs
const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;

  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// get single work out
const getWorkout = async (req, res) => {
  const { id } = req.params;

  // check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Can't find work out!" });
  }

  const workout = await Workout.findById(id);

  // check if work out doesn't exist
  if (!workout) {
    return res.status(404).json({ error: "Can't find work out!" });
  }

  res.status(200).json(workout);
};

// create new work out
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  const emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!load) {
    emptyFields.push("load");
  }

  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Don't leave any empty fields!", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a work out
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Can't find work out!" });
  }

  const workout = await Workout.findByIdAndDelete(id);

  if (!workout) {
    return res.status(400).json({ error: "Can't find work out!" });
  }

  res.status(200).json(workout);
};

// update a work out
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Can't find work out!" });
  }

  const workout = await Workout.findByIdAndUpdate(id, { ...req.body });

  if (!workout) {
    return res.status(400).json({ error: "Can't find work out!" });
  }

  res.status(200).json(workout);
};

module.exports = {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
