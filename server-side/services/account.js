const authModel = require('../models/signUpModels');
const userModel = require('../models/userModel');
const companyModel = require('../models/companyModel');
const bcrypt = require('bcrypt');

exports.getUserProfileData = async(query) =>{
    try{
        const user = await userModel.findOne(query);
        console.log('verified user is: ', query.primaryEmail);
        console.log(user);
        return user;
    }
    catch(error){
        return error;
    }
}

exports.getUserCompanyData = async(query) =>{
    try{
        const company = await companyModel.findOne(query);
        console.log(company);
        return company;
    }
    catch(error){
        return error;
    }
}

exports.updateCurrentUserProfile = async(identifier, query) =>{
    try{
        const updatedUser = await userModel.findOneAndUpdate(identifier,
            {
                firstName:query.firstName,
                lastName:query.lastName,
                jobTitle:query.jobTitle,
                primaryPhone:query.primaryPhone,
                secondaryPhone:query.secondaryPhone,
                secondaryEmail:query.secondaryEmail,
            });
        console.log("updated succseessfully!", updatedUser);
        return updatedUser;
    }
    catch(error){
        return error;
    }
    
}

exports.updateCurrentUserCompany = async(identifier, query) =>{
    try{
        
        const updatedCompany = await companyModel.findOneAndUpdate(identifier,
            {
                primaryContactName:query.firstName,
                primaryContactPhone:query.primaryPhone,
                primaryContactJobTitle:query.jobTitle,
            });
        return updatedCompany; 
    }
    catch(error){
        return error;
    }
}

exports.updateCompany = async(identifier, query) =>{
    try{
        const updatedCompany = await companyModel.findOneAndUpdate(
            identifier,
            {   companyName:query.companyName,
                companyAddress:query.companyAddress,
                city:query.companyCity,
                state:query.companyState,
                zipCode:query.companyZipCode,
                companyPhone:query.companyPhone,
                companyEmail:query.companyEmail,
                companyWebsite:query.companyWebsite,
                primaryContactName:query.primaryContactName,
                primaryContactPhone:query.primaryContactPhone,
                primaryContactJobTitle:query.primaryContactJobTitle,
            }
        );
        return updatedCompany;
    }
    catch(error){
        return error;
    }
}

exports.notifyManagerOnCompanyUpdate = async(identifier, query) =>{
    try{
        const updatedCompanysManager = await userModel.findOneAndUpdate(
            identifier,
            {   
                companyName:query.companyName,
                // firstName:query.firstName,
                // primaryContactPhone:query.primaryPhone,
                // primaryContactJobTitle:query.jobTitle,
            }
        );
        console.log("updated succseessfully!", updatedCompany);
        return updatedCompanysManager;
    }
    catch(error){
        return error;
    }
}

exports.hashPassword = async(password) =>{
    try{
        const saltPassword = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password, saltPassword);
        console.log('password encryption completed successfully.');
        return securePassword;
    }
    catch(error){
        return error;
    }
}

exports.appendUserToCompany = async(query) =>{
    try{
        const company = await companyModel.findOneAndUpdate(
            {companyName:query.companyName},
            {
                $push:{companyUsers:[{companyUserName:query.firstName, companyUserRole:query.companyRole}]}
            }
        );
        return company;
    }
    catch(error){
        return error;
    }
}

exports.authenticateNewUser = async(securePassword, query) =>{
    try{
        const signedUpUser = await new authModel({
            firstName:query.firstName,
            lastName:query.lastName,
            email:query.email,
            password:securePassword,
            userType:"user"
        });
        return signedUpUser;
    }
    catch(error){
        return error;
    }
}

exports.signUpNewUser = async(query) =>{
    try{
        const newUserCompany = await new userModel({
            firstName:query.firstName,
            lastName:query.lastName,
            jobTitle:query.jobTitle,
            primaryPhone:query.phone,
            secondaryPhone:"",
            primaryEmail:query.email,
            secondaryEmail:"",
            companyName:undefined,
            companyRole:undefined,
            userType:query.userType,
            companies:[{companyName:query.companyName,companyRole:query.companyRole}],
        });
        return newUserCompany;
    }
    catch(error){
        return error;
    }
}

exports.removeExistingCompanyUser = async(query) =>{
    try{
        const company = await companyModel.findOneAndUpdate(
            {companyName:query.companyName},
            {
                $pull:{companyUsers:{companyUserName:query.firstName, companyUserRole:query.companyRole}}
            }
        );
        return company;
    }
    catch(error){
        return error;
    }
}

exports.getUserInCompany = async(query) =>{
    try{
        const userInCompany = await companyModel.findOne({companyName:query.companyName},{companyUsers:{companyUserName:query.firstName, companyUserRole:query.companyRole} });
        return userInCompany;
    }
    catch(error){
        return error;
    }
}

exports.updateUserInCompany = async(user, query) =>{
    try{
        const userUpdated = await userModel.findOneAndUpdate({firstName:user, primaryEmail:query.email},
            {
                jobTitle:query.jobTitle,
                primaryPhone:query.phone,
        });
        return userUpdated;
    }
    catch(error){
        return error;
    }
}