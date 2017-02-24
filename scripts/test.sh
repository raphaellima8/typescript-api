#!/bin/bash
export NODE_ENV=test
export DB_NAME=api_test
export DIALECT=postgres
export DB_USER=postgres
export DB_PASS=pgroot
export HOST=localhost
export SERVER_PORT=3000
export PG_PORT=5432
export DB_URL=postgres://postgres:pgroot@localhost:5432/api_test
export SECRET=s3cr3t
mocha --compilers ts:ts-node/register server/**/test.ts
