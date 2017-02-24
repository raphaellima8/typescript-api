import * as mocha from 'mocha';
import * as Chai from 'chai';
const supertest = require('supertest');
import App from '../../../api/api';

const app = App;
const request = supertest;
const expect = Chai.expect;

export {app, expect, request};
