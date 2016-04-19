var chai = require('chai');
var expect = chai.expect;

var Passive = require('../../js/validators/passive');

var message = 'error message';

describe('passive validator', function () {
  it('should be a class', function () {
    expect(Passive).to.be.a('function');
  });

  it('should be valid for arbitrary value by default', function () {
    var validator = new Passive();

    expect(validator.isValid('foo')).to.be.true;
  });

  it('should be invalid after setError', function () {
    var validator = new Passive();

    validator.setError(message, 'foo');
    expect(validator.isValid('foo')).to.be.false;
    expect(validator.message).to.be.equal(message);
  });

  it('should be valid after setError then value changes', function () {
    var validator = new Passive();

    validator.setError('error message', 'foo');
    expect(validator.isValid('bar')).to.be.true;
  });
});
