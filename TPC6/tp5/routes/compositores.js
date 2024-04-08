var express = require('express');
var router = express.Router();
let compositor = require("../controllers/compositores")

/* GET users listing. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  compositor.list()
      .then(resp =>{
          res.status(200).render("compositoresListPage",{"Compositores":resp,"Date":d})
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

   compositor.insert(result) .then( resp=>{
        res.redirect("/compositores")
    }).catch( erro=>{
        res.status(502).render("error",{"error":erro})
    })
});

router.get("/:idComp",function (req, res, next){
    var d = new Date().toISOString().substring(0, 16)
    var id = req.params.idComp
    compositor.findById(id)
        .then(resp =>{
            res.status(200).render("compositoresPage",{"Compositor":resp,"Data":d})
        }).catch(erro =>{
        res.status(503).render("error",{"error":erro})
    })
})

router.get('/edit/:idComp', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    var id = req.params.idComp
    compositor.findById(id)
        .then(resp => {
           compositores = resp
            res.status(200).render("compositoresFormEditPage",{"Compositor":compositores,"Date":d})
        }).catch(erro =>{
        res.status(504).render("error",{"error":erro})
    })
});


router.post('/edit/:idComp', function(req, res, next) {
    var compositors = req.body
    console.log(compositors)
    compositor.update(compositors._id,compositors)
        .then(resp => {
            res.redirect("/compositores")
        }).catch(erro =>{
        res.status(505).render("error",{"error":erro})
    })
});




router.get('/delete/:idComp', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    var id = req.params.idComp
    compositor.remove(id)
        .then(resp => {
            res.redirect("/compositores")
        }).catch(erro =>{
        res.status(506).render("error",{"error":erro})
    })
});


module.exports = router;
