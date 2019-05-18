import Activity from "../../../models/Activity"
import { isAdmin } from "../User/index"
import Service from "../../../models/Service"

const fetchService = async function(id) {
  return await Service.findOne({_id: id})
}

const fetchServices = async (services) => {
  return await Promise.all(services.map(s => {
    return fetchService(s)
  }))
}

export default {
  Query: {
    async activities () {
      const activities = await Activity.find({}).populate().exec()
      return activities
    }
  },
  Mutation: {
    async createActivity (root, { name, services }, { user }) {
      try {
        const isUserAdmin = await isAdmin(user)
        if (!isUserAdmin) {
          throw Error('You must be a logged in admin to create a user')
        }
        
        const serviceIDs = await fetchServices(services)

        if (serviceIDs.length === 0) {
          throw Error('No services were provided')
        }

        const newActivity = new Activity({ name, services: serviceIDs });
        return await newActivity.save()
      } catch(e) {
        throw Error(e)
      }
    }
  }
}
