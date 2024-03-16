# TPC5 : Dataset Compositores (Express)

## Enunciado

Criar uma aplicação a usar o *express* para a gestão de uma base de dados de compositores musicais:
- Montar a API de dados com o json-server a partir do dataset de compositores em anexo;
- Criar uma aplicação Web com as seguintes caraterísticas:
 1. CRUD sobre compositores;
 2. CRUD sobre periodos musicais.

## Autor

- A96807
- Rafael Conde Peixoto

## Solução obtida 

Utilizei o pequeno programa *python* que tinha feito na semana passada por ser útil para as operações de CRUD nos períodos (cria um objeto períodos).
Para criar as paginas *pug* simplemente copiei o codigo da semana passada e foi alterando.
Nos compositores implementei todas as operações de CRUD (get, post, delete e put). Já nos períodos não criei a operação de put devido ao período não ter nenhum campo para alterar sem ser o próprio nome (identificador).
