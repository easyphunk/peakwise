const Trip = require('./../models/Trip');
const User = require('./../models/User');
const DBRequestFeatures = require('../utils/DBRequestFeatures');
const AppError = require('../utils/AppError');
const ObjectId = require('mongodb').ObjectID;

exports.aliasTopTrips = async (req, res, next) => {
    req.query.limit = '3';
    req.query.sort = '-likes';
    next();
};

exports.getAllTrips = async (req, res, next) => {
    try {
        const dbRequest = new DBRequestFeatures(Trip.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const trips = await dbRequest.query.populate('completedBy');

        res.status(200).send(trips);
    } catch (err) {
        next(err);
    }
};

exports.getTrip = async (req, res, next) => {
    try {
        const trip = await Trip.findById(req.params.id).populate('completedBy');
        if (!trip) {
            throw new AppError('No trip found with this ID', 404);
        }
        res.status(200).send(trip);

    } catch (err) {
        next(err);
    }
};

exports.createTrip = async (req, res, next) => {
    try {
        const newTrip = await Trip.create(req.body);

        res.status(201).send(newTrip);
    } catch (err) {
        next(err);
    }
};

exports.updateTrip = async (req, res, next) => {
    try {
        if (req.query.hasOwnProperty('like')) {
            const userInitial = await User.findById(req.query.like);
            if (!userInitial.tripsLiked.includes(req.params.id)) {
                const trip = await Trip.findByIdAndUpdate(req.params.id, {
                    $inc: {
                        likes: 1
                    }
                });
                const user = await User.findByIdAndUpdate(req.query.like, {
                    $addToSet: {
                        tripsLiked: [new ObjectId(req.params.id)]
                    }
                })
                res.status(200).send({
                    status: 'success'
                });
            } else {
                res.status(200).send({
                    status: 'fail',
                    message: 'already liked'
                })
            }
        } else if (req.query.hasOwnProperty('unlike')) {
            const userInitial = await User.findById(req.query.unlike);
            if (userInitial.tripsLiked.includes(req.params.id)) {
                const trip = await Trip.findByIdAndUpdate(req.params.id, {
                    $inc: {
                        likes: -1
                    }
                })
                const user = await User.findByIdAndUpdate(req.query.unlike, {
                    $pull: {
                        tripsLiked: new ObjectId(req.params.id)
                    }
                })
                res.status(200).send({
                    status: 'success'
                });
            } else {
                res.status(200).send({
                    status: 'fail',
                    message: 'not in the like list'
                })
            }
        } else if (req.query.hasOwnProperty('conquer')) {
            const userInitial = await User.findById(req.query.conquer);
            if (!userInitial.tripsCompleted.includes(req.params.id)) {
                const trip = await Trip.findByIdAndUpdate(req.params.id, {
                    $addToSet: {
                        completedBy: [new ObjectId(req.query.conquer)]
                    }
                })
                const user = await User.findByIdAndUpdate(req.query.conquer, {
                    $addToSet: {
                        tripsCompleted: [new ObjectId(req.params.id)]
                    }
                })
                res.status(200).send({
                    status: 'success'
                });
            } else {
                res.status(200).send({
                    status: 'fail',
                    message: 'already conquered'
                })
            }
        } else if (req.query.hasOwnProperty('unconquer')) {
            const userInitial = await User.findById(req.query.unconquer);
            if (userInitial.tripsCompleted.includes(req.params.id)) {
                const trip = await Trip.findByIdAndUpdate(req.params.id, {
                    $pull: {
                        completedBy: new ObjectId(req.query.unconquer)
                    }
                })
                const user = await User.findByIdAndUpdate(req.query.unconquer, {
                    $pull: {
                        tripsCompleted: new ObjectId(req.params.id)
                    }
                })
                res.status(200).send({
                    status: 'success'
                });
            } else {
                res.status(200).send({
                    status: 'fail',
                    message: 'Not in the conquered list'
                })
            }
        } else {
            const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });

            if (!trip) {
                throw new AppError('No trip found with this ID', 404);
            }

            res.status(200).send(trip);
        }
    } catch (err) {
        next(err);
    }

};

exports.deleteTrip = async (req, res, next) => {
    try {
        const trip = await Trip.findByIdAndDelete(req.params.id);

        if (!trip) {
            throw new AppError('No trip found with this ID', 404);
        }

        res.status(204).send({
            status: 'success',
            data: null
        })
    } catch (err) {
        next(err);
    }

};

exports.getTripStats = async (req, res, next) => {
    try {
        const stats = await Trip.aggregate([
            {
                $match: { elevation: { $gte: 0 } }
            },
            {
                $group: {
                    _id: '$location',
                    countTrips: { $sum: 1 },
                    avgViews: { $avg: '$views' },
                    avgLikes: { $avg: '$likes' },
                    avgElevation: { $avg: '$elevation' },
                    minElevation: { $min: '$elevation' },
                    maxElevation: { $max: '$elevation' }
                }
            },
            {
                $sort: {
                    avgViews: 1
                }
            }
        ]);

        res.status(200).send(stats);

    } catch (err) {
        next(err);
    }
};