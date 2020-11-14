const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
  setUserAndTourData,
} = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });
router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('admin', 'user'), setUserAndTourData, createReview);

router
  .route('/:id')
  .get(getReview)
  .delete(restrictTo('admin', 'user'), deleteReview)
  .patch(restrictTo('admin', 'user'), updateReview);

module.exports = router;
