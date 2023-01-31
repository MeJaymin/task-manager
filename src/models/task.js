const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: [true, "Description is requireddd!"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Owner is required"],
    ref: "User",
  },
});
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
