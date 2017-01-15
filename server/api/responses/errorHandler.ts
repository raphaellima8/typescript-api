import {Response} from 'express';

export function onError(res: Response, message:string, err:any) {
  console.log('Error: ', err);
  res.status(500).send();
}
