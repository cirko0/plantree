const Activity = require('../models/activityModel');
const catchAsync = require('../utils/catchAsync');

exports.createActivity = catchAsync(async (req, res, next) => {
  req.body.userID = req.user.id;
  const activity = await Activity.create(req.body);
  res.status(201).json({
    status: 'success',
    activity,
  });
});

exports.updateActivity = catchAsync(async (req, res, next) => {
  req.body.photo = req.user.photo;
  const activity = await Activity.find({ userID: req.user.id }).updateMany(
    req.body
  );
  res.status(200).json({
    status: 'success',
    activity,
  });
});
