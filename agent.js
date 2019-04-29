'use strict';

const thriftClient = require('./lib/thrift-client');

module.exports = agent => {
  if (agent.config.thriftClient.agent) thriftClient(agent);
};
