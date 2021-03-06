# TypeScript API Starter - Node + TypeScript + Sequelize + PostgreSQL

[![Build Status](https://travis-ci.org/raphaellima8/typescript-api.svg?branch=master)](https://travis-ci.org/raphaellima8/typescript-api)
[![Code Health](https://landscape.io/github/raphaellima8/typescript-api/master/landscape.svg?style=flat)](https://landscape.io/github/raphaellima8/typescript-api/master)


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

Set the values to environment's properties in the below files:
```
/server/config/env/development.env.js
/server/config/env/test.env.js
```

Start server:
```
npm run watch
```

Integration Tests:
```
npm run integration-test
```

Unit Tests:
```
npm run unit-test
```

Coverage:
```
npm run test:coverage
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
Run the commands below in the container's terminal:
```
su postgres
/etc/init.d/postgresql start
psql -c "ALTER USER postgres WITH PASSWORD 'your_password'"
psql -c "CREATE DATABASE api OWNER postgres"
npm run watch
```


License: MIT
