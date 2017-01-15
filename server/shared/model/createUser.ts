export interface User {
  readonly id: number,
  name: string,
  email: string,
}

export function createUser({id, name, email}: any): User {
  return {
    id, name, email
  }
}

export function createUsers(data:any[]): User []{
  return data.map(createUser);
}
