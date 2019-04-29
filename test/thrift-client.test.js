'use strict';

const mock = require('egg-mock');

describe('test/thrift-client.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/thrift-client-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, thriftClient')
      .expect(200);
  });
});
