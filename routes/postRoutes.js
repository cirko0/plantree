const multer = require('multer');
const path = require('path');
const express = require('express');
const postController = require('../controllers/postController');
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
    req.body.imageCover = name;
  },
});

const upload = multer({ storage: storage });

router
  .route('/')
  .get(authController.protect, postController.getAllPosts)
  .post(
    authController.protect,
    upload.single('imageCover'),
    postController.createPost
  );

router
  .route('/:id')
  .get(authController.protect, postController.getPost)
  .patch(
    authController.protect,
    upload.single('imageCover'),
    postController.updatePost
  )
  .delete(authController.protect, postController.deletePost);

module.exports = router;
