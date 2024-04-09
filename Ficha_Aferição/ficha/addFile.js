const axios = require("axios")
const {json} = require("express");
const fs = require("fs")

let file1 = fs.readFileSync("dataset-extra1.json")
let file1JSON = JSON.parse(file1)
let file2 = fs.readFileSync("dataset-extra2.json")
let file2JSON = JSON.parse(file2)
let file3 = fs.readFileSync("dataset-extra3.json")
let file3JSON = JSON.parse(file3)


for (let i = 0; i< file1JSON.length;i++)
    axios.post("http://localhost:7777/pessoas/registo",file1JSON[i])

console.log("primeiro acabado")

for (let i = 0; i< file2JSON.length;i++)
    axios.post("http://localhost:7777/pessoas/registo",file2JSON[i])

console.log("segundo acabado")

for (let i = 0; i< file3JSON.length;i++)
    axios.post("http://localhost:7777/pessoas/registo",file3JSON[i])

console.log("terceiro acabado")