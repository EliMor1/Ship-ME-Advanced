const express = require('express');
const router = express.Router();
const authModel = require('../models/signUpModels');
const userModel = require('../models/userModel');
const companyModel = require('../models/companyModel');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');
const validateData = require('../validators/validateExistingData');
const validateInputCorrection = require('../validators/validateCorrections');

router.post('/signup', validateInputCorrection, validateData, authController.signup);

router.post('/login', authController.login);

router.get('/validate', async function(req,res){
    return res.status(401).send('Access Denied, Error 401.');
})



module.exports = router;