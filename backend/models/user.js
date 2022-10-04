const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
    fileName: { type: String },
    uploadDate: { type: Date },
    idName: { type: String }
})

const userSchema = mongoose.Schema({
    userEmail: { type: String, required: true, unique: true },
    userName: { type: String, required: true},
    userFiles: { type: [ Object ], default: [] }
}, {
    timeStamps: true
})

module.exports = mongoose.model('User', userSchema);