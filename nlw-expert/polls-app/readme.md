# Polls API

Este projeto consiste em API que gerencia enquentes. Na qual o usuário pode cadastrar enquetes, dando título e a opções de votação, votar em uma opção apenas uma vez, ter acesso a votação atravéz de um GET que retorna a enquete junto com o número de votos de opção. Além disso o usuário entrando na rota /results tem acesso em tempo real o número de votos de cada opção. Projeto feito em TypeScript, utilizando o ORM Prisma em conjunto com o Redis para fazer conexões via WebScocket.

### Tecnologias utilizadas

  - TypeScript;
  - App Back-End;
  - ORM Prisma;
  - Redis;
  - Fastfy;