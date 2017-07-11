"use strict";
var helpers_1 = require("../../config/tests/config/helpers");
var service_1 = require("./service");
describe('Testes unitários no Service User', function () {
    describe('Create Method', function () {
        it('Should create an User', function () {
            var requestUser = {
                id: 100,
                name: 'Raphael Lima',
                email: 'raphael@email.com',
                password: '123'
            };
            var userService = new service_1.User();
            return userService
                .create(requestUser)
                .then(function (res) {
                helpers_1.expect(res.dataValues).to.have.all.keys(['id', 'name', 'email', 'password', 'createdAt', 'updatedAt']);
            });
        });
    });
});
