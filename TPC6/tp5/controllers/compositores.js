var mongoose = require("mongoose")
const {modelName} = require("../models/compositores")
var compositor = require("../models/compositores")

module.exports.list = () => {
    return compositor.find().sort({nome: 1}).exec()
}

module.exports.findById = (id) => {
    return compositor.findOne({_id : id}).exec()
}

module.exports.insert = (compositorNew) =>{
    var newComp = new compositor(compositorNew)
    return newComp.save()
}

module.exports.update = (id,compositorUp) => {
    return compositor.updateOne({_id:id},compositorUp).exec()
}

module.exports.remove = (id) => {
    return compositor.findByIdAndDelete(id).exec()
}

module.exports.findByPeriodo = (periodoF) => {
    filtro = {}
    return compositor.find({periodo : periodoF}).sort({nome : 1}).exec()
}

