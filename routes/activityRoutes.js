const express = require('express');
const activityController = require('../controllers/activityController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(authController.protect, activityController.createActivity)
  .patch(authController.protect, activityController.updateActivity);

module.exports = router;
