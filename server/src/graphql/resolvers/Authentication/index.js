// The Authentication schema.
import User from "../../../models/User";
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

export default {
  Query: {
    async me (_, args, { user }) {
      if (!user) {
        throw new Error('You are not authenticated')
      }
      return await User.findById(user.id)
    },
    async roles (_, args, { user }) {
      if (!user) {
        throw new Error('You are not authenticated')
      }

      const eUser = await User.findById(user.id)
      return eUser.roles
    }
  },
  Mutation: {
    async login (_, { email, password }) {
      const user = await User.findOne( { email })

      if (!user) {
        throw new Error('Error logging you in.')
      }

      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        throw new Error('Error loggin you in.')
      }

      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_TOKEN,
        { expiresIn: '1d' }
      )
    },
    async signup (_, { email, password }) {
      const ePassword = bcrypt.hashSync(password, 10)
      const newUser = new User({ email, password: ePassword })

      try {
        const savedUser = await newUser.save()
        const token = jsonwebtoken.sign(
          { id: savedUser._id, email: savedUser.email },
          process.env.JWT_TOKEN,
          { expiresIn: '1y' }
        )
        return token
      } catch(e) {
        return new Error('Error signing in.')
      }
    },
  }
};