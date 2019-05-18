import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const Role = Object.freeze({
  Admin: 'admin',
  Supporter: 'supporter',
  Participant: 'participant',
  Trainer: 'trainer',
  None: 'none'
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
    enum: Object.values(Role),
    default: [Role.Participant],
    required: true
  }
}, {collection: 'users', timestamps: true});

const User = mongoose.model("User", UserSchema);

export default User;