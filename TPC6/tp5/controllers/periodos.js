var mongoose = require("mongoose")
const {modelName} = require("../models/periodos")
var periodo = require("../models/periodos")

const {modelName2} = require("../models/compositores")
var compositor = require("../models/compositores")


module.exports.list=() => {
    return periodo.find().sort({_id:1}).exec()
}

module.exports.insert = (periodoNew) =>{
    var newPeriodo = new periodo(periodoNew)
    return newPeriodo.save()
}

module.exports.remove = (id) => {
    return periodo.findByIdAndDelete(id).exec()
}

module.exports.findId = (id) =>{
    return periodo.findOne({_id : id}).exec()
}
