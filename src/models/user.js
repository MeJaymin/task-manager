const mongoose = require("mongoose");

const User = mongoose.model("Users", {
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    minLength: 6,
    required: true,
    validate: {
      validator(value) {
        if (value.includes("password")) {
          throw new Error("A password cannot have password string");
        }
      },
    },
  },
  age: {
    type: String,
    trim: true,
    validate: {
      validator: (v) => {
        if (isNaN(v)) {
          throw new Error("Please enter only number");
        }
      },
    },
  },
});

module.exports = User;
