import Feedback from '../../../models/Feedback'
import Activity from '../../../models/Activity'
import User from '../../../models/User'
import Service from '../../../models/Service'

const fetchByIDFromModel = async (id, model) => {
  return await model.findById(id)
}

const fetchService = async function(id) {
  return await Service.findOne({_id: id})
}

const fetchServices = async (services) => {
  const fetchedServices = await Promise.all(services.map(s => {
    return fetchService(s)
  }))
  const finishServices = fetchedServices.filter(s => s !=null)
  return  finishServices
}

export async function isTrainer(user) {
  if (!user) {
    return false
  }
  const eUser = await User.findById(user.id)
  if (!eUser.roles.includes('trainer')) {
    return false
  }
  return true
}

export default {
  Query: {
    feedback: () => {
      return new Promise((resolve, reject) => {
        Feedback.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
  },
  Mutation: {
    async createFeedback (root, { activityID, participantID, trainerID, participantFeedback, trainerFeedback, comment }, { user }) {
    
      try {
        const isUserTrainer = await isTrainer(user)
        if (!isUserTrainer) {
          throw Error('Must be logged in trainer to create feedback.')
        }

        const activity = await fetchByIDFromModel(activityID, Activity)
        const userP = await fetchByIDFromModel(participantID, User)
        const userT = await fetchByIDFromModel(trainerID, User)
        if (!userT.roles.includes('trainer')) {
          throw Error('Only trainers can create feedback.')
        }

        if (!userP.roles.includes('participant')) {
          throw Error('A participant is required to give feedback on.')
        }

        const services = await Service.find({}).populate().exec()
        const serviceIDs = trainerFeedback.map(s => s.serviceID)
        const servicesFromIDs = await fetchServices(serviceIDs)
        
        if(servicesFromIDs.length !== serviceIDs.length) {
          throw Error('Trainer feedback is invalid')
        }

        if (services.length != trainerFeedback.length || new Set(serviceIDs).size != serviceIDs.length) {
          throw Error(`Must provide feedback for all ${services.length} unique services`)
        }

        const newFeedback = new Feedback({ activityID: activity._id, participantID, trainerID, participantFeedback, trainerFeedback, comment });
        return await newFeedback.save()
      } catch(e) {
        throw Error(e)
      }
    }
  }
};
