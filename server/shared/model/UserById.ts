import {UserDetail} from './UserDetails';

export function createUserById({id, name, email}:any):UserDetail {
  return {
    id, name, email
  };
}
