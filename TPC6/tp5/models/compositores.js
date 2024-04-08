var mongoose = require("mongoose")


var compositorSchem = new mongoose.Schema({
    _id: {
        type: String,
        required:true
    },
    bio: String,
    dataNasc : String,
    dataObito : String,
    nome : String,
    periodo : String

},{versionKey:false})

module.exports = mongoose.model("compositores",compositorSchem)