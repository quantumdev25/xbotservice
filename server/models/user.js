const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [4, "Name should be minimum of 4 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password should be minimum of 8 characters"],
  },
  role: {
    type: String,
    required: true,
    minLength: [1, "Name should be minimum of 1 characters"],
  },
  token: {
    type: String,
  },
});

// Hash the password before saving it to the database

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next;
  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
