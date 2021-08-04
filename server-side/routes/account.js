const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyjwt');
const accountController = require('../controllers/accountController');
const validateData = require('../validators/validateExistingData');

// display user's profile settings
router.post('/profile', verifyToken, accountController.getProfileData);

// display user's company settings
router.post('/company', verifyToken, accountController.getCompanyData);

// update user's profile settings
router.post('/profile/update', verifyToken, accountController.updateProfileData);

// update user's company settings (Company owner only)
router.post('/company/update', verifyToken, accountController.updateCompanyData);

// adding a new user to the user's owned company (Company manager only)
router.post('/account/new-user', validateData, accountController.createNewUser);

// removing an existing user from the manager's company (removes the chosen user only from the manager's company)
router.post("/account/delete", accountController.removeExistingCompanyUser);


// editing an existing user in the manager's company
router.post("/account/edit", accountController.editExistingCompanyUser);


module.exports = router;