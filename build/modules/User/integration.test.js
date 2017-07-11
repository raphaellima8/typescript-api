"use strict";
var helpers_1 = require("../../config/tests/config/helpers");
var jwt = require("jwt-simple");
var HTTPStatus = require("http-status");
describe('## User Tests', function () {
    'use strict';
    var config = require('../../config/env/config')();
    var model = require('../../models');
    var id;
    var token;
    var userDefault = {
        id: 1,
        name: 'Test User',
        email: 'test@mail.com',
        password: 'testPassword'
    };
    beforeEach(function (done) {
        model
            .User
            .destroy({
            where: {}
        })
            .then(function () { return model.User.create({
            id: 50,
            name: 'Raphael',
            email: 'raphael@email.com',
            password: '123456'
        }); })
            .then(function (user) {
            model
                .User
                .create(userDefault)
                .then(function () {
                token = jwt.encode({ id: user.id }, config.secret);
                done();
            });
        });
    });
    describe('GET /api/users/all', function () {
        it('Should return a array of Users', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/api/users/all')
                .set('Content-Type', 'application/json')
                .set('Authorization', "JWT " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.be.an('array');
                helpers_1.expect(res.body.payload[0].name).to.be.equal('Raphael');
                helpers_1.expect(res.body.payload[0].email).to.be.equal('raphael@email.com');
                done(error);
            });
        });
    });
    describe('POST /token', function () {
        it('Should receive a JWT', function (done) {
            var credentials = {
                email: 'raphael@email.com',
                password: '123456'
            };
            helpers_1.request(helpers_1.app)
                .post('/token')
                .send(credentials)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.token).to.equal("" + token);
                done(error);
            });
        });
        it('Should not receive a JWT', function (done) {
            var credentials = {
                email: 'email@email.com',
                password: '123321'
            };
            helpers_1.request(helpers_1.app)
                .post('/token')
                .send(credentials)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
                helpers_1.expect(res.body).to.empty;
                done(error);
            });
        });
    });
    describe('POST /api/users/create', function () {
        it('Should create a new user', function (done) {
            var user = {
                id: 2,
                name: 'User Created',
                email: 'newUser@mail.com',
                password: 'newUserPwd',
            };
            helpers_1.request(helpers_1.app)
                .post('/api/users/create')
                .set('Authorization', "JWT " + token)
                .send(user)
                .end(function (error, res) {
                helpers_1.expect(res.body.payload.id).to.eql(user.id);
                helpers_1.expect(res.body.payload.name).to.eql(user.name);
                helpers_1.expect(res.body.payload.email).to.eql(user.email);
                done(error);
            });
        });
    });
    describe('GET /api/users/:id', function () {
        it('Should return an User by its ID', function (done) {
            helpers_1.request(helpers_1.app)
                .get("/api/users/" + userDefault.id)
                .set('Authorization', "JWT " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.equal(userDefault.id);
                helpers_1.expect(res.body.payload).to.have.all.keys([
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
    describe('PUT /api/users/:id/update', function () {
        it('Should update an User', function (done) {
            var updatedUser = {
                name: 'UpdatedName',
                email: 'update@updated.com'
            };
            helpers_1.request(helpers_1.app)
                .put("/api/users/" + userDefault.id + "/update")
                .set('Authorization', "JWT " + token)
                .send(updatedUser)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload[0]).to.eql(1);
                helpers_1.expect(res.body.payload[1][0].id).to.eql(userDefault.id);
                helpers_1.expect(res.body.payload[1][0].name).to.eql(updatedUser.name);
                helpers_1.expect(res.body.payload[1][0].email).to.eql(updatedUser.email);
                done(error);
            });
        });
    });
    describe('DELETE /api/users/:id/destroy', function () {
        it('Should delete an User', function (done) {
            helpers_1.request(helpers_1.app)
                .del("/api/users/" + userDefault.id + "/destroy")
                .set('Authorization', "JWT " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.eql(1);
                done(error);
            });
        });
    });
});
