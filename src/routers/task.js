const { Router } = require("express");
const express = require("express");
const router = new express.Router();
const Task = require("../models/task");

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

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

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      res.status(404).json();
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const task = await Task.findById(req.params.id);
    updates.forEach((update) => (task[update] = req.body[update]));
    if (!task) {
      res.status(404);
    }
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id, req.body);
    if (!task) {
      res.status(404);
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
