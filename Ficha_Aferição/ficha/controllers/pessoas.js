const mongoose = require("mongoose")
const {modelName} = require("../models/pessoas")
let pessoa = require("../models/pessoas")

module.exports.list = () => {
    return pessoa.find().sort({nome:1}).exec()
}

module.exports.findById = (id) =>{
    return pessoa.findOne({_id:id}).exec()
}

module.exports.insert = (pessoaNew)=>{
    let newPessoa = new pessoa(pessoaNew)
    return newPessoa.save()
}

module.exports.update = (id,newPessoa)=>{
    return pessoa.updateOne({_id:id},newPessoa).exec()

}

module.exports.remove = (id) =>{
    return pessoa.findByIdAndDelete(id).exec()
}

