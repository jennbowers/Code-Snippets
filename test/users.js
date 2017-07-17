const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const routes = require('../routes');
const welcomeController = require('../controllers/welcome');
const crypto = require('crypto');

// models
const Snippets = require('../models/snippets');
const Users = require('../models/users');

// password hashing
const createUser = function(username, password) {
  return Users.create({username: username, password: createPasswordHashObject(password)});
};

const createPasswordHashObject = function(password, salt="") {
  salt = salt || crypto.randomBytes(Math.ceil(32 * 3 / 4)).toString('base64')
.slice(0, 8);
  const hash = crypto.pbkdf2Sync(password, salt , 100, 256, 'sha256');
  const hashString = hash.toString('base64');
  return {salt: salt, iterations: 100, hash: hashString};
};

const login = function(username, password) {
  return Users.findOne({username: username}).then(function(user) {
    if(!user) {
      return false;
    }
    const pwObject = user.password;
    const newPWObject = createPasswordHashObject(password, pwObject.salt);
    return pwObject.hash === newPWObject.hash;
  });
};


// tests begin
describe('login tests', () => {
  afterEach((done) => {
    Users.deleteMany({}).then(done());
  });

  it('should not log a user in successfully if invalid password', (done) => {
    createUser('JennBowers', '1234').then((user) => {
      login('JennBowers', 'password').then((secondResult) => {
        expect(secondResult).to.equal(false);
        done();
      });
    });
  });

  it('should log a user in successfully if valid password', (done) => {
    createUser('JennBowers', '1234').then((user) => {
      login('JennBowers', '1234').then((result) => {
        expect(result).to.equal(true);
        done();
      });
    });
  });
});

describe('signup tests', () => {
  beforeEach(function(done) {
    Users.deleteMany({}).then(done());
  });

  afterEach(function(done) {
    Users.deleteMany({}).then(done());
  });

  it('can successfully create a user', (done) => {
    createUser('username', 'password').then(function(user) {
      expect(user.username).to.equal('username');
      expect(user.password).to.be.an('object');
      expect(user.password.hash.length).to.equal(344);
    }).then(done);
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
