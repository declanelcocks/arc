import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  github: String,
}, {
  timestamps: true,
  toJSON: { virtuals: true },
})

userSchema.pre('save', function encryptNewPassword(next) {
  const user = this

  if (!user.isModified('password')) return next()

  return bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      user.password = hash
      return next()
    })
  })
})

userSchema.methods = {
  comparePassword(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      cb(err, isMatch)
    })
  },
}

userSchema.options.toJSON = {
  transform: function sanitizeUserDoc(doc, ret) {
    delete ret.password
    delete ret.passwordResetToken
    delete ret.passwordResetExpires
  },
}

module.exports = mongoose.model('User', userSchema)
export default exports
