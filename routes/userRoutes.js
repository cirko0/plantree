const multer = require('multer');
const path = require('path');
const express = require('express');
const userController = require('../controllers/userContorller');
const authController = require('../controllers/authController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img');
  },

  filename: (req, file, cb) => {
    // console.log(file);
    const name = Date.now() + path.extname(file.originalname);
    cb(null, name);
    req.body.photo = undefined;
    req.body.photo = name;
  },
});

const upload = multer({ storage: storage });

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.patch(
  '/updateMe',
  authController.protect,
  upload.single('photo'),
  userController.updateMe
);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
