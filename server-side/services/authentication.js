const authModel = require('../models/signUpModels');
const userModel = require('../models/userModel');
const companyModel = require('../models/companyModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.verifyUser = async (query) =>{
    const user = await authModel.findOne({email:query.email});
    if(!user){
        return ('invalid email address.');
    }
    const passwordVerification = await bcrypt.compare(query.password, user.password);
    if(!passwordVerification){
        return ('invalid password.');
    }
    const token = jwt.sign({email:query.email},process.env.TOKEN);
    console.log("email and pass of user: ", user.email + " " + passwordVerification);
    try{
        return(token);
    }
    catch(error){
        return(error);
    }
}

exports.authenticateUser = async (query) =>{


    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(query.password, saltPassword);

    const signedUpUser = await new authModel({
        firstName:query.firstName,
        lastName:query.lastName,
        email:query.email,
        password:securePassword,
        userType:"user"
    })

    return signedUpUser;
}

exports.signUpUser = async(query) =>{
    
    const newUserCompany = await new userModel({
        firstName:query.firstName,
        lastName:query.lastName,
        jobTitle:"",
        primaryPhone:"",
        secondaryPhone:"",
        primaryEmail:query.email,
        secondaryEmail:"",
        companyName:query.firstName,
        companyRole:"Manager",
        userType:"user",
        companies:[{companyName:"",companyRole:""}],
    })

    return newUserCompany;
}

exports.signUpCompany = async(query) =>{
      const newCompany = await new companyModel({
        companyManager:query.email,
        companyName:query.firstName,
        companyAddress:"",
        city:"",
        state:"",
        zipCode:"",
        companyPhone:"",
        companyEmail:"",
        companyWebsite:"",
        primaryContactName:query.firstName,
        primaryContactPhone:"",
        primaryContactJobTitle:"Manager",
        companyUsers:[{companyUserName:"",companyUserRole:""}],

    })
    return newCompany;
}