const { emptyDir } = require("fs-extra");
const mongoose = require("mongoose");
const shortid = require("shortid");

const TrainingSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  trainingGoal: {
    type: String,
    required: true,
    trim: true,
  },
  WorkoutName: {
    type: String,
    required: true,
    trim: true,
  },
  reps: {
    type: String,
    required: false,
  },
  difficulty: {
    type: String,
    default: "Beginner ",
    enum: ["Beginner", "Advanced", "Expert", "Insane"],
  },
  milestones: {
    type: [String],
    required: true,
    default: null,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  targetDeadline: {
    type: Date,
    default: Date.now,
  },
  actualDeadline: {
    type: Date,
    default: Date.now,
  },
  trainingStatus: {
    type: String,
    default: "Incomplete",
    enum: ["Incomplete", "Completed"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Training", TrainingSchema);
