'use strict';

const thriftClient = require('./lib/thrift-client');

module.exports = app => {
  if (app.config.thriftClient.app) thriftClient(app);
};
