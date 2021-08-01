const userModel = require('../models/userModel');
const companyModel = require('../models/companyModel');
const authModel = require('../models/signUpModels');

exports.getCompanies = async function(req,res){
    const companies = await companyModel.find({});
    try{
        res.send(companies);
    }catch(err){
        res.send(err);
    }
}

exports.newCompany = async function(req,res){
    const newCompany = await new companyModel({
        companyManager:"",
        companyName:req.body.companyName,
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

    });
    newCompany.save()
    try{
        res.send(newCompany);
    }
    catch(error){
        res.send(error);
    }
}

exports.deleteCompany = async function(req,res){
    try{
        const deletedComp = await companyModel.findOneAndDelete({companyName:req.body.companyName});
        const notifyManager = await userModel.findOneAndUpdate({companyName:req.body.companyManager},{
            companyName:undefined,
            companyRole:undefined,
        });
        console.log('deleted');
        res.send(deletedComp);
    }catch(err){
        res.send(err);
    }
}

exports.editCompany = async function(req,res){
        // edit the chosen company 
        const company = await companyModel.findOneAndUpdate({companyName:req.body.companyName},{
            // _id:req.body.id,
            companyName:req.body.companyNewName,
            companyPhone:req.body.companyPhone,
            companyWebsite:req.body.companyWebsite,
            companyAddress:req.body.companyAddress,
            primaryContactName:req.body.primaryContactName,
            primaryContactPhone:req.body.primaryContactPhone,
        });
    
        // notify the company manager on it's company settings changes
        const notifyCompanyManager = await userModel.findOneAndUpdate({primaryEmail:req.body.companyManager},{
            companyName:req.body.companyNewName,
            companyRole:req.body.companyRole,
        });
    
       
        // notify all the users in the selected company about the relevant changes
        //  const usersInCompany = await companyModel.findOne({companyName:req.body.companyName},{companyUsers:{companyUserName:req.body.firstName, companyUserRole:req.body.companyRole} })
        //  for(var i=0; i<companyUsers.length; i++){
        //      const userName = usersInCompany.companyUsers[i].companyUserName;
        //      const userRole = usersInCompany.companyUsers[i].companyUserRole;
        //      const notifiedUser = await userModel.findOneAndUpdate({firstName:userName},{
        //          companies:[{companyName:req.body.companyName, companyRole:userRole}]
        //      })
     
        //  }
         try{
             res.send('company edited successfully.');
         }catch(error){
             res.send(error);
         }
}