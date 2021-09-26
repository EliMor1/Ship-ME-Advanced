const adminServices = require('../services/admin');

exports.getCompanies = async function(req,res){
    try{
        const companies = await adminServices.fetchCompanies();
        if(!companies){
            return res.status(400).send('companies not found.');
        }
        res.status(200).send(companies);
    }catch(err){
        res.send(err);
    }
    
   
}

exports.newCompany = async function(req,res){
    const query = req.body;
    const newCompany = await adminServices.createNewCompany(query);
    newCompany.save();
    try{
        res.status(201).send(newCompany);
    }
    catch(error){
        res.status(500).send('server error',error);
    }
}

exports.deleteCompany = async function(req,res){
    try{
        const query = req.query;
        const deletedComp = await adminServices.deleteSelectedCompany(query);
        if(!deletedComp){
            res.status(400).send('cannot find a company to delete');
        }
        const notifyManager = await adminServices.notifyManagerOnDelete(query);
        
        res.status(200).send(deletedComp);
    }catch(err){
        res.status(500).send('server error',err);
    }
}

exports.editCompany = async function(req,res){
        // edit the chosen company 
        const query = req.body;
        const company = await adminServices.editSelectedCompany(query);
        if(!company){
            res.status(400).send('cannot edit selected company');
        }
    
        // notify the company manager on it's company settings changes
        const notifyCompanyManager = await adminServices.notifyManagerOnEdit(query);
         try{
             res.status(200).send(company);
         }catch(error){
             res.status(500).send('server error',error);
         }
}