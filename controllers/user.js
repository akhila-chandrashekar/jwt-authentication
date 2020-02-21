const User = require('../models/user');
const ValidationHelper = require('../helpers/validate_user');

module.exports = {
    createUser: async (req, res) => {
        const newUser = new User({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        });

        const user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).send({
                error: true,
                message: "User already exists"
            })
        }
        newUser.save((err, user) => {
            if (err) {
                res.status(400).send({
                    error: true,
                    message: "Something went wrong. "+ err.message
                })
            } else {
                res.status(200).send({
                    error: false,
                    message: "User created successfully",
                    data: user
                })
            }
        })
    },

    login: async (req, res) => {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).send({
                error: true,
                message: "User does'nt exists"
            });
        }
        const validationResult = await ValidationHelper.authenticate(req.body.password, user);
        if (!validationResult) {
            return res.status(400).send({
                error: true,
                message: "Something went wrong."
            })
        }
        if (validationResult.error) {
            return res.status(400).send({
                error: true,
                message: validationResult.message
            })
        }
        return res.status(200).send({
            error: false,
            message: "Login successful",
            token: validationResult.token
        });
    },

    getAllUsers: async (req, res) => {
        const users = await User.find({});
        if (!users || !users.length) {
            return res.status(400).send({
                error: true,
                message: "Users not found"
            });
        }
        return res.status(200).send({
            error: false,
            message: "Users fetched successfully",
            data: users
        });
    }
}