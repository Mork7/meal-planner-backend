import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please input a name"]
  },
  email: {
    type: String,
    required: [true, "Please input an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please input a password"]
  },
  meals: {
    type: [],
  }
})

const User = mongoose.model('User', userSchema);

export default User;