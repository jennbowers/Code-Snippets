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

// create tests begin
describe('creating a snippet successfully', () => {
  afterEach((done) => {
    Snippets.deleteMany({}).then(done());
  });

  it('should create a snippet successfully', (done) => {
    const snippet = new Snippets({username: 'Matthew', title: 'test title3', body: 'test body', notes: 'test notes', language: 'test language', tags: [{tagName: 'tag1'}, {tagName: 'tag2'}]}).save().then((snippet) => {
      expect(snippet.username).to.be.a('string');
      expect(snippet.username).to.equal('Matthew');
      expect(snippet.username).to.not.equal('JennBowers');
      expect(snippet.title).to.equal('test title3');
      expect(snippet.body).to.equal('test body');
      expect(snippet.notes).to.equal('test notes');
      expect(snippet.language).to.equal('test language');
      expect(snippet.tags[0].tagName).to.equal('tag1');
      expect(snippet.tags[1].tagName).to.equal('tag2');
    }).then(done());

  });
});

describe('rendering create page', () => {
  it('should render the create page successfully', (done) => {
    request(app)
    .get('/create')
    .expect(200, done);
  });
});
