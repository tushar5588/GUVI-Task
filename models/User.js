const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: {type:String, default:""},
  dob: {type:String, default:""},
});
const User = new mongoose.model("User", userSchema);
module.exports=User;