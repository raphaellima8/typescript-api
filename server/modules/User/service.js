"use strict";
var interface_1 = require('./interface');
var models = require('../../models');
var User = (function () {
    function User() {
    }
    User.prototype.create = function (user) {
        return models.User.create(user);
    };
    User.prototype.getAll = function () {
        return models.User.findAll({
            order: ['name']
        })
            .then(interface_1.createUsers);
    };
    User.prototype.getById = function (id) {
        return models.User.findOne({
            where: { id: id }
        })
            .then(interface_1.createUserById);
    };
    User.prototype.update = function (id, user) {
        return models.User.update(user, {
            where: { id: id }
        });
    };
    User.prototype.delete = function (id) {
        return models.User.destroy({
            where: { id: id }
        });
    };
    return User;
}());
exports.User = User;
