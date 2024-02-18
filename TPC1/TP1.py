import json
import os
import shutil
import xmltojson
import re

def ruasHtml(fig):
    retorno= '<div id="official-info">'
    retorno += f'<h1>Casa {fig["número"]} </h1>'
    retorno += f"<p>Esta casa é identificada pelo o nº {fig['número']}."

    if "enfiteuta" in fig:
        retorno += f"O seu <b>enfiteuta</b> era o(a) {fig['enfiteuta']}.</p>"

    if "foro" in fig:
        if fig['foro'] is not None:
            retorno += f"<p> O seu <b>foro<b> era: {fig['foro']} </p>"
        else:
            retorno += f"<p> O seu <b>foro<b> era: Desconhecido </p>"
    if "desc" in fig:

        descricao = fig["desc"]

        if isinstance(descricao, list):
            for desc in descricao:
                if "para" in desc:
                    if isinstance(desc["para"], list):
                        for para in desc["para"]:
                            descricaoFormatada = str(para)
                            retorno += f"<p>{descricaoFormatada} </p>"
                    else:
                        descricaoFormatada = str(desc['para'])
                        retorno += f"<p>{descricaoFormatada} </p>"

        else:
            if descricao is not None and "para" in descricao:
                if isinstance(descricao["para"], list):
                    for para in descricao["para"]:
                        descricaoFormatada = str(para)
                        retorno += f"<p>{descricaoFormatada} </p>"

                else:
                    descricaoFormatada = str(descricao['para'])
                    retorno += f"<p>{descricaoFormatada} </p>"

    retorno += "</div>"
    retorno += "<p></p>"
    return retorno


html = '''
<!DOCTYPE html>
<html>
<head>
    <title> TP1</title>
    <meta charset="utf-8">
    <body style="background-color:#2A1E5C">
    <style>  
        body {
            margin: 0;
        }
        
        h1 { 
            text-align: center;
	        color: rgb(218,165,32);
        }
        h2 { 
            text-align: center;
	        color: rgb(218,165,32);
        }
        h3 { 
            text-align: center;
	        color: rgb(218,165,32);
        }
        h6 { 
            text-align: center;
	        color: rgb(218,165,32);
        }
        h7{
            width : 200%%;
            padding: 0 50px;
            color: rgb(218,165,32);
            font-weight: bold;
        }
        #official-info {
            background: #666699;
            width: 70%;
            height: auto;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 0 200px;
        }
        #official-info2 {
            background: #666699;
            width: 70%;
            height: auto;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 0 200px;
        }
        
        h8{
            color: rgb(218,165,32);
            width : 200%;
        }
        p{
            color: #B5B5B5;
        }
        img{
            img-align: center;
            text-align: center;
        }
        a{
            color: #B5B5B5;
        }
        .container {
            width : 100%%;
            padding: 0 50px;
        }
        .my-paragraph {
            color: #B5B5B5;
        }
    </style>
</head>
<body>
'''

template = html

if os.path.exists("jsonFile"):
    shutil.rmtree("jsonFile")

os.mkdir("jsonFile")

if os.path.exists("html"):
    shutil.rmtree("html")

os.mkdir("html")

ficheiros = []
imagensAtuais = os.listdir("./atual")

for _, _, arquivo in os.walk("./texto"):  # ditoria
    ficheiros = arquivo

for ficheiro in ficheiros:
    file = open(f"texto/{ficheiro}", "r", encoding="UTF-8").read()

    nLugar = file.replace("\n", " ")
    nLugar = re.sub(r"<lugar.*?>", "", nLugar, 0)
    nLugar = re.sub(r"<entidade.[\S\s]*?>", "", nLugar)
    nLugar = re.sub(r'tipo=.[\S\s]*?>', ">", nLugar)
    nLugar = re.sub(r"<entidade>", "", nLugar)
    nLugar = re.sub(r"entidade tipo=.*?", "", nLugar)
    nLugar = nLugar.replace("</lugar>", "")
    nLugar = nLugar.replace("<data>", "")
    nLugar = nLugar.replace("</data>", "")
    nLugar = nLugar.replace("</entidade>", "")

    filename = ficheiro.replace(".xml", ".json")
    jsonFileData = xmltojson.parse(nLugar)
    fileCidade = open(f"jsonFile/{filename}", "w", encoding="UTF-8")
    fileCidade.write(jsonFileData)
    fileCidade.close()

