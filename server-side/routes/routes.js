const express = require('express');
const router = express.Router();
const authModel = require('../models/signUpModels');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const companyModel = require('../models/companyModel');
const adminController = require('../controllers/adminController');

// super admin companies management routes

// display all collections of existing companies
router.get('/getcomps', adminController.getCompanies);     

// add a new company to the companies collections (Super admin only)
router.post('/newcomp', adminController.newCompany);

// delete a chosen company from the companies collections and notify all his/her references (Super admin only)
router.post('/delete', adminController.deleteCompany);

// editing a selected comapny, super admin posibilities.
router.post('/editcompany', adminController.editCompany)



module.exports = router;