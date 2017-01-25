import {app, req, expect, Chai} from '../../../config/tests/functional/helpers';

let id;

describe('GET /api/users/all', () => {
  it('Should return a json of Users', () => {
    return Chai
            .request(app)
            .get('/api/users/all')
            .then(res => {
              expect(res).to.be.json;
              expect(res.status).to.equal(200);
              expect(res.body.payload[6]).to.have.all.keys([
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
            .get('/api/users/' + 1)
            .then(res => {
              expect(res).to.be.json;
              expect(res.status).to.equal(200);
              expect(res.body.payload.id).to.equal(1);
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

describe('POST /api/users/create', () => {
  it('Should create a new user', () => {
    const userTest = {
        id: 1000,
        name: 'Test User',
        email: 'test@mail.com',
        password: 'testPassword'
    };
    return Chai
            .request(app)
            .post('/api/users/create')
            .send(userTest)
            .then(res => {
              expect(res.body.payload.id).to.eql(userTest.id);
              expect(res.body.payload.name).to.eql(userTest.name);
              expect(res.body.payload.email).to.eql(userTest.email);
            });
  });
});

describe('PUT /api/users/:id/update', () => {
  it('Should update an User', () => {
    const updatedUser = {
      id: this.id,
      name: 'UpdatedName',
      email: 'update@updated.com'
    };
    return Chai
            .request(app)
            .put('/api/users/' + id + '/update')
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
      .del('/api/users/'+ id +'/destroy')
      .then(res => {
        expect(res.status).to.equal(200);
      });
  });
})
