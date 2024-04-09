const express = require('express');
const router = express.Router();
let pessoa = require("../controllers/pessoas")

router.get("/",function(req,res){
    pessoa.list().then(resp =>{
        res.status(200).render("pessoasListPage",{"PessoasArray":resp})
    }).catch(erro =>{
        res.status(503).write("erro")})
})

router.get('/registo', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    res.status(200).render("pessoasForm",{})
});


router.post('/registo', function(req, res, next) {
    let result = req.body

    pessoa.insert(result).then( resp=>{
        res.redirect("/pessoas")
    }).catch( erro=>{
        res.status(502).write("erro")
    })
});

router.get("/:idC",function (req, res, next){
    let id = req.params.idC
    pessoa.findById(id)
        .then(resp =>{
            res.status(200).render("pessoasPage",{"PessoaOBJ":resp})
        }).catch(erro =>{
        res.status(503).write("erro")
    })
})

router.post('/edit/:idC', function(req, res, next) {
    let pessoa = req.body

    pessoa.update(pessoa._id,pessoa)
        .then(resp => {
            res.redirect("/pessoas")
        }).catch(erro =>{
        res.status(505).write("erro")
    })
});




router.get('/delete/:idC', function(req, res, next) {
    let id = req.params.idC
    pessoa.remove(id)
        .then(resp => {
            res.redirect("/pessoas")
        }).catch(erro =>{
        res.status(506).write("erro")
    })
});


module.exports = router;