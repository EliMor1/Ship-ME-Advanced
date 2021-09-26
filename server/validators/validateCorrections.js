const Joi = require('@hapi/joi');

const validateInputCorrection = async (req,res,next) =>{
    const schema ={
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }
    const {error} = Joi.validate(req.body, schema);
    if(error){
        return res.send(error.details[0].message);
    }
    next();
}

module.exports = validateInputCorrection;