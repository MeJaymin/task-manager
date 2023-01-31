const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const user = require("../models/user");

router.get("/test", (req, res) => {
  res.send("Sample File");
});

//Register
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const data = await user.save();
    const token = await user.generateAuthToken();
    res.status(200);
    res.json({ data, token });
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

//Login
router.post("/users/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    //Check if passwoerd is correct
    const isPasswordMatched = await user.comparePassword(email, password);

    if (!isPasswordMatched) {
      res.status(400).json("Unable to login");
    }
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.status(200).json({ error: "Successfully logged out" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Logout From All Devices
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.status(200).json({ error: "Successfully logged out" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Get All users
router.get("/users/me", auth, async (req, res) => {
  try {
    res.status(200).json(req.user);
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

router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) {
    //   res.status(404);
    // }

    //We can still remove it by using .remove() method

    await req.user.remove();
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch("/users/me", auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const user = await User.findById(req.user._id);
    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();
    //reason why we change from findbyidandupdate to findbyid because
    //findbyidandupdate by pass middleware
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!user) {
      res.status(404);
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
