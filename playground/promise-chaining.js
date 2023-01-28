require("../src/db/mongoose");
const User = require("../src/models/user");

//

// User.findByIdAndUpdate("63d3d6aabe4e411f1f864c9c", { age: "21" })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: "21" });
//   })
//   .then((ageCount) => {
//     console.log(ageCount);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age: age });
  const count = await User.countDocuments({ age: age });
  return count;
};

updateAgeAndCount("63d3d6aabe4e411f1f864c9c", 21)
  .then((count) => {
    console.log("counttt" + count);
  })
  .catch((e) => {
    console.log("error", e);
  });
