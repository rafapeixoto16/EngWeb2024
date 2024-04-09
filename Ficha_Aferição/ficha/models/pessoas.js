const mongoose = require("mongoose")

const atributosSchem = new mongoose.Schema({
    acorda_cedo: Boolean,
    comida_favorita: String,
    fumador: Boolean,
    gosta_animais_estimacao : Boolean,
    gosta_cinema: Boolean,
    gosta_comer:Boolean,
    gosta_dancar:Boolean,
    gosta_ler: Boolean,
    gosta_musica:Boolean,
    gosta_viajar: Boolean,
},{versionKey:false,_id:false,id:false})

const moradaChem = new mongoose.Schema({
    cidade : String,
    distrito : String,
},{versionKey:false,_id:false,id:false})

const partidoSchem = new mongoose.Schema({
    party_abbr: String,
    party_name: String,
},{versionKey:false,_id:false,id:false})

const pessoaSchem = new mongoose.Schema({
    _id: {
        type: String,
        required:true
    },
    animais: [{type: String}],
    atributos: atributosSchem,
    descriçâo : String,
    desportos : [{type: String}],
    destinos_favoritos : [{type: String}],
    figura_publica_pt : [{type: String}],
    idade : Number,
    marca_carro:String,
    morada: moradaChem,
    nome: String,
    partido_politico: partidoSchem,
    profissao : String,
    religiao: String,
    sexo: String
},{versionKey:false})

module.exports = mongoose.model("pessoas",pessoaSchem)