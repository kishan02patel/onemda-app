// The User schema.
import User from "../../../models/User";

async function isAdmin(user) {
  if (!user) {
    return false
  }
  const eUser = await User.findById(user.id)
  if (!eUser.roles.includes('admin')) {
    return false
  }
  return true
}

export default {
  Query: {
    user: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    users: () => {
      return new Promise((resolve, reject) => {
        User.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    }
  },
  Mutation: {
    async createUser (root, { email, password, roles }, { user }) {
      const isAdmin2 = await isAdmin(user)
      if (!isAdmin2) {
        throw Error('You must be a logged in admin to create a user')
      }

      const newUser = new User({ email, password, roles });

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    async editUser (root, { id, email, password, roles }, { user }) {
      const isAdmin2 = await isAdmin(user)
      if (!isAdmin2) {
        throw Error('You must be a logged in admin to edit a user')
      }

      return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ id }, { $set: { email, password, roles } }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteUser: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};