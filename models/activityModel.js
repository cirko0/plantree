const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'post must have title!'],
    trim: true,
    maxlength: [40, 'A post name must have less or equal then 40 characters'],
    minlength: [10, 'A post name must have more or equal then 10 characters'],
  },
  photo: String,
  name: String,
  createdAt: {
    type: Date,
  },
  userID: Number,
});

activitySchema.pre('save', function (next) {
  this.createdAt = Date.now();
  if (!this.photo) {
    this.photo = 'user.webp';
  }
  next();
});
const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
