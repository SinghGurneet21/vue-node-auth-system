// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true }
// })

// module.exports = mongoose.model('User', userSchema)

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
})

const User = mongoose.model('User', userSchema)

export default User
