# egg-thrift-client DON'T USE IT NOW
# 现在不要使用它

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-thrift-client.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-thrift-client
[download-image]: https://img.shields.io/npm/dm/egg-thrift-client.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-thrift-client

## 依赖说明

### 依赖的插件

- thrift

## 开启插件

```js
// config/plugin.js
exports.thriftClient = {
  enable: true,
  package: 'egg-thrift-client',
};
```

## 使用场景

插件用于在 egg 中创建 thrift client 

## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## License

[MIT](LICENSE)
