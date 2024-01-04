const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// schemas define the structure of a document/record
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// models interact with the database
module.exports = mongoose.model("Workout", workoutSchema);
