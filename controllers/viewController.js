const Tour = require('../models/tourModel');
const AppError = require('../utils/appErrors');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', { tours });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate({
    path: 'reviews',
  });

  if (!tour) return new AppError('There no tour with this id', 400);

  res.status(200).render('tour', { tour });
});

exports.login = (req, res) => {
  res.status(200).render('login');
};

exports.getAccountDetails = (req, res) => {
  res.status(200).render('account');
};
