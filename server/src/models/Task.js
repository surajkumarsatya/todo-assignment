import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    startAt: {
      type: Date,
      required: [true, "Task start date and time are required"],
    },

    endAt: {
      type: Date,
      required: [true, "Task end date and time are required"],
      validate: {
        validator: function (value) {
          return value > this.startAt;
        },
        message: "End time must be after start time",
      },
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
    },

    status: {
      type: String,
      enum: ["In Progress", "Completed"],
      default: "In Progress",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
