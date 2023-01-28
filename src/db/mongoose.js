const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  //   useCreateIndex: true,
});

// const user = new User({
//   name: " Heli Shah  ",
//   email: "heli.shah1@gmail.com   ",
//   password: "123456",
// });

// const task = new Task({
//   description: "Bring Fruits1",
// });

// task
//   .save()
//   .then((task) => {
//     console.log(task);
//   })
//   .catch((error) => {
//     console.log("Error", error.message);
//   });
