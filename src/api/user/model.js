import mongoose, { Schema } from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true},
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  github: String,
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

userSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      user.password = hash
      next()
    })
  })
})

userSchema.methods = {
  comparePassword(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      cb(err, isMatch)
    })
  }
}

userSchema.options.toJSON = {
  transform: function(doc, ret, options) {
    delete ret.password
    delete ret.passwordResetToken
    delete ret.passwordResetExpires
  }
}

module.exports = mongoose.model('User', userSchema)
export default exports
