# TPC4 : Dataset Compositores

## Enunciado

Criar uma aplicação para a gestão de uma base de dados de compositores musicais:
- Montar a API de dados com o json-server a partir do dataset de compositores em anexo;
- Criar uma aplicação Web com as seguintes caraterísticas:
 1. CRUD sobre compositores;
 2. CRUD sobre periodos musicais.
- Investigar e inserir pelo menos 5 compositores do período moderno ou serialista.
## Autor

- A96807
- Rafael Conde Peixoto

## Solução obtida 

Primeiramente criei o um novo objeto períodos no *compositores.json* usando um pequeno programa *python*. Isso vai ser útil para as operações de CRUD nos períodos.

Para os compositores implementei todas as operações de CRUD (get, post, delete e put). Já nos períodos não criei a operação de put devido ao período não ter nenhum campo para alterar sem ser o próprio nome (identificador). Usei também os *templates* fornecidos nas aulas teórico-práticas.
