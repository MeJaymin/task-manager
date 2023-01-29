const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    validate: {
      validator: async function (email) {
        const user = await this.constructor.findOne({ email });
        if (user) {
          if (this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: (props) => "The specified email address is already in use.",
    },
    required: [true, "User email required"],
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;
  console.log("just before");
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//Compare password in database
userSchema.methods.comparePassword = async function (email, enterPassword) {
  const user = await this.model("Users").findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(enterPassword, this.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return isMatch;
};

//Generate Token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
    },
    "thisismynewcourse"
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// userSchema.methods.findByCredentials = async (email, password) => {
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error("Unable to login");
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new Error("Unable to login");
//   }
//   return user;
// };

module.exports = mongoose.model("Users", userSchema);
