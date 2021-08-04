const jwt = require('jsonwebtoken');

const verifyToken = async (req,res,next) =>{
    //const token = req.headers['Authorization'];
    const token = req.headers.authorization;
    if(!token){
        return res.send('Access Denied.');
    }
    try{
        const verify = jwt.verify(token, process.env.TOKEN);
        req.verified = verify.email;
        next();
    }catch(error){
        res.status(401).send('Invalid Access Token.');
    }
    
}

module.exports = verifyToken;