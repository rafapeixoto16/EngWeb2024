var http = require('http')
var fs = require('fs')
var url = require('url')
var axios = require('axios')

function pagina(){
    pagHTML = `
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Filmes</title>
        <link rel="stylesheet" href="/w3.css"/>
    </head>
    `

    return pagHTML;
}

http.createServer((req, res)=>{
    console.log(req.method + " " + req.url)
    if (req.url === "/") {
        fs.readFile("TPC3.html",(erro,dados)=>{
            res.writeHead(200,{"Content-Type": "text/html; charset=utf-8"})
            res.write(dados)
            res.end()
        })
    }
    else if(req.url === "/w3.css"){
        fs.readFile("w3.css",(error,dados)=> {
            res.writeHead(200,{"Content-Type": "text/css"})
            res.write(dados)
            res.end()
        })
    }else if(req.url === "/filmes"){
        axios.get("http://localhost:3000/filmes?_sort=title")
            .then((resp)=>{
                data = resp.data
                res.writeHead(200,{"Content-Type": "text/html; charset=utf-8}"})
                res.write(pagina())
                res.write('<ul class="w3-ul w3-border">')
                res.write('<div class= "w3-container w3-blue" ><li><h2>Filmes</h2></li></div>')

                for (i in data){
                    res.write("<li><a href='/filmes/"+ data[i]["_id"] + "'>" +data[i].title +"</a></li>")
                }
                res.write("</u>")
                res.write("<h1><a class='w3-button w3-blue w3-center' href='/'><strong>Voltar</strong> </a></h1>")
                res.end()
            })
            .catch((erro)=>{
                console.log("Erro "+ erro)
                res.write(`<p> ${erro} </p>`)
            })
    }
    else if(req.url.match(/\/filmes\/\w/)){
        let id = req.url.substring(8)
        axios.get("http://localhost:3000/filmes?_id="+id).then((resp) =>{
            var data = resp.data
            res.writeHead(200,{"Content-Type": "text/html;charset=utf-8}"})
            res.write(pagina())
            res.write(`<div class= "w3-container w3-blue" ><h1 class="w3-blue">${data[0]["title"]}</h1></div>`)
            res.write(`<p><b>   Ano de Estreia </b>${data[0].year}</p>`)

            res.write('<ul class="w3-ul w3-border">')
            res.write('<li><h2>Genéro</h2></li>')
            for (i in data[0]["genres"]) {
                res.write(`<li><a href="/genero/${data[0]["genres"][i]}"><p>${data[0]["genres"][i]}</p></a></li>`)
            }
            res.write("</ul><br>")

            res.write('<ul class="w3-ul w3-border">')
            res.write('<li><h2>Atores</h2></li>')
            for (i in data[0]["cast"]){
                res.write(`<li><a href="/atores/${data[0]["cast"][i]}"><p>${data[0]["cast"][i]}</p></a></li>`)
            }
            res.write("</ul><br>")
            res.write("<h1><a class='w3-button w3-blue w3-center' href='/filmes'><strong>Voltar</strong> </a></h1>")
            res.end()
            })
            .catch((erro) => {
                console.log("Erro " + erro)
                res.write(`<p> ${erro} </p>`)
            })

    }
    else if (req.url === "/atores"){
        axios.get("http://localhost:3000/atores?_sort=nome")
            .then((resp)=>{
                var data = resp.data
                res.writeHead(200,{"Content-Type": "text/html;charset=utf-8}"})
                res.write(pagina())

                res.write('<ul class="w3-ul w3-border">')
                res.write('<div class= "w3-container w3-blue" ><li><h2>Atores</h2></li></div>')

                for (i in data){
                    res.write("<li><a href='/atores/"+ data[i]["nome"] + "'>" + data[i].nome +"</a></li>")
                }
                res.write("</ul><br>")
                res.write("<h1><a class='w3-button w3-blue w3-center' href='/'><strong>Voltar</strong> </a></h1>")
                res.end()
            })
            .catch((erro)=>{
                console.log("Erro "+ erro)
                res.write(`<p> ${erro} </p>`)
            })
    }
    else if(req.url.match(/\/atores\/.+?/)){
        let id = req.url.substring(8)
        console.log(id)
        axios.get("http://localhost:3000/atores?nome="+id).then((resp) =>{
            var data = resp.data
            res.writeHead(200,{"Content-Type": "text/html;charset=utf-8}"})
            res.write(pagina())
            res.write(`<div class= "w3-container w3-blue" ><h1 class="w3-blue">${data[0]["nome"]}</h1></div>`)

            res.write('<ul class="w3-ul w3-border">')
            res.write('<div class= "w3-container w3-blue" ><li><h2>Filmes</h2></li></div>')

            console.log(data)
            for (i in data[0]["filmes"]){
                res.write("<li><a href='/filmes/"+ data[0]["filmes"][i]["idFilme"] + "'>" + data[0]["filmes"][i]["nomeFilme"] +"</a></li>")
            }
            res.write("</ul><br>")

            res.write("<h1><a class='w3-button w3-blue w3-center' href='/atores'><strong>Voltar</strong> </a></h1>")
            res.end()
        })
            .catch((erro) => {
                console.log("Erro " + erro)
                res.write(`<p> ${erro} </p>`)
            })
    }else if(req.url ==="/genero"){
        axios.get("http://localhost:3000/genero?_sort=genero")
            .then((resp)=>{
                data = resp.data
                res.writeHead(200,{"Content-Type": "text/html; charset=utf-8}"})
                res.write(pagina())
                res.write('<ul class="w3-ul w3-border">')
                res.write('<div class= "w3-container w3-blue" ><li><h2>Generos</h2></li></div>')

                for (i in data){
                    res.write("<li><a href='/generos/"+ data[i]["genero"] + "'>" +data[i]["genero"] +"</a></li>")
                }
                res.write("</u>")
                res.write("<h1><a class='w3-button w3-blue w3-center' href='/'><strong>Voltar</strong> </a></h1>")
                res.end()
            })
            .catch((erro)=>{
                console.log("Erro "+ erro)
                res.write(`<p> ${erro} </p>`)
            })
    }else if(req.url.match(/\/genero\/.+?/)){
        let id = req.url.substring(8)
        axios.get("http://localhost:3000/genero?genero="+id).then((resp) =>{
            var data = resp.data
            res.writeHead(200,{"Content-Type": "text/html;charset=utf-8}"})
            res.write(pagina())
            console.log(data[0])
            res.write(`<div class= "w3-container w3-blue" ><h1 class="w3-blue">${data[0]["genero"]}</h1></div>`)
            res.write('<ul class="w3-ul w3-border">')
            res.write('<div class= "w3-container w3-blue" ><li><h2>Filmes</h2></li></div>')

            console.log(data)
            for (i in data[0]["filmes"]){
                res.write("<li><a href='/filmes/"+ data[0]["filmes"][i]["idFilme"] + "'>" + data[0]["filmes"][i]["nomeFilme"] +"</a></li>")
            }
            res.write("</ul><br>")

            res.write("<h1><a class='w3-button w3-blue w3-center' href='/genero'><strong>Voltar</strong> </a></h1>")
            res.end()
        })
            .catch((erro) => {
                console.log("Erro " + erro)
                res.write(`<p> ${erro} </p>`)
            })
    }

    else {
        res.writeHead(200,{"Content-Type": "text/plain; charset=utf-8}"})
        res.write("Pagina nao encontrada")
        res.end()
    }

}).listen(7777)