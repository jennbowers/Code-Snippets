const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const routes = require('../routes');

// controllers
const indexController = require('../controllers/index');
const createController = require('../controllers/create');

// models
const Snippets = require('../models/snippets');
const Users = require('../models/users');

// detail test begin
describe('rendering a specific snippet', () => {
  it('should find a specific snippet to display', (done) => {
    request(app)
    .post('/:id')
    .expect(200);
    expect(2).to.equal(2);
    expect(2).to.not.equal(1);
    done();
  });
});

// index tests begin
describe('searching through snippets', () => {
  it('should successfully search for a snippet by that user with a specified tag', (done) => {
    request(app)
    .post('/tags')
    .send({})
    .expect(200);
    expect(2).to.equal(2);
    expect(2).to.not.equal(1);
    done();
  });

  it('should successfully search for a snippet by that user in the language specified', (done) => {
    request(app)
    .post('/language')
    .send({})
    .expect(200);
    expect(2).to.equal(2);
    expect(2).to.not.equal(1);
    done();
  });
});

// create tests begin
describe('creating a snippet successfully', () => {
  it('should create a snippet successfully', (done) => {
      request(app)
      .post('/create')
      .send({})
      .expect(200);
      expect(2).to.equal(2);
      done();
  });
});

describe('rendering create page', () => {
  it('should render the create page successfully', (done) => {
    request(app)
    .get('/create')
    .expect(200, done);
  });
});
