# NodeJS Serverless Challenge

Challenge NodeJS Serverless utilizando la API de Star Wars API

Stack: AWS Lambda + NodeJS + Typescript + DynamoDB

### Instalación

Instalar dependencias necesarias

```sh
npm ci
```


Intalar DynamoDB (local)

```sh
sls dynamodb install
```

Ejecutar migraciones

```sh
sls dynamodb executeAll
```


Correr aplicación 


```sh
npm start
```


### Tests


```sh
npm run test
```

### API 

- people

| Endpoint     | Descripción                      |
|:--------------|:----------------------------------|
| `dev/people`      | Guardar un people. |
| `dev/people/{id}` | Obtener un people |

### Despliegue

Tener en cuenta instalar `serverless` de manera global o usar `npx`.
También deber tener un usuario con los permisos correspondientes. [IAM](https://docs.aws.amazon.com/es_es/IAM/latest/UserGuide/introduction.html)

```sh
sls deploy
```

### API Docs

Revisar swagger para documentación-

