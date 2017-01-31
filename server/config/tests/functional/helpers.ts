import * as mocha from 'mocha';
import * as chai from 'chai';
import * as TD from 'testdouble';
import chaiHttp = require('chai-http');
import App from '../../../api/api';

export const app = App;

export const Chai = chai;

export const req = chai.use(chaiHttp);

export const expect = chai.expect;

export const td = TD;
