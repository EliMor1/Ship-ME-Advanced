const express = require('express');
const router = express.Router();
const authModel = require('../models/signUpModels');
const userModel = require('../models/userModel');
const companyModel = require('../models/companyModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyjwt');




// display user's profile settings
router.post('/profile', async function(req,res){
    try{
        const verify = jwt.verify(req.body.token, process.env.TOKEN);
        const verifiedUser = verify;
        console.log('verified user is: ', verifiedUser.email);
        const user = await userModel.findOne({primaryEmail:verifiedUser.email});
        console.log(user);
        res.send(user);
    }
    catch(error){
        res.status(401).send('Invalid Access Token Generated.');
    }
});

// display user's company settings
router.post('/company', async function(req,res){
    try{
        const verify = jwt.verify(req.body.token, process.env.TOKEN);
        const verifiedUser = verify;
        console.log('verified user is: ', verifiedUser.email);
        const company = await companyModel.findOne({companyManager:verifiedUser.email});
        console.log(company);
        res.send(company);
    }
    catch(error){
        res.status(401).send('Invalid Access Token Generated.');
    }
});

// update user's profile settings
router.post('/profile/update', async function(req,res){
    try{
        const verify = jwt.verify(req.body.token, process.env.TOKEN);
        const verifiedUser = verify;
        const updatedUser = await userModel.findOneAndUpdate(
            {primaryEmail:verifiedUser.email},
            {   firstName:req.body.firstName,
                lastName:req.body.lastName,
                jobTitle:req.body.jobTitle,
                primaryPhone:req.body.primaryPhone,
                secondaryPhone:req.body.secondaryPhone,
                secondaryEmail:req.body.secondaryEmail,
            }
            );
        const updatedCurrentUserCompany = await companyModel.findOneAndUpdate(
            {companyManager:verifiedUser.email},
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
});

// update user's company settings (Company owner only)
router.post('/company/update', async function(req,res){
    try{
        const verify = jwt.verify(req.body.token, process.env.TOKEN);
        const verifiedUser = verify;
        const updatedCompany = await companyModel.findOneAndUpdate(
            {companyManager:verifiedUser.email},
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
            {primaryEmail:verifiedUser.email},
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
});

// adding a new user to the user's owned company (Company manager only)
router.post('/account/new-user', async function(req,res){
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

});

// removing an existing user from the manager's company (removes the chosen user only from the manager's company)
router.post("/account/delete", async function(req,res){
    const company = await companyModel.findOneAndUpdate(
        {companyName:req.body.companyName},
        {
            $pull:{companyUsers:{companyUserName:req.body.firstName, companyUserRole:req.body.companyRole}}
        });
        try{
            console.log('done.');
            res.send(company);
        }
        catch(error){
            res.send(error);
        }
})


// editing an existing user in the manager's company
router.post("/account/edit", async function(req,res){
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

})


module.exports = router;