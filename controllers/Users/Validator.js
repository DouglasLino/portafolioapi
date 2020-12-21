const joi = require('joi')

const Validator = {
    registerValidator: data => {
        // se crea schema igual al de mongoose
        const validateSchema = joi.object({
            fullname: joi.string().min(6).required(),
            username: joi.string().required(),
            email: joi.string().min(6).required().email(),
            password: joi.string().min(6).required(),
            phone: joi.string().pattern(new RegExp('^[0-9]{8}$'))
        })

        return validateSchema.validateAsync(data)
    },
    loginValidator: data =>{
        const validateSchema = joi.object({
            username: joi.string(),
            email: joi.string().min(6).email(),
            password: joi.string().min(6)
        })

        return validateSchema.validateAsync(data)
    }
}

module.exports = Validator