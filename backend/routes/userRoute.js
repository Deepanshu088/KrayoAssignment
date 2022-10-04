const express = require('express');
const passport = require('passport')
const { check } = require('express-validator');
const HttpError = require('../models/httpError.js');
const userControllers = require('../controllers/userControllers/userController.js');
const authCheck = require('../middlewares/authCheck.js');
const upload = require('../multer.js');

const router = express.Router();

router.get("/google", passport.authenticate("google",["profile", "email"]))

router.get('/google/callback', passport.authenticate("google", {
    failureRedirect: "auth/login/failed",
}), userControllers.postLogin);

router.get("/login/failed", async(req, res, next)=>{
    console.log("Login failed!!!!")
    return next(new HttpError("Google Authenication Failed!!!. Try again.", 403));
})

router.get('/login/success', userControllers.getLoginDetails);


router.use(authCheck);

router.get("/logout", userControllers.googleLogout);

router.post("/upload", upload.single('newFile'), userControllers.upload);

router.delete("/delete", (req, res)=>{
    
});


module.exports = router;