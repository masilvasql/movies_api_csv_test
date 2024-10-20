### como executar o projeto

1- Clone o repositório

2- Abra o terminal e navegue até a pasta do projeto

3- Execute o comando `npm install` para instalar todas as dependências

4- Execute o comando `npm start` para rodar o projeto

5- Dentro do projeto, na pasta ```src/infrastructure/http``` existe um arquivo chamado movie.http que contém as requisições para a API. Para executar as requisições, basta clicar no botão "Send Request" que está presente em cada requisição. Para executar é necessária a extensão REST Client no VSCode.

5.1 - Caso deseje, pode executar as requisições diretamente no Postman ou Insomnia. A baixo estão os exemplos a serem utilizados.

```
GET http://localhost:3000/movies
content-type: application/json

### 

POST http://localhost:3000/movies
content-type: application/json

{
    "year": 2021,
    "title": "The Matrix",
    "producers": ["Joel Silver", "Lana Wachowski", "Lilly Wachowski"],
    "studios": ["Warner Bros. Pictures, Village Roadshow Pictures"],
    "winner":"yes"
}

###

GET http://localhost:3000/movies/2bfef3c7-378b-40b7-9e8a-bf31bee72a07
content-type: application/json

###

GET http://localhost:3000/movies/awards/interval
content-type: application/json

###

DELETE http://localhost:3000/movies/2bfef3c7-378b-40b7-9e8a-bf31bee72a07
content-type: application/json

###
PUT http://localhost:3000/movies/2bfef3c7-378b-40b7-9e8a-bf31bee72a07
content-type: application/json

{
    "year": 2021,
    "title": "The Matrix Atualizado",
    "producers": ["teste 1", "teste 2", "teste 3"],
    "studios": ["studio 1, studio 2"],
    "winner":"no"
}
```

6- Para rodar os testes, execute o comando `npm test`

### Executando no Docker

1- Build da imagem
```
docker build -t movies-api .
```

2- Rodar o container
```
docker run --rm -p 3000:3000 -d movies-api
```

3- Rodar os testes
```
docker exec -it <container_id> npm test
```