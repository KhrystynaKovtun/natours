const express = require('express');

const {
  getAllUsers,
  getUser,
  createUser,
  updateMe,
  deleteMe,
  deleteUser,
  updateUser,
  getMe,
  uploadUserPhoto,
  resizePhoto,
} = require('../controllers/userController');

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  restrictTo,
  logout,
} = require('../controllers/authController');

const router = express.Router();
router.get('/me', protect, getMe, getUser);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Protected routes after this middleware
router.use(protect);

router.patch('/updateMyPassword', updatePassword);
router.patch('/updateMe', uploadUserPhoto, resizePhoto, updateMe);
router.delete('/deleteMe', deleteMe);

// Routes available only for admins
router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(restrictTo('admin'), updateUser)
  .delete(restrictTo('admin'), deleteUser);

module.exports = router;
