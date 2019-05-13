import Service from "../../../models/Service";
import { isAdmin } from "../User/index"

export default {
  Query: {
    services: () => {
      return new Promise((resolve, reject) => {
        Service.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
  },
  Mutation: {
    async createService (root, { name }, { user }) {
      const isAdmin2 = await isAdmin(user)
      if (!isAdmin2) {
        throw Error('You must be a logged in admin to create a user')
      }

      const newService = new Service({ name });

      return new Promise((resolve, reject) => {
        newService.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};