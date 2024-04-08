var mongoose = require("mongoose")


var periodoSchem = new mongoose.Schema({
    _id: {
        type: String,
        required:true
    },


},{versionKey:false})

module.exports = mongoose.model("periodos",periodoSchem)