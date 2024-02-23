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
    type: [mongoose.SchemaTypes.ObjectId]
  }
//   {
//     "id": "65d8e2a8fe524b980dd35321",
//     "name": "John Doe",
//     "email": "john.doe@example.com"
// },
// {
//     "id": "65d8ebdd561d3aa672ee958b",
//     "name": "dan",
//     "email": "dan.doe@example.com"
// }
})

const User = mongoose.model('User', userSchema);

export default User;