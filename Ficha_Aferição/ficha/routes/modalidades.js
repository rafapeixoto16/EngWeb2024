const express = require('express');
const router = express.Router();
let modalidade = require("../controllers/modalidades")
const pessoa = require("../controllers/pessoas");

router.get("/",function(req,res){
    modalidade.modalidades().then(resp =>{
        console.log(resp)
        console.log("Ola")
        res.status(200).json(resp)
    }).catch(erro =>{
        res.status(503).write(erro)})
})

router.get("/:idModalidade",function (req,res){
    let id = req.params.idModalidade
    modalidade.pessoasByModalidades(id)
        .then(resp =>{
            res.status(200).json(resp)
        }).catch(erro =>{
        res.status(503).write(erro)
    })
})
module.exports = router;