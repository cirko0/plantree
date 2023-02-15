const Activity = require('../models/activityModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach(e => {
    if (allowedFields.includes(e)) {
      newObj[e] = obj[e];
    }
  });

  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find(); //!!!!!!!!!!!!!!!!!!!

  res.status(200).json({
    status: 'success',
    users,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please go to /updateMyPassword'
      ),
      400
    );
  }

  const filteredBody = filterObj(req.body, 'name', 'email', 'photo');

  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    updatedUser,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
