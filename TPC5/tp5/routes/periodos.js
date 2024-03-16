var express = require('express');
const axios = require("axios");
var router = express.Router();

router.get('/',function (req, res,next){
    var d = new Date().toISOString().substring(0, 16)
    axios.get("http://localhost:3000/periodos?_sort=periodo")
        .then(resp =>{
            var periodos = resp.data
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
    axios.get("http://localhost:3000/periodos?periodo="+id)
        .then(resp =>{
            periodosAtual = resp.data
            console.log(periodosAtual[0]["periodo"])
            axios.get("http://localhost:3000/compositores?periodo="+id).then(resp2=>{
                let periodosCompositores = resp2.data
                console.log(periodosCompositores)
                res.status(200).render("periodoPage",{"nome":periodosAtual[0]["periodo"],"Compositores":periodosCompositores})
            }).catch(erro =>{
                let periodosCompositores = [];
                res.status(200).render("periodoPage",{"nome":periodosAtual,"Compositores":periodosCompositores})
            })
        }).catch(erro =>{
            res.status(508).render("error",{"error":erro})
    })
})


module.exports = router;