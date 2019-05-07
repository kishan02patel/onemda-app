import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Roles = Object.freeze({
  Admin: 'admin',
  Supporter: 'supporter',
  Participant: 'participant',
  Trainer: 'trainer'
})

// Create the User Schema.
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    enum: Object.values(Roles),
    default: [Roles.Participant],
    required: true
  }
}, {collection: 'users'});

const User = mongoose.model("User", UserSchema);

export default User;