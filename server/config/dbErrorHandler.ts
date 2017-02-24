import {Response} from 'express';
import * as HTTPStatus from 'http-status';
const hri = require('human-readable-ids').hri;

export function dbErrorHandler(res:Response, err:any) {

  const id = hri.random();
  console.error("Database error ocurred: ", id, err);

  res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
    code: 'ERR-002',
    message: `Creation of user failed, error code ${id}`
  });
}
