"use strict";
var bcrypt = require("bcrypt");
function default_1(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        }
    }, {
        classMethods: {
            validatePassword: function (encryptedPassword, password) { return bcrypt.compareSync(password, encryptedPassword); }
        }
    });
    User.beforeCreate(function (user) { return hashPass(user); });
    User.beforeUpdate(function (user) { return hashPass(user); });
    function hashPass(user) {
        var salt = bcrypt.genSaltSync(10);
        user.set('password', bcrypt.hashSync(user.password, salt));
        console.log("Password " + user.password);
    }
    return User;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
