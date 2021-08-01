const mongoose = require('mongoose');

const userFeaturesTemplate = new mongoose.Schema({
    firstName:{
        //type:String,
        
    },
    lastName:{
        type:String,
        //required:true
    },
    jobTitle:{
        type:String,
    },
    primaryPhone:{
        type:String,
    },
    secondaryPhone:{
        type:String,
    },
    primaryEmail:{
        type:String,
    },
    secondaryEmail:{
        type:String,
    },
    //companies:[],  //companies.company
    companyName:{
        type:String,
    },
    companyRole:{
        type:String,
    },
    userType:{
        type:String,
    },
    companies:[{companyName:{type:String}, companyRole:{type:String}}]

});

module.exports = mongoose.model('userTable',userFeaturesTemplate);