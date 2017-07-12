import { app, request, expect } from '../../config/tests/config/helpers';
import * as jwt from 'jwt-simple';
import * as _ from 'lodash';
import * as HTTPStatus from 'http-status';
var model = require('../../models');


  describe('## User Tests', () => {
    'use strict';
    model.sequelize.sync().then(() => {});
    const config = require('../../config/env/config')();

    let id;
    let token;

    const userDefault = {
      id: 1,
      name: 'Test User',
      email: 'test@mail.com',
      password: 'testPassword'
    };

    beforeEach((done) => {
      model
        .User
        .destroy({
          where: {}
      })
      .then(() => model.User.create({
        id: 50,
        name: 'Raphael',
        email: 'raphael@email.com',
        password: '123456'
      }))
      .then(user => {
        model
          .User
          .create(userDefault)
          .then(() => {
            token = jwt.encode({id: user.id}, config.secret);
            done();
        });
      });
    });

    describe('GET /api/users/all', () => {
      it('Should return a array of Users', done => {
        request(app)
          .get('/api/users/all')
          .set('Content-Type', 'application/json')
          .set('Authorization', `JWT ${token}`)
          .end((error, res) => {
            expect(res.status).to.equal(HTTPStatus.OK);
            expect(res.body.payload).to.be.an('array');
            expect(res.body.payload[0].name).to.be.equal('Raphael')
            expect(res.body.payload[0].email).to.be.equal('raphael@email.com')
            done(error);
          });
      });
    });

    describe('POST /token', () => {
      it('Should receive a JWT', done => {
        const credentials = {
          email: 'raphael@email.com',
          password: '123456'
        };
        request(app)
          .post('/token')
          .send(credentials)
          .end((error, res) => {
            expect(res.status).to.equal(HTTPStatus.OK);
            expect(res.body.token).to.equal(`${token}`);
            done(error);
          });
      });
      it('Should not receive a JWT', done => {
        const credentials = {
          email: 'email@email.com',
          password: '123321'
        };
        request(app)
          .post('/token')
          .send(credentials)
          .end((error, res) => {
            expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
            expect(res.body).to.empty;
            done(error);
          });
      });
    });

    describe('POST /api/users/create', () => {
      it('Should create a new user', done => {
        const user = {
            id: 2,
            name: 'User Created',
            email: 'newUser@mail.com',
            password: 'newUserPwd',
        };
        request(app)
          .post('/api/users/create')
          .set('Authorization', `JWT ${token}`)
          .send(user)
          .end((error, res) => {
            expect(res.body.payload.id).to.eql(user.id);
            expect(res.body.payload.name).to.eql(user.name);
            expect(res.body.payload.email).to.eql(user.email);
            done(error);
          });
      });
    });

    describe('GET /api/users/:id', () => {
      it('Should return an User by its ID', done => {
        request(app)
          .get(`/api/users/${userDefault.id}`)
          .set('Authorization', `JWT ${token}`)
          .end((error, res) => {
            expect(res.status).to.equal(HTTPStatus.OK);
            expect(res.body.payload.id).to.equal(userDefault.id);
            expect(res.body.payload).to.have.all.keys([
              'id',
              'name',
              'email',
              'password'
            ]);
            id = res.body.payload.id;
            done(error);
          });
      });
    });

    describe('PUT /api/users/:id/update', () => {
      it('Should update an User', done => {
        const updatedUser = {
          name: 'UpdatedName',
          email: 'update@updated.com'
        };
        request(app)
          .put(`/api/users/${userDefault.id}/update`)
          .set('Authorization', `JWT ${token}`)
          .send(updatedUser)
          .end((error, res) => {
            expect(res.status).to.equal(HTTPStatus.OK);
            expect(res.body.payload[0]).to.eql(1);
            expect(res.body.payload[1][0].id).to.eql(userDefault.id);
            expect(res.body.payload[1][0].name).to.eql(updatedUser.name);
            expect(res.body.payload[1][0].email).to.eql(updatedUser.email);
            done(error);
          });
      });
    });

    describe('DELETE /api/users/:id/destroy', () => {
      it('Should delete an User', done => {
        request(app)
          .del(`/api/users/${userDefault.id}/destroy`)
          .set('Authorization', `JWT ${token}`)
          .end((error, res) => {
            expect(res.status).to.equal(HTTPStatus.OK);
            expect(res.body.payload).to.eql(1);
            done(error);
          });
      });
    });
  });
