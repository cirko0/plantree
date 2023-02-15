const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'User must have email!'],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default: 'user.webp',
  },
  id: {
    type: Number,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// If the password is modified encrypt it and also set passwordConfirm to undefined
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

// If the password is modified or it is new set passwordChangedAt to date.now()
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  // -1000 because of signing the token takes time
  this.passwordChangedAt = Date.now() - 1000;

  next();
});

// Don't return non active users
userSchema.pre('query', function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Functions

// Compare 2 passwords
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  // Token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hashed token that we store in db
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Expires date
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Valid for 10 min

  // Returning non hashed token for mail
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
