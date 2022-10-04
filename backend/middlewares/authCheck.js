const jwt = require("jsonwebtoken");
const HttpError = require("../models/httpError");

const authCheck = (req, res, next)=>{
    console.log("Authchekc")
    console.log(req.user);

    if(req.method === 'OPTIONS'){
        return next();
    }
    try{
        if(req.user){
            next();
        }else{
            throw new Error("Not Authorized");
        }

    }catch(e){
        console.log(e)
        return next(new HttpError('Authentication failed!' , 401));
    }
}

module.exports = authCheck;