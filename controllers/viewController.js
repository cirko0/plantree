const Activity = require('../models/activityModel');
const Post = require('../models/postModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getHome = catchAsync(async (req, res) => {
  const activities = await Activity.find().sort('-createdAt').limit(4);
  res.status(200).render('home', {
    title: 'Početna',
    activities,
  });
});

exports.getOverview = catchAsync(async (req, res) => {
  // Get post data
  let posts;
  if (req.user.role === 'admin') {
    posts = await Post.find();
  } else {
    posts = await Post.find({ userID: req.user.id });
  }
  // Build template

  // Render template
  res.status(200).render('overview', {
    title: 'Vaše objave',
    posts,
  });
});

exports.getUser = (req, res) => {
  res.status(200).render('me', {
    title: 'Profil',
  });
};

exports.getPost = catchAsync(async (req, res, next) => {
  let post;
  if (req.user.role === 'admin') {
    post = await Post.findOne({
      _id: req.params.id,
    });
  } else {
    post = await Post.findOne({
      _id: req.params.id,
      userID: req.user.id,
    });
  }
  if (!post) {
    return next(new AppError('There is no post with that id.', 404));
  }

  res.status(200).render('post', {
    title: post.title,
    post,
  });
});

exports.forgotPassword = function (req, res) {
  res.status(200).render('forgotPassword', {
    title: 'Zaboravljena lozinka',
  });
};

exports.resetPassword = function (req, res) {
  res.status(200).render('resetPassword', {
    title: 'Resetuj lozinku',
  });
};
