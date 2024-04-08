var express = require('express');
const axios = require("axios");
var router = express.Router();
var periodo = require("../controllers/periodos")
let compositor = require("../controllers/compositores")

router.get('/',function (req, res,next){
    var d = new Date().toISOString().substring(0, 16)
    periodo.list()
        .then(resp =>{
            periodos = resp
            res.status(200).render("periodosListPage",{"Periodos":periodos,"Date":d})
        }).catch(erro =>{
        res.status(508).render("error",{"error":erro})
    })
});

router.get('/registo', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    res.status(200).render("periodoFormPage",{"Date":d})
});

router.post('/registo', function(req, res, next) {
    result = req.body
    axios.post("http://localhost:3000/periodos/",result).then( resp=>{
        res.redirect("/periodos")
    }).catch( erro=>{
        res.status(502).render("error",{"error":erro})
    })
});

router.get("/:idPeriodo",function (req, res, next){
    var d = new Date().toISOString().substring(0, 16)
    var id = req.params.idPeriodo
    periodo.findId(id)
        .then(resp =>{
            periodosAtual = resp
            compositor.findByPeriodo(periodosAtual._id).then(resp2=>{
                res.status(200).render("periodoPage",{"nome":periodosAtual,"Compositores":resp2})
            }).catch(erro =>{
                let periodosCompositores = [];
                res.status(200).render("periodoPage",{"nome":periodosAtual,"Compositores":periodosCompositores})
            })
        }).catch(erro =>{
            res.status(508).render("error",{"error":erro})
    })
})


module.exports = router;