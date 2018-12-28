var main = require('./main');
const assert = require('assert');

describe('main.test.js', function () {
  it('should equal 55 when n === 10', function () {
    assert.equal(55, main.fibonacci(10), 'main.js has some wrong!');
  });
});