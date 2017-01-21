import {User} from './createUser';

export interface UserDetail extends User {
  id:number,
  name: string,
  email: string
}
