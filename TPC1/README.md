# TPC1: Ruas de Braga

Neste trabalho é necessario tratar diversas infomações contidadas em ficheiros xml e criar um indice. Esse indice sera uma pagina html, onde vai existir uma maneira de encaminhar para outras paginas. Nessas outras paginas sera exibido as informações referentes a cada rua com as suas respetivas imagens e informações referentes as casas pertencentes a essa rua.  


## Autor

- a96807
- Rafael Conde Peixoto

### Solução obtida

Para a resolução começei por passar os ficheiros xml para .json . Escolhei fazer esta conversão para facilitar o meu trabalho. Para isso usei regex para retirar as tags "desnecessarias" tanto nos paragrafos como nas descrições. A partir dai o trabalho ficou facilitado bastando apenas fazer alguns ciclos **for**.

