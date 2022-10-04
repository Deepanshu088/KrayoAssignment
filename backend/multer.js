const multer = require('multer')
const uuid = require('uuid').v4;

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log("file here", file);
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        if(file){
            let ext = file.originalname
            if(ext){
                ext = ext.split(".");
                ext = ext[ext.length-1];
            }

            var newFileName = uuid() + '.' + ext;
        }
        cb(null , newFileName);
    }
});

const upload = multer({storage: storage})

module.exports = upload;