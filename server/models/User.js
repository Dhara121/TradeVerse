const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    virtualBalance: {
      type: Number,
      default: 100000, // Assuming that ₹1,00,000 is  starting capital
    },
    


  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
