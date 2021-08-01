const authModel = require('../models/signUpModels');
const userModel = require('../models/userModel');
const companyModel = require('../models/companyModel');
const bcrypt = require('bcrypt');

exports.getProfileData = async function(req,res){
    try{
        
        const user = await userModel.findOne({primaryEmail:req.verified});
        console.log('verified user is: ', req.verified);
        console.log(user);
        res.send(user);
    }
    catch(error){
        res.status(401).send('Invalid Access Token Generated.');
    }
}

exports.getCompanyData = async function(req,res){
    try{
        const company = await companyModel.findOne({companyManager:req.verified});
        console.log(company);
        res.send(company);
    }
    catch(error){
        res.status(401).send('Invalid Access Token Generated.');
    }
}

exports.updateProfileData = async function(req,res){
    try{
        const updatedUser = await userModel.findOneAndUpdate(
            {primaryEmail:req.verified},
            {   firstName:req.body.firstName,
                lastName:req.body.lastName,
                jobTitle:req.body.jobTitle,
                primaryPhone:req.body.primaryPhone,
                secondaryPhone:req.body.secondaryPhone,
                secondaryEmail:req.body.secondaryEmail,
            }
            );
        const updatedCurrentUserCompany = await companyModel.findOneAndUpdate(
            {companyManager:req.verified},
            {   
                primaryContactName:req.body.firstName,
                primaryContactPhone:req.body.primaryPhone,
                primaryContactJobTitle:req.body.jobTitle,
            })
        console.log("updated succseessfully!", updatedUser);
        res.send(updatedUser);
    }
    catch(error){
        res.status(401).send('Invalid Access Token Generated.');
    }
}

exports.updateCompanyData = async function(req,res){
    try{
        const updatedCompany = await companyModel.findOneAndUpdate(
            {companyManager:req.verified},
            {   companyName:req.body.companyName,
                companyAddress:req.body.companyAddress,
                city:req.body.companyCity,
                state:req.body.companyState,
                zipCode:req.body.companyZipCode,
                companyPhone:req.body.companyPhone,
                companyEmail:req.body.companyEmail,
                companyWebsite:req.body.companyWebsite,
                primaryContactName:req.body.primaryContactName,
                primaryContactPhone:req.body.primaryContactPhone,
                primaryContactJobTitle:req.body.primaryContactJobTitle,
            }
            );
        const updatedCompanysManager = await userModel.findOneAndUpdate(
            {primaryEmail:req.verified},
            {   
                companyName:req.body.companyName,
                // firstName:req.body.firstName,
                // primaryContactPhone:req.body.primaryPhone,
                // primaryContactJobTitle:req.body.jobTitle,
            }
            );
        console.log("updated succseessfully!", updatedCompany);
        res.send(updatedCompany);
    }
    catch(error){
        res.status(401).send('Invalid Access Token Generated.');
    }
}

exports.createNewUser = async function(req,res){
    const validateExistingEmail = await authModel.findOne({email:req.body.email});
    if(validateExistingEmail){
        return res.send('email account already exist.');
    }

    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, saltPassword);

    const company = await companyModel.findOneAndUpdate(
        {companyName:req.body.companyName},
        {
            $push:{companyUsers:[{companyUserName:req.body.firstName, companyUserRole:req.body.companyRole}]}
        });

    const signedUpUser = await new authModel({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:securePassword,
        userType:"user"
    });

    const newUserCompany = await new userModel({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        jobTitle:req.body.jobTitle,
        primaryPhone:req.body.phone,
        secondaryPhone:"",
        primaryEmail:req.body.email,
        secondaryEmail:"",
        companyName:undefined,
        companyRole:undefined,
        userType:req.body.userType,
        companies:[{companyName:req.body.companyName,companyRole:req.body.companyRole}],
    });

    signedUpUser.save();
    newUserCompany.save();
    try{
        console.log('successfully, a new user added to the company.');
        res.send(company);
    }
    catch(error){
        res.send(error);
    }
}

exports.removeExistingCompanyUser = async function(req,res){
    const company = await companyModel.findOneAndUpdate(
        {companyName:req.body.companyName},
        {
            $pull:{companyUsers:{companyUserName:req.body.firstName, companyUserRole:req.body.companyRole}}
        });
        try{
            res.send(company);
        }
        catch(error){
            res.send(error);
        }
}

exports.editExistingCompanyUser = async function(req,res){
    const userInCompany = await companyModel.findOne({companyName:req.body.companyName},{companyUsers:{companyUserName:req.body.firstName, companyUserRole:req.body.companyRole} })
    const user = userInCompany.companyUsers[0].companyUserName;
    const userUpdated = await userModel.findOneAndUpdate({firstName:user, primaryEmail:req.body.email},
        {
            jobTitle:req.body.jobTitle,
            primaryPhone:req.body.phone,
    })
    try{
        res.send(userUpdated);
    }catch(error){
        res.send(error);
    }
}