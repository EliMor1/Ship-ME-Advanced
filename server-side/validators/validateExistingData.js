const authModel = require('../models/signUpModels');

const validateExistingEmail = async (req,res,next) =>{
    try{
        const isEmailExist = await authModel.findOne({email:req.body.email});
        if(isEmailExist){
            return res.send('email account already exist.');
        }
        next();
    }
    catch(err){
        return res.send(err);
    }
}

module.exports = validateExistingEmail;