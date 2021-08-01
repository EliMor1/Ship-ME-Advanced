const mongoose = require('mongoose');

const companyTemplate = new mongoose.Schema({
    companyManager:{
        type:String,
    },
    companyName:{
        type:String,
        required:true
    },
    companyAddress:{
        type:String,
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    },
    zipCode:{
        type:String,
    },
    companyPhone:{
        type:String,
    },
    companyEmail:{
        type:String,
    },
    companyWebsite:{
        type:String,
    },
    primaryContactName:{
        type:String,
    },
    primaryContactPhone:{
        type:String,
    },
    primaryContactJobTitle:{
        type:String,
    },
    companyUsers:[{companyUserName:{type:String}, companyUserRole:{type:String}}]

});

module.exports = mongoose.model('companyTable',companyTemplate);