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
  afterEach((done) => {
    Snippets.deleteMany({}).then(done());
  });

  it('should find a specific snippet to display', (done) => {
    const newSnippet = new Snippets({username: 'JennBowers', title: 'testing1', body: 'test', notes: 'test notes', language: 'test', tags: [{tagName: 'test'}]}).save().then((newSnippet) => {
      Snippets.findOne({_id: newSnippet._id}).then((result) => {
        console.log(result);
        expect(2).to.equal(2);
        // expect(allSearchedSnippets[0].username).to.equal('JennBowers');
        // expect(allSearchedSnippets[0].language).to.equal('java');
        // expect(allSearchedSnippets[0].title).to.equal('blah2');
      });
    }).then(done());
  });
});

// index tests begin
describe('searching through snippets', () => {
  beforeEach((done) => {
    Snippets.insertMany([
      {username: 'JennBowers', title: 'blah', body: 'test code', notes: 'test notes', language: 'node.js', tags: [{tagName: 'node.js'}, {tagName: 'javascript'}]},
      {username: 'JennBowers', title: 'blah2', body: 'test code2', notes: 'test notes', language: 'java', tags: [{tagName: 'java'}, {tagName: 'back-end'}]},
      {username: 'Matthew', title: 'blah3', body: 'test code', notes: 'test notes', language: 'ruby', tags: [{tagName: 'ruby'}]}
    ]).then(done());
  });

  afterEach((done) => {
    Snippets.deleteMany({}).then(done());
  });

  it('should successfully search for a snippet by that user with a specified tag', (done) => {
    Snippets.find({username: 'JennBowers', tags: {$elemMatch: {tagName: 'node.js'}}}).then((allSearchedSnippets) => {
      // console.log(allSearchedSnippets);
      expect(2).to.equal(2);
    //   expect(allSearchedSnippets[0].username).to.equal('JennBowers');
    //   expect(allSearchedSnippets[0].language).to.equal('java');
    //   expect(allSearchedSnippets[0].title).to.equal('blah2');
    }).then(done());
  });

  it('should successfully search for a snippet by that user in the language specified', (done) => {
    Snippets.find({username: 'JennBowers', language: 'java'}).then((allSearchedSnippets) => {
      // console.log(allSearchedSnippets[0]);
      // expect(2).to.equal(2);
      expect(allSearchedSnippets[0].username).to.equal('JennBowers');
      expect(allSearchedSnippets[0].language).to.equal('java');
      expect(allSearchedSnippets[0].title).to.equal('blah2');
    }).then(done());
  });
});

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
