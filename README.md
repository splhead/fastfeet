<h1 align="center">
    <img src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png" >
</h1>

<h2 align="center">
    FastFeet, The future of parcel deliveries! 📫 🚚💨
</h2>

<h3 align="center">
    Your order treated with great affection. 💌
</h3>

# Cloning this project

```
$ git clone https://github.com/splhead/fastfeet.git
```

# ❗️ Requisites

To run this all project, you need have be the packages installed:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/en/) (Optional).

# 💾 Backend

- API RESTFUL created with Node.js using [express](https://expressjs.com/).

- For database use PostgresSQL with [sequelize](https://sequelize.org/v5/).

## ⚡️ Start

- For use this api you need have be installed PostgresSQL, I'm use [Docker](https://www.docker.com/), but this is optional.
- If you don't want installing DOCKER, use convencional [Postgres](https://www.postgresql.org/download/) installation.

### Runing Postgres using DOCKER: 🐋

```
$ docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

#### If you already have a container with Postgres, run:

```
$ docker start "CONTAINER DOCKER ID"
```

- For background jobs I'm using Redis with DOCKER.
- If you don't want installing DOCKER, use convencional installation of [Redis](https://redis.io/).

### Runing Redis using DOCKER: 🐋

```
$ docker run --name some-redis -d redis
```

#### If you already have a container with Rerdis, run:

```
$ docker start "CONTAINER DOCKER ID"
```

You need copy file .env.example to .env in backend folder and change values

### Now in your terminal, run:

```
$ cd backend

$ yarn

$ yarn sequelize db:create

$ yarn sequelize db:migrate

$ yarn sequelize db:seed:all

$ yarn dev
```

### To start queue to Mail send

```
$ cd backend

$ yarn queue
```

#### To debugin, run:

```
yarn dev:debug
```

# Frontend

The backend needed.

If you run in a diferent server remember change in frontend/src/services/api.js

### Now in your terminal, run:

```
$ cd frontend

$ yarn

$ yarn start
```

# Mobile

ps: Only android version was tested in mobile. The backend needed.

### Now in your terminal, run:

```
$ cd mobile

$ yarn

$ yarn android

```

Feito com 💜 by [Silas P Ladislau](https://www.linkedin.com/in/silas-pinho-ladislau-2993b329)
