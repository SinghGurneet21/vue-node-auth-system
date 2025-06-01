import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as userDao from '../dao/userDao.js'
import creds from '../credentials.json' with { type: 'json' }

export const register = async ({ email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await userDao.createUser({ email, password: hashedPassword })
  return user
}

export const login = async ({ email, password }) => {
  const user = await userDao.findUserByEmail(email)
  console.log('user', user)

  if (!user) return null

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return null

  const token = jwt.sign({ id: user._id }, creds.JWT_SECRET, { expiresIn: '1h' })
  return { token }
}
const authService = {
  login,
  register,
  // other exports
};

export default authService;