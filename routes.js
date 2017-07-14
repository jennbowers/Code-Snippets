// require in controllers
const createController = require('./controllers/create');
const detailController = require('./controllers/detail');
const indexController = require('./controllers/index');
const welcomeController = require('./controllers/welcome');


module.exports = (app) => {
  // app.get app.post etc goes in here with controller stuff
  app.get('/', welcomeController.renderWelcome);

  app.get('/api/sanity', welcomeController.sanityTest);


};
