import {app, req, expect, Chai} from '../../../config/tests/functional/helpers';
import * as jwt from 'jwt-simple';
const config = require('../../../config/config');
import {UserModel} from '../../model/model';
import {UserDetail} from '../../shared/model/UserDetails';
import {createUserById} from '../../shared/model/UserById';
import * as _ from 'lodash';

let id = 1000;
let token;
const userDefault = {
    id: 1,
    name: 'Test User',
    email: 'test@mail.com',
    password: 'testPassword'
};

describe('POST /api/users/create', () => {
  it('Should create a new user', () => {
    const user = {
        id: 2,
        name: 'User Created',
        email: 'newUser@mail.com',
        password: 'newUserPwd',
    };
    return Chai
            .request(app)
            .post('/api/users/create')
            .send(user)
            .then(res => {
              expect(res.body.payload.id).to.eql(user.id);
              expect(res.body.payload.name).to.eql(user.name);
              expect(res.body.payload.email).to.eql(user.email);
            });
  });
});

describe('GET /api/users/all', () => {
  it('Should return a json of Users', () => {
    return Chai
            .request(app)
            .get('/api/users/all')
            .then(res => {
              // expect(res).to.be.json;
              expect(res.status).to.equal(200);
              expect(res.body.payload[0]).to.have.all.keys([
                'id',
                'name',
                'email',
                'password'
              ])
            });
  });
});

describe('GET /api/users/:id',() => {
  it('Should return an User by its ID', () => {
    return Chai
            .request(app)
            .get('/api/users/' + 2)
            .then(res => {
              expect(res).to.be.json;
              expect(res.status).to.equal(200);
              expect(res.body.payload.id).to.equal(2);
              expect(res.body.payload).to.have.all.keys([
                'id',
                'name',
                'email',
                'password'
              ]);
              id = res.body.payload.id;
            });
  });
});

describe('PUT /api/users/:id/update', () => {
  it('Should update an User', () => {
    const updatedUser = {
      name: 'UpdatedName',
      email: 'update@updated.com'
    };
    return Chai
            .request(app)
            .put('/api/users/' + 2 +'/update')
            .send(updatedUser)
            .then(res => {
              expect(res.status).to.equal(200);
              expect(res.body.payload).to.eql([1]);
            });
  });
});

describe('DELETE /api/users/:id/destroy', () => {
  it('Should delete an User', () => {
    return Chai
      .request(app)
      .del('/api/users/'+ 2 +'/destroy')
      .then(res => {
        expect(res.status).to.equal(200);
      });
  });
})
