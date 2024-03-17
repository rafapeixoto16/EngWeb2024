var express = require('express');
var router = express.Router();
var axios = require("axios")

/* GET users listing. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/compositores?_sort=nome")
      .then(resp =>{
          var compositores = resp.data
          res.status(200).render("compositoresListPage",{"Compositores":compositores,"Date":d})
      }).catch(erro =>{
        res.status(503).render("error",{"error":erro})
  })
});

router.get('/registo', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    res.status(200).render("compositoresForm",{"Date":d})
});

router.post('/registo', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    result = req.body
    console.log(result)
    axios.post("http://localhost:3000/compositores/",result).then( resp=>{
        res.redirect("/compositores")
    }).catch( erro=>{
        res.status(502).render("error",{"error":erro})
    })
});

router.get("/:idComp",function (req, res, next){
    var d = new Date().toISOString().substring(0, 16)
    var id = req.params.idComp
    axios.get("http://localhost:3000/compositores/"+id)
        .then(resp =>{
            var compositor = resp.data
            res.status(200).render("compositoresPage",{"Compositor":compositor,"Data":d})
        }).catch(erro =>{
        res.status(503).render("error",{"error":erro})
    })
})

router.get('/edit/:idComp', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    var id = req.params.idComp
    axios.get("http://localhost:3000/compositores/"+id)
        .then(resp => {
            var compositores = resp.data
            res.status(200).render("compositoresFormEditPage",{"Compositor":compositores,"Date":d})
        }).catch(erro =>{
        res.status(504).render("error",{"error":erro})
    })
});


router.post('/edit/:idComp', function(req, res, next) {
    var compositor = req.body
    axios.put("http://localhost:3000/compositores/"+compositor.id,compositor)
        .then(resp => {
            res.redirect("/compositores")
        }).catch(erro =>{
        res.status(505).render("error",{"error":erro})
    })
});




router.get('/delete/:idComp', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    var id = req.params.idComp
    axios.delete("http://localhost:3000/compositores/"+id)
        .then(resp => {
            res.redirect("/compositores")
        }).catch(erro =>{
        res.status(506).render("error",{"error":erro})
    })
});


module.exports = router;
