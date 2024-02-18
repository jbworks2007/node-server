const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  phone: { type: Number, required: true, unique: true, trim: true, min: 10 },
  role: {
    type: String,
    enum: { values: ["admin", "user"], message: `[VALUE] not supported` },
  },
});

module.exports = mongoose.model("User", userSchema);
