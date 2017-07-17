// require in controllers
const createController = require('./controllers/create');
const detailController = require('./controllers/detail');
const indexController = require('./controllers/index');
const welcomeController = require('./controllers/welcome');

// passport setup
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
  (username, password, done) => {
    Users.findOne({username: username, password: password}).then(function(user) {
      if(!user) {
        console.log('Auth denied');
        return done(null, false);
      } else {
        return done(null, username);
      }
    });
  }
));

// passport.authenticate('basic', {session: false});
// passport.authenticate('basic', { successRedirect: '/index', failureRedirect: '/' }),

module.exports = (app) => {
  // app.get app.post etc goes in here with controller stuff
  app.get('/api/sanity', welcomeController.sanityTest);

  // ------- welcome page
  // renders welcome page and redirects from / if not logged in
  app.get('/', welcomeController.renderWelcome);
  // logging in, redirects to index if valid user
  app.post('/login', welcomeController.loginWelcome);
  // signing up, auto logs in and redirects to index
  app.post('/signup', welcomeController.signupWelcome);

  // ------- index page
  // renders index page
  app.get('/index', indexController.renderIndex);
  // search for snippets in a specific language
  app.post('/language', indexController.searchLanguageIndex);
  // search for snippets with a specific tag
  app.post('/tags', indexController.searchTagsIndex);

  // ------ create page
  // renders create page
  app.get('/create', createController.renderCreate);
  // adds snippet to database
  app.post('/create', createController.addSnippetCreate);

  // ------ detail page
  // renders specific snippet
  app.post('/:id', detailController.renderDetail);

};
