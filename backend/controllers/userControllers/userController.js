const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const HttpError = require('../../models/httpError')
const User = require('../../models/user');
const uuid = require('uuid').v4;

const loginUser = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next( new HttpError('Invalid Inputs, Please check again!!',422) );
    }

    try{
        let {username, role} = req.body;
        let existingUser = await User.findOne({ userName: username });
        let userRole;
        if(!existingUser){
            var newUser = new User({
                userName: username,
                role: role
            });
            await newUser.save();
            userRole = newUser.role;
        }

        token = jwt.sign({userName: username, role: userRole || existingUser.role}, process.env.JWT_SECRET, { expiresIn: '1h'});
        
        return res.status(200).json({"authToken": token});

    }catch(e){
        return next( new HttpError(e.message || "Couldn't login something went", e.code || 500 ) );
    }

}
const postLogin = async(req, res, next)=>{
    try{
        var email = req.user._json.email;
        console.log(email);
        var user = await User.findOne({userEmail: email});
        if(!user){
            let newUser = new User({
                userEmail: email,
                userName: req.user._json.name
            })
            await newUser.save();
        }
    }catch(e){
        console.log(e);
    }
    return res.redirect(process.env.CLIENT_URL);
}

const getLoginDetails = async (req, res, next)=>{
    if(req.user){
        try{
            let user = await User.findOne({userEmail: req.user._json.email});
            return res.status(200).json({
                message: "You are logged in.",
                user: user
            });
        }catch(e){
            return next(new HttpError("Not Authorized!!!", 403))
        }
    }else{
        return next(new HttpError("Not Authorized!!!", 403));
    }
};

const googleLogout = async (req, res, next)=>{
    if(req.user){
        req.logout();
    }else{
        console.log("================Something is going wrong==================");
    }
    return res.status(200).json({
        message: "Logout Successful!!!",
    });
}

const upload = async(req, res, next) =>{
    console.log("it works")
    console.log(req.file);
    try{
        let email = req.user._json.email;
        console.log(email);

        let newFile = {
            fileName: req.file.originalname,
            uploadDate: new Date(),
            idName: req.file.filename
        }

        await User.findOneAndUpdate({userEmail: email}, {
            $push: {userFiles: newFile}
        })

        return res.status(200).json({message: "File Uploaded Successfully.", fileDetails: newFile});
    }catch(e){
        return next(new HttpError(e.message || "Couldn't upload the file. Try again."), e.code || 500);
    }

}

exports.loginUser = loginUser;
exports.postLogin = postLogin;
exports.getLoginDetails = getLoginDetails;
exports.googleLogout = googleLogout;
exports.upload = upload;