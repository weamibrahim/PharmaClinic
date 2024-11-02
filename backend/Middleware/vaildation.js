const Joi = require('joi');

const RegistrationSchema = Joi.object({

    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    address: Joi.string().required(),
    specialization: Joi.string().required(),
    photo: Joi.string(),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    
})

const LoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
})

module.exports = {RegistrationSchema, LoginSchema}