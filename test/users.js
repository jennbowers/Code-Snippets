const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

// models
const Snippets = require('../models/snippets');
const Users = require('../models/users');

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
