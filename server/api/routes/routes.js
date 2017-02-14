"use strict";
var routes_1 = require('../../modules/User/routes');
var auth_1 = require('../../modules/auth/auth');
var Routes = (function () {
    function Routes(app, auth) {
        this.router = new routes_1["default"]();
        this.tokenRoute = new auth_1["default"]();
        this.auth = auth;
        this.getRoutes(app);
    }
    Routes.prototype.getRoutes = function (app) {
        app.route('/api/users/all').all(this.auth.authenticate()).get(this.router.index);
        app.route('/api/users/create').post(this.router.create);
        app.route('/api/users/:id').get(this.router.findOne);
        app.route('/api/users/:id/update').put(this.router.update);
        app.route('/api/users/:id/destroy').delete(this.router.destroy);
        app.route('/token').post(this.tokenRoute.auth);
    };
    return Routes;
}());
exports.__esModule = true;
exports["default"] = Routes;
