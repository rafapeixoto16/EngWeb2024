var http = require("http");
var url = require('url')
var axios= require('axios')
var htmlSytl = require('./htmlCss')

function calcAge(dateString) {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / (31557600000));
}

http.createServer((req,res)=>
{
    console.log(req.method + req.url)
    res.writeHead(200,{'Content-Type' : 'text/html; charset=utf-8'});

    var q = url.parse(req.url,true)

    res.write(htmlSytl.Estilo)

    if(q.pathname === "/") {
        res.write("<h1>Escola de musica</h1>")

        res.write("<ul>")

        res.write("<li><a href='/alunos'>" + "<b>Alunos</b>" +"</a></li>")
        res.write("<br>")
        res.write("<li><a href='/cursos'>" + "<b>Cursos</b>" +"</a></li>")
        res.write("<br>")
        res.write("<li><a href='/instrumentos'>" + "<b>Instrumentos</b>" +"</a></li>")

        res.write("</ul>")

        res.end()

    }
    else if (q.pathname === "/alunos"){
        axios.get("http://localhost:3000/alunos?_sort=id").then((rep)=>{
            var data = rep.data

            res.write("<h1>Escola de musica</h1>")


            res.write("<ul>")

            for (i in data){
                res.write('<div id="official-info">');
                res.write("<a href='/alunos/" + data[i].id + "'>" + "<b>" + data[i].id + "</b>" + "</a>")
                res.write("</div>")
                res.write("<br>")
            }

            res.write("</ul>")
            res.write("<h3><a href='/'>Voltar</a></h3>")

            res.end()
        }).catch((erro)=>{
            console.log("Erro "+ erro)
            res.write(`<p> ${erro} </p>`)
        })
    }
    else if(req.url.match(/\/alunos\/A(E-)?\d+/)){
        let id = req.url.substring(8)

        axios.get("http://localhost:3000/alunos/"+id).then((resp) =>
        {
            var data = resp.data
            axios.get("http://localhost:3000/cursos/"+data.curso).then((resp2) =>{
                var data2 = resp2.data
                res.write("<h1>Escola de musica</h1>")
                res.write("<p><b>Aluno id:</b> "+ data.id.toString().toLowerCase() +"</p>")
                res.write("<p><b>Nome do aluno:</b> "+ data.nome +"</p>")
                res.write("<p><b>Idade:</b> "+calcAge(data.dataNasc)+"</p>")
                res.write("<p><b>Curso:</b> "+data2.designacao +"</p>")
                res.write("<p><b>Codigo do curso:</b> "+data.curso+"</p>")
                res.write("<p><b>Instrumento:</b> "+data2.instrumento["#text"])
                res.write("<h3><a href='/alunos'>Voltar</a></h3>")

                res.end()
            }).catch((erro) => {
                res.write("<h1>Escola de musica</h1>")
                res.write("<p><b>Aluno id:</b> "+ data.id.toString().toLowerCase() +"</p>")
                res.write("<p><b>Nome do aluno:</b> "+ data.nome +"</p>")
                res.write("<p><b>Idade:</b> "+calcAge(data.dataNasc)+"</p>")
                res.write("<p><b>Codigo do curso:</b> "+data.curso+"</p>")
                res.write("<br>")
                res.write("<h3><a href='/alunos'>Voltar</a></h3>")
                res.end()
            })

        }).catch((erro)=>{
            console.log("Erro "+ erro)
            res.write(`<p> ${erro} </p>`)
        })

    }
    else if (q.pathname === "/cursos"){
        axios.get("http://localhost:3000/cursos?_sort=id").then((rep)=>{
            var data = rep.data

            res.write("<h1>Escola de musica</h1>")

            res.write("<ul>")

            for (i in data){
                res.write("<li><a href='/cursos/"+ data[i].id + "'>" +"<b>"+data[i].designacao+"</b>" +"</a></li>")
                res.write("<br>")
            }
            res.write("</ul>")

            res.write("<h3><a href='/'>Voltar</a></h3>")

            res.end()
        }).catch((erro)=>{
            console.log("Erro "+ erro)
            res.write(`<p> ${erro} </p>`)
        })
    }

    else if(req.url.match(/\/cursos\/C[B|S]\d+/)) {
        let id = req.url.substring(8)
        axios.get("http://localhost:3000/cursos/"+id).then((resp2) =>{
            var data2 = resp2.data
            res.write("<h1>Escola de musica</h1>")
            res.write("<p><b>Curso:</b> "+data2.designacao +"</p>")
            res.write("<p><b>Duração:</b> "+data2.duracao+" anos </p>")
            res.write("<p><b>Id:</b> "+id+"</p>")
            res.write("<p><b>Instrumento:</b> "+data2.instrumento["#text"])
            res.write("<br>")
            res.write("<h3><a href='/cursos'>Voltar</a></h3>")
            res.end()
        }).catch((erro) => {
            res.end()
        })
    }
    else if (q.pathname === "/instrumentos"){
        axios.get("http://localhost:3000/instrumentos?_sort=id").then((rep)=>{
            var data = rep.data

            res.write("<h1>Escola de musica</h1>")

            res.write("<ul>")

            for (i in data){
                res.write("<li><a href='/instrumentos/"+ data[i].id + "'>" + "<b>"+data[i]["#text"]+"</b> " +"</a></li>")
                res.write("<br>")
            }
            res.write("</ul>")
            res.write("<br>")
            res.write("<h3><a href='/'>Voltar</a></h3>")

            res.end()
        }).catch((erro)=>{
            console.log("Erro "+ erro)
            res.write(`<p> ${erro} </p>`)
        })
    }else if (req.url.match(/\/instrumentos\/\w+/)){
        let id = req.url.substring(14)
        axios.get("http://localhost:3000/instrumentos/"+id).then((resp2) =>{
            var data2 = resp2.data
            res.write("<h1>Escola de musica</h1>")
            res.write("<p><b>Codigo:</b> "+id+"</p>")
            res.write("<p><b>Instrumento:</b> "+ data2["#text"])
            res.write("<h3><a href='/cursos'>Voltar</a></h3>")
            res.end()
        }).catch((erro) => {
            res.write(erro)
            res.end()
        })

    } else{
        res.write("operaçao invalida")
        res.end();
    }
}).listen(2002)