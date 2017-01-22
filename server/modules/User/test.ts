import {app, req, expect, Chai} from '../../../config/tests/functional/helpers';

describe('GET /api/users/all', () => {
  it('Should return a json of Users', () => {
    return Chai
            .request(app)
            .get('/api/users/all')
            .then(res => {
              expect(res).to.be.json;
              expect(res.status).to.equal(200);
              expect(res.body.payload[0]).to.have.all.keys([
                'id',
                'name',
                'email'
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
                'email'
              ]);
            });
  });
});
