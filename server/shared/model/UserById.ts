import {UserDetail} from './UserDetails';

export function createUserById({id, name, email, password}:any):UserDetail {
  return {
    id, name, email, password
  };
}
