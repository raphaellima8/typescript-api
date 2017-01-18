import * as http from 'http';
import * as debug from 'debug';
import Api from './api/api';
import {errorHandlerApi} from './api/errorHandlerApi';

debug('ts-api:server');

const port = normalizePort(process.env.PORT || 3000);

Api.set('port', port);
const server = http.createServer(Api);

server.listen(port);

server.on('error', onError);
server.on('listening', listen);

Api.use(errorHandlerApi);

function listen():void {
  let address = server.address();
  let bind = (typeof address === 'string') ? `Address ${address}` : `Port ${address.port}`;
  debug(`Server is runnig on port ${bind}`);
}

function onError(error: NodeJS.ErrnoException): void {
  console.log('An error ocurred: ', error);
}

function normalizePort(portNumber: number | string): string|number|boolean {
  let port: number = (typeof portNumber === 'string') ? parseInt(portNumber, 10) : portNumber;
  if(isNaN(port)) return portNumber;
  else if(port > 0) return port;
  else return false;
}
