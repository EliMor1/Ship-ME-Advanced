const jwt = require('jsonwebtoken');
const authServices = require('../services/authentication');

exports.login = async function(req,res){
    const query = {email:req.body.email, password : req.body.password};
    const result = await authServices.verifyUser(query);
    try{
        res.send(result);
    }
    catch(error){
        res.send(error);
    }
}

exports.signup = async function(req,res){
    const query = req.body;
    const authUser = await authServices.authenticateUser(query);
    const user = await authServices.signUpUser(query);
    const company = await authServices.signUpCompany(query);
    authUser.save();
    user.save();
    company.save();
    
    const token = jwt.sign({email:req.body.email}, process.env.TOKEN);
    try{
        res.status(200).send(token);
    }
    catch(error){
        res.send(error);
    }
}