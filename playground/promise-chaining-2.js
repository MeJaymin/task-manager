require("../src/db/mongoose");
const Task = require("../src/models/task");

//

//Promise example
// Task.findByIdAndDelete("63d3b7098210b346d6c21fad")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((uncompletedTasks) => {
//     console.log(uncompletedTasks);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//Convert Promise example into async await

const deleteTaskAndCount = async (id) => {
  const deleteTask = await Task.findByIdAndDelete(id);
  const countDocuments = await Task.countDocuments({ completed: false });
  return countDocuments;
};

deleteTaskAndCount("63d509162c5828a368843606")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
