const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const routes = require('../routes');
// const crypto = require('crypto');
// const createUser = require('../app').createUser;
const createUser = require('../app').createUser;
const createPasswordHashObject = require('../app').createPasswordHashObject;

// models
const Snippets = require('../models/snippets');
const Users = require('../models/users');


// tests begin

describe('signup tests', () => {
  it('can successfully create a user', (done) => {
    createUser('JennBowers', '1234').then((user) => {
      expect(user.username).to.equal('JennBowers');
      expect(user.password).to.be.an('object');
      expect(user.password.hash.length).to.equal(344);
    }).then(done());
  });
});

describe('basic sanity tests', () => {
  it('can access api endpoints successfully', (done) => {
    request(app)
    .get('/api/sanity')
    .expect(200, {hello: 'Jenn'}, done);
  });

  it('should run test', (done) => {
    expect(1).to.equal(1);
    done();
  });
});
