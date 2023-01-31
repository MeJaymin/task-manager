const { Router } = require("express");
const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

router.post("/tasks", auth, async (req, res) => {
  //const task = new Task(req.body);
  //we use es6 spread operator to copy req.body to current object

  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    const data = await task.save();
    res.status(200);
    res.json(data);
  } catch (error) {
    res.status(500);
    res.json(error);
    console.log(error);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    //Find all tasks
    // const tasks = await Task.find({});
    //The below query will fetch all task A->1,2 have
    // SELECT * FROM tasks WHERE owner = logged_ids
    await req.user.populate("userTasks");
    res.status(200).json(req.user.userTasks);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    //const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      res.status(404).json();
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    //const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    //const task = await Task.findByIdAndDelete(req.params.id, req.body);
    if (!task) {
      res.status(404);
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
