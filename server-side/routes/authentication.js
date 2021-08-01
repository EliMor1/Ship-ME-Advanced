const express = require('express');
const router = express.Router();
const authModel = require('../models/signUpModels');
const userModel = require('../models/userModel');
const companyModel = require('../models/companyModel');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
//const verifyToken = require('./verifyjwt');

router.post('/signup', async function(req,res){
    
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

    const validateExistingEmail = await authModel.findOne({email:req.body.email});
    if(validateExistingEmail){
        return res.send('email account already exist.');
    }
    
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, saltPassword);

    const signedUpUser = await new authModel({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:securePassword,
        userType:"user"
    })

    const newUserCompany = await new userModel({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        jobTitle:"",
        primaryPhone:"",
        secondaryPhone:"",
        primaryEmail:req.body.email,
        secondaryEmail:"",
        companyName:req.body.firstName,
        companyRole:"Manager",
        userType:"user",
        companies:[{companyName:"",companyRole:""}],
    })

    const newCompany = await new companyModel({
        companyManager:req.body.email,
        companyName:req.body.firstName,
        companyAddress:"",
        city:"",
        state:"",
        zipCode:"",
        companyPhone:"",
        companyEmail:"",
        companyWebsite:"",
        primaryContactName:req.body.firstName,
        primaryContactPhone:"",
        primaryContactJobTitle:"Manager",
        companyUsers:[{companyUserName:"",companyUserRole:""}],

    })
    
    const token = jwt.sign({email:req.body.email}, process.env.TOKEN);
    signedUpUser.save()
    newUserCompany.save()
    newCompany.save()
    try{
        res.send(token);
    }
    catch(error){
        res.send(error);
    }
        // .then(data =>{
        //     res.json(data);
        // })
        // .catch(error =>{
        //     res.json(error);
        // });
});

router.post('/login', async function(req,res){
    
    const user = await authModel.findOne({email:req.body.email});
    if(!user){
        return res.send('invalid email address.');
    }
    const passwordVerification = await bcrypt.compare(req.body.password, user.password);
    if(!passwordVerification){
        return res.send('invalid password.');
    }
    const token = jwt.sign({email:req.body.email},process.env.TOKEN);
    console.log("email and pass of user: ", user.email + " " + passwordVerification);
    try{
        res.send(token);
    }
    catch(error){
        res.send(error);
    }

});

router.get('/validate', async function(req,res){
    return res.status(401).send('Access Denied, Error 401.');
})



module.exports = router;