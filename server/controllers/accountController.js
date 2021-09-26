const accountServices = require('../services/account');

exports.getProfileData = async function(req,res){
    try{
        const query = {primaryEmail:req.verified};
        const user = await accountServices.getUserProfileData(query);
        if(!user){
            res.status(401).send('Invalid Access Token Generated.');
        }
        res.status(200).send(user);
    }
    catch(error){
        res.status(500).send('server error',error);
    }
}

exports.getCompanyData = async function(req,res){
    try{
        const query = {companyManager:req.verified};
        const company = await accountServices.getUserCompanyData(query);
        if(!company){
            res.status(401).send('Invalid Access Token Generated.');
        }
        res.status(200).send(company);
    }
    catch(error){
        res.status(500).send('server error',error);
    }
}

exports.updateProfileData = async function(req,res){
    try{
        const query = req.body;
        const verification = {primaryEmail:req.verified};
        const updatedUser = await accountServices.updateCurrentUserProfile(verification, query);
        if(!updatedUser){
            res.status(401).send('Invalid Access Token Generated.');
        }

        const companyVerification = {companyManager:req.verified};
        const updatedCurrentUserCompany = await accountServices.updateCurrentUserCompany(companyVerification, query);
        if(!updatedCurrentUserCompany){
            res.status(401).send('Invalid Access Token Generated.');
        }
        res.status(200).send(updatedUser);
    }
    catch(error){
        res.status(500).send('server error',error);
    }
}

exports.updateCompanyData = async function(req,res){
    try{
        const query = req.body;
        const companyVerification = {companyManager:req.verified};
        const managerVerification = {primaryEmail:req.verified};

        const updatedCompany = await accountServices.updateCompany(companyVerification, query);
        if(!updatedCompany){
            res.status(401).send('Invalid Access Token Generated.');
        }
        const updatedCompanysManager = await accountServices.notifyManagerOnCompanyUpdate(managerVerification, query);
        if(!updatedCompanysManager){
            res.status(401).send('Invalid Access Token Generated.');
        }
        
        res.status(200).send(updatedCompany);
    }
    catch(error){
        res.status(500).send(error);
    }
}

exports.createNewUser = async function(req,res){
    try{
        const query = req.body;
        const securePassword = await accountServices.hashPassword(req.body.password);
        const company = await accountServices.appendUserToCompany(query);
        const signedUpUser = await accountServices.authenticateNewUser(securePassword, query);
        const newUserCompany = await accountServices.signUpNewUser(query);
        signedUpUser.save();
        newUserCompany.save();
        console.log('successfully, a new user added to the company.');
        res.status(200).send(company);
    }
    catch(error){
        res.status(500).send(error);
    }
}

exports.removeExistingCompanyUser = async function(req,res){
    try{
        const query = req.query;
        const company = await accountServices.removeExistingCompanyUser(query);
        res.status(200).send(company);
    }
    catch(error){
        res.status(500).send(error);
    }
   
}

exports.editExistingCompanyUser = async function(req,res){
    try{
        const query = req.body;
        const userInCompany = await accountServices.getUserInCompany(query);
        const user = userInCompany.companyUsers[0].companyUserName;
        const userUpdated = await accountServices.updateUserInCompany(user, query);
        res.status(200).send(userUpdated);
    }catch(error){
        res.status(500).send(error);
    }
  
}