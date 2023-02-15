const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post must have title!'],
    trim: true,
    maxlength: [40, 'A post name must have less or equal then 40 characters'],
    minlength: [10, 'A post name must have more or equal then 10 characters'],
  },
  imageCover: {
    type: String,
    default: 'default.webp',
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  secretPost: {
    type: Boolean,
    default: false,
    select: false,
  },
  kind: {
    type: String,
  },
  description: {
    type: String,
    required: [true, 'Post must have description!'],
    minlength: [
      50,
      'A description must have more or equal then 254 characters',
    ],
    trim: true,
  },
  userID: Number,
});

postSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  this.secretPost = undefined;

  next();
});

postSchema.pre(/^find/, function (next) {
  this.find({ secretpost: { $ne: true } });
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
