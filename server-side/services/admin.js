const userModel = require('../models/userModel');
const companyModel = require('../models/companyModel');
const authModel = require('../models/signUpModels');

exports.fetchCompanies = async() =>{
    const companies = await companyModel.find({});
    return companies;
}

exports.createNewCompany = async(query) =>{
    const newCompany = await new companyModel({
        companyManager:"",
        companyName:query.companyName,
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

    });
    return newCompany;
}

exports.deleteSelectedCompany = async(query) =>{
    const deletedComp = await companyModel.findOneAndDelete({companyName:query.companyName});
    console.log('company deleted successfully.');
    return deletedComp;
}

exports.notifyManagerOnDelete = async(query) =>{
    const notifyManager = await userModel.findOneAndUpdate({companyName:query.companyManager},{
        companyName:undefined,
        companyRole:undefined,
    });
    console.log('manager notified.');
    return notifyManager;
}

exports.editSelectedCompany = async(query) =>{
    const company = await companyModel.findOneAndUpdate({companyName:query.companyName},{
        // _id:query.id,
        companyName:query.companyNewName,
        companyPhone:query.companyPhone,
        companyWebsite:query.companyWebsite,
        companyAddress:query.companyAddress,
        primaryContactName:query.primaryContactName,
        primaryContactPhone:query.primaryContactPhone,
    });
    console.log('company edited successfully.');
    return company;
}

exports.notifyManagerOnEdit = async(query) =>{
    const notifyCompanyManager = await userModel.findOneAndUpdate({primaryEmail:query.companyManager},{
        companyName:query.companyNewName,
        companyRole:query.companyRole,
    });
    console.log('manager notified.');
    return notifyCompanyManager;
}

   // notify all the users in the selected company about the relevant changes
        //  const usersInCompany = await companyModel.findOne({companyName:req.body.companyName},{companyUsers:{companyUserName:req.body.firstName, companyUserRole:req.body.companyRole} })
        //  for(var i=0; i<companyUsers.length; i++){
        //      const userName = usersInCompany.companyUsers[i].companyUserName;
        //      const userRole = usersInCompany.companyUsers[i].companyUserRole;
        //      const notifiedUser = await userModel.findOneAndUpdate({firstName:userName},{
        //          companies:[{companyName:req.body.companyName, companyRole:userRole}]
        //      })
     
        //  }