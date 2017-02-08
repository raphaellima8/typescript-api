"use strict";
var helpers_1 = require('../../../config/tests/functional/helpers');
describe('GET /api/users/all', function () {
    it('Should return a json of Users', function () {
        return helpers_1.Chai
            .request(helpers_1.app)
            .get('/api/users/all')
            .then(function (res) {
            helpers_1.expect(res).to.be.json;
            helpers_1.expect(res.status).to.equal(200);
            helpers_1.expect(res.body.payload[0]).to.have.all.keys([
                'id',
                'name',
                'email'
            ]);
        });
    });
});
