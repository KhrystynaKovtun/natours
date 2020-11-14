const express = require('express');
const {
  getOverview,
  getTour,
  login,
  getAccountDetails,
} = require('../controllers/viewController');

const { protect, isLoggedIn } = require('../controllers/authController');

const router = express.Router();

router.use(isLoggedIn);
router.get('/', getOverview);
router.get('/tour/:id', protect, getTour);
router.get('/login', login);
router.get('/me', getAccountDetails);

module.exports = router;
