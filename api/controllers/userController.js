const User = require('./../models/User');
const AppError = require('../utils/AppError');
const jwt = require('../utils/jwt');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().sort('username');
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('tripsLiked');
        if (!user) {
            throw new AppError('No user found with this ID', 404);
        }

        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        const token = jwt.createToken({ id: newUser._id });
        res.status(200).header('Authorization', token).send(newUser);
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).send('Invalid login!');
            return;
        }

        const match = await user.matchPassword(password);
        if (!match) {
            res.status(401).send('Invalid login!');
            return;
        }

        const token = jwt.createToken({ id: user._id });
        res.header('Authorization', token).send(user);
    } catch (err) {
        next(err);
    }
}

exports.verifyLogin = async (req, res, next) => {
    const token = req.body.token || '';

    jwt.verifyToken(token)
        .then(data => {
            User.findById(data.id)
                .then(user => {
                    return res.status(200).send({
                        status: true,
                        user
                    });
                });
        })
        .catch(err => {
            if (['jwt must be provided'].includes(err.message)) {
                res.status(401).send('Unauthorized!');
                return;
            }

            res.send({
                status: false
            });
        })
}

exports.updateUser = async (req, res, next) => {
    try {
        if (req.body.password) {
            const user = await User.findById(req.params.id);
            const match = await user.matchPassword(req.body.currPassword);
            if (!match) {
                res.status(401).send({
                    status: 'fail',
                    message: 'Current password incorrect'
                });
            } else {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, async (err, hash) => {
                        if (err) { next(err); return }
                        req.body.password = hash;
                        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                            new: true,
                            runValidators: true
                        });
                        if (!user) {
                            throw new AppError('No user found with this ID', 404);
                        }
                        res.status(200).send({
                            status: 'success',
                            message: 'Password successfully changed'
                        });
                    });
                });
            }
        } else {

            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!user) {
                throw new AppError('No user found with this ID', 404);
            }
            
            res.status(200).send(user);
        }
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            throw new AppError('No user found with this ID', 404);
        }

        res.status(204).send({
            status: 'success',
            data: null
        })
    } catch (err) {
        next(err);
    }
};
