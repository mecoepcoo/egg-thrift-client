/* eslint-disable */
const Client = require('./Client');

class ClientManager {
  constructor(app) {
    this.app = app;
    this.clientMap = new Map();
  }

  registerClient(clientConfig, alias = '') {
    alias = alias || `${clientConfig.host}:${clientConfig.port}`;
    // alias = alias || clientConfig.alias;
    if (this.clientMap.has(alias)) {
      return this.clientMap.get(alias);
    }
    let thriftClient = new Client(clientConfig, alias);
    this.clientMap.set(alias, thriftClient);

    thriftClient.on('connect', _e => {
      this.app.coreLogger.info(`[egg-thrift-client] ${alias} 微服务已连接 ${clientConfig.host}:${clientConfig.port}`);
      thriftClient.hasReconnectedCount = 0;
    });

    thriftClient.on('error', e => {
      this.app.coreLogger.error(`[egg-thrift-client] ${alias} 微服务发生错误 ${clientConfig.host}:${clientConfig.port}`, e);
    })

    thriftClient.on('timeout', e => {
      this.app.coreLogger.warn(`[egg-thrift-client] ${alias} 微服务连接超时 ${clientConfig.host}:${clientConfig.port}`, e);
    })

    thriftClient.on('close', _e => {
      if (
        this.app.config.thriftClient.reconnect &&
        thriftClient.hasReconnectedCount < this.app.config.thriftClient.reconnectMaxCount
      ) {
        this.app.coreLogger.warn(
          `[egg-thrift-client] ${alias} 微服务断开 ${clientConfig.host}:${clientConfig.port}, 
          ${this.app.config.thriftClient.reconnectDelay}ms后尝试第${thriftClient.hasReconnectedCount + 1}次重连`
        );
        setTimeout(() => {
          thriftClient.reConnect(clientConfig);
        }, this.app.config.thriftClient.reconnectDelay);
      } else {
        this.app.coreLogger.warn(`[egg-thrift-client] ${alias} 微服务已断开 ${clientConfig.host}:${clientConfig.port}`);
      }
    })
    return thriftClient;
  }
}

module.exports = ClientManager;
