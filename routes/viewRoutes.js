const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewController.getHome);
router.get('/overview', authController.protect, viewController.getOverview);
router.get('/me', viewController.getUser);
router.route('/post/:id').get(authController.protect, viewController.getPost);
router.route('/forgotPassword').get(viewController.forgotPassword);
router.route('/resetPassword/:id').get(viewController.resetPassword);

module.exports = router;
