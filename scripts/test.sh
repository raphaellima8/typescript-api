export NODE_ENV= #Parâmetros
export DB_NAME= #Parâmetros
export DIALECT= #Parâmetros
export DB_USER= #Parâmetros
export DB_PASS= #Parâmetros
export HOST= #Parâmetros
export SERVER_PORT= #Parâmetros
export PG_PORT= #Parâmetros
export DB_URL= #Parâmetros
mocha --compilers ts:ts-node/register server/**/test.ts
