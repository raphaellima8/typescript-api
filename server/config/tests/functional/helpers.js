"use strict";
var chai = require('chai');
var chaiHttp = require('chai-http');
var api_1 = require('../../../api/api');
exports.app = api_1["default"];
exports.Chai = chai;
exports.req = chai.use(chaiHttp);
exports.expect = chai.expect;
