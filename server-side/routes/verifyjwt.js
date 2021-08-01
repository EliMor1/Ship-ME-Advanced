const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
    const authHeader = req.headers['token'];
    if(!authHeader){
        return res.send('Access Denied.');
    }
    //const token = authHeader && authHeader.split(' ')[1];
    try{
        const verify = jwt.verify(authHeader, process.env.TOKEN);
        console.log(verify);
        next();
    }catch(error){
        res.status(401).send('Invalid Access Token.');
    }
    
}

module.exports = verifyToken;