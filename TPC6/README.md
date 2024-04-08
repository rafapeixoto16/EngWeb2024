# TPC5 : MongoDB Compositores

## Enunciado

Utilizar o tpc5 e atualizar para usar mongoDB

## Autor

- A96807
- Rafael Conde Peixoto

## Solução obtida 

Criei dois modelo o dos periodos e dos compositores. Os dos periodos apenas possui o *_id*, enquanto que os compositores possuem o *_id*, bio, dataNasc, dataObito, nome e periodo. Na zona dos controlos desenvolvi os metodos *list*, *findById*, *insert*, *update*,
*remove* e *findByPeriodo*.
No periodos foram defenidos *list*, *insert*, *remove*, *findID*.

Depois foi apenas trocar no *routes*, dos compositores e dos periodos.

