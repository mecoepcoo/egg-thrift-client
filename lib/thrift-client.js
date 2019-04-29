const ClientManager = require('./ClientManager');

module.exports = app => {
  app.addSingleton('thriftClient', createClient);
}

function createClient (config, app) {
  const clientManager = new ClientManager(app);
  const client = clientManager.registerClient(config, config.alias);
  return client;
}
