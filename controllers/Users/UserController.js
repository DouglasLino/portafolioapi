const bcrypt = require('bcrypt')
const User = require('../../models/UserModel')
const { registerValidator } = require('./Validator')

var UserController = {
    login: async (req, res) => {

    },

    register: async (req, res) => {

        try {
            await registerValidator(req.body)

            // validar si es unico segun la bdd
            //  exista el req.body.mail o req.body.username
            const notUnique = await User.find({ $or: [{ username: req.body.username }, { email: req.body.email }] })

            if (notUnique.length != 0) {
                throw "Email or username already registered"
            }

            // hash contra
            let hashedPassword = await bcrypt.hash(req.body.password, parseInt(process.env.SALT))

            let newUser = new User({
                fullname: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                phone: req.body.phone,
                dob: req.body.dob
            })

            await newUser.save()
            return res.status(201).json({
                error: "false",
                message: "Created"
            })

        } catch (err) {
            // los errores de joi, son caracteristicos.
            // console.log(err)
            return res.status(400).json(
                err.details != null? err.details[0].message : err
            )
        }

    }
}

module.exports = UserController