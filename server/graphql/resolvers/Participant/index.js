// The User schema.
import Participant from "../../../models/Participant";

export default {
  Query: {
    participant: (root, args) => {
      return new Promise((resolve, reject) => {
        Participant.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    participants: () => {
      return new Promise((resolve, reject) => {
        Participant.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
  }
};