/* eslint-disable */
/* thrift 连接类 */
const EventEmitter = require('events');
const thrift = require('thrift');

class Client extends EventEmitter {
  constructor(clientConfig, alias = '') {
    super();
    this.config = clientConfig;
    this.alias = alias || `${clientConfig.host}:${clientConfig.port}`;
    // this.alias = alias || clientConfig.alias;
    this.hasReconnectedCount = 0;
    this.connection = null;
    this.client = null;
    this.testCount = 0;
    // 初始化时自动创建 client
    this.createClient(this.config);
  }

  createConnection(clientConfig) {
    const { 
      host,
      port,
      extendOptions,
      transport = thrift.TBufferedTransport,
      protocol = thrift.TJSONProtocol
    } = clientConfig;
    const connection = thrift.createConnection(host, port, {
      transport,
      protocol,
      ...extendOptions,
    });
    this.connection = connection;
    connection.on('connect', e => this.emit('connect', e));
    connection.on('close', e => this.emit('close', e));
    connection.on('error', e => this.emit('error', e));
    connection.on('timeout', e => this.emit('timeout', e));

    return connection;
  }

  createClient(clientConfig) {
    const connection = this.createConnection(clientConfig);
    const client = thrift.createClient(clientConfig.client, connection);
    this.client = client;
    return client;
  }

  reConnect(clientConfig) {
    this.hasReconnectedCount++;
    this.testCount++;
    this.createClient(clientConfig);
  }
}

module.exports = Client;
