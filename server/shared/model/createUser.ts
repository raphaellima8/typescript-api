export interface User {
  readonly id: number,
  name: string,
  email: string,
  password: string
}

export function createUser({id, name, email, password}: any): User {
  return {
    id, name, email, password
  }
}

export function createUsers(data:any[]): User []{
  return data.map(createUser);
}
