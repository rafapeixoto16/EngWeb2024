const mongoose = require("mongoose")
const {modelName} = require("../models/pessoas")
let pessoa = require("../models/pessoas")

module.exports.modalidades= () =>{
    return pessoa.aggregate([{"$unwind":"$desportos"},{$project:{"desportos":1,"_id":0}},{
        $group: {_id: null, uniqueValues: {$addToSet: "$desportos"}}}]).exec()
}

module.exports.pessoasByModalidades = (idDesporto)=> {
    return pessoa.aggregate([{"$unwind":"$desportos"},{$match:{"desportos":idDesporto}},{$project:{"nome":1,"_id":1}}]).exec()
}

