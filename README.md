# TypeScript API Starter - Node + TypeScript + Sequelize + PostgreSQL

## Dependencies
* node
* npm
* typescript
* gulp
* PostgreSQL
* Sequelize
* Docker

## Getting Started
Clone this repo:
```
git clone https://github.com/raphaellima8/typescript-api.git ts-api && cd ts-api
```

Install dependencies:
```
 npm i
```

Start server:
```
npm run watch
```

Tests:
```
npm run test
```

## If Docker
Run:
```
[sudo] docker build -t <image_name> .
```
```
[sudo] docker run -d -p 9000:3000 --name <label> <image_name>
```
Connect to the container:
```
[sudo] docker exec -it <id_container> /bin/bash
```
Run the commands below in the container terminal:
```
su postgres
/etc/init.d/postgresql start
psql -c "ALTER USER postgres WITH PASSWORD 'pgroot'"
psql -c "CREATE DATABASE api OWNER postgres"
npm run watch
```


License: MIT
