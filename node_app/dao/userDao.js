import User from '../models/User.js'

export const createUser = (data) => new User(data).save()

export const findUserByEmail = async (email) => {
  console.log('email', email)
  return await User.findOne({ email })
}
