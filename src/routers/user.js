const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.get("/test", (req, res) => {
  res.send("Sample File");
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const data = await user.save();
    res.status(200);
    res.json(data);
  } catch (error) {
    res.status(500);
    res.json(error);
  }

  //Old code using promise method
  // user
  //   .save()
  //   .then((data) => {
  //     res.status(200);
  //     res.json(data);
  //   })
  //   .catch((error) => {
  //     res.status(500);
  //     res.json(error);
  //   });
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).json();
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id, req.body);
    if (!user) {
      res.status(404);
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      res.status(404);
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