for _, _, arquivo in os.walk("./tmpXml"):
    ficheiros = arquivo

listaRuas = []

ficheiros = os.listdir("./jsonFile")

for _, _, arquivo in os.walk("./jsonFile"):  # ditoria
    ficheiros = arquivo

for ficheiro in ficheiros:
    jsonFile = open(f"jsonFile/{ficheiro}", "r", encoding="UTF-8").read()
    context = json.loads(jsonFile)

    ruaName = context["rua"]["meta"]["nome"]
    listaRuas.append(ruaName)

    numRua = context['rua']['meta']['número']

    templateCidade = template
    templateCidade += f"<h1>{ruaName} - nº{numRua}</h1>"

    info = context["rua"]["corpo"]
    ruasDesq = info['para']

    templateCidade += '<div class = "container">'

    if isinstance(ruasDesq, list):
        for ruaInfo in ruasDesq:
            templateCidade += '<div class = "my-paragraph">'
            ruaInfoParsing = str(ruaInfo)
            templateCidade += f"<p>{ruaInfoParsing}</p>"
            templateCidade += "</div>"

    else:
        templateCidade += f"<p>{info['para']}</p>"

    templateCidade += "</div>"

    if isinstance(info['figura'], list):
        for fig in info['figura']:
            templateCidade += "<figure>"
            templateCidade += f"<center><img src={fig['imagem']['@path']} alt = 'imagem rua' height='456' width='1024' title ={fig['legenda']}/><p></p></center>"
            
    else:
        fig = info['figura']
        templateCidade += "<figure>"
        templateCidade += f"<center><img src={fig['imagem']['@path']} alt = 'imagem rua' height='456' width='1024' title = {fig['legenda']}/><p></p></center>"

    templateCidade += f"<h2><b>Casas descritas nas imagens acima</b></h2>"

    if "lista-casas" in info:
        if isinstance(info["lista-casas"], list):
            listLen: int = len(info["lista-casas"])
            for i in range(0, listLen):
                casas = info['lista-casas'][i]["casa"]
                templateCidade += '<div class = "container">'
                if isinstance(casas, list):
                    for casa in casas:
                        if isinstance(casa, list):
                            for casa2 in casa:
                                templateCidade += ruasHtml(casa2)
                        else:
                            templateCidade += ruasHtml(casa)
                else:
                    templateCidade += ruasHtml(casas)
                templateCidade += '</div>'
        else:
            casas = info['lista-casas']["casa"]
            templateCidade += '<div class = "container">'

            if isinstance(casas, list):
                for casa in casas:
                    if isinstance(casa, list):
                        for casa2 in casa:
                            templateCidade += ruasHtml(casa2)
                    else:
                        templateCidade += ruasHtml(casa)

            else:
                templateCidade += ruasHtml(casas)

            templateCidade += '</div>'

    templateCidade += f"<h1><b>Atualmente</b></h1>"

    for fig in imagensAtuais:
        ata = str(fig)
        arrayData = ata.split("-")
        if int(arrayData[0]) == int(numRua):
            vista = arrayData[2].replace(".JPG", "")
            templateCidade += f'<center><img src="../atual/{fig}" alt ="{vista} de como a rua se encontra atualmente" height="456" width="1024"  title="{vista} de como a rua se encontra atualmente"/><p></p></center>'

    templateCidade += f"<h1> <a href='../ruas.html'><strong>Voltar</strong> </a></h1>"

    templateCidade += "</body>"
    templateCidade += "</html>"

    fileCidade = open(f"html/{ruaName}.html", "w", encoding="UTF-8")
    fileCidade.write(templateCidade)
    fileCidade.close()

html += "<h2>Ruas de Braga</h2>"
html += "<h7>"
html += "<ol>"
html += '<div id="official-info2">'
for elem in sorted(listaRuas):
    html += f"<p class='numbered'> <li><a href ='./html/{elem}.html'> {elem} </a></li></p>"

html += "</div>"
html += "</ol>"

html += "</h7>"

html += "</ul>"

html += "</body>"

html += "</html>"

file = open("./ruas.html", "w", encoding="UTF-8")
file.write(html)
file.close()

template = html
