var chai = require('chai');
var sinon = require('sinon');

chai.use(require('sinon-chai'));
var expect = chai.expect;

var Custom = require('../../js/validators/custom');

describe('custom validator', function () {
  it('should be a class', function () {
    expect(Custom).to.be.a('function');
  });

  it('should validate the value with the given function', function () {
    var isValid = sinon.spy(function () {
      return false;
    });
    var message = 'Always fail';
    var validator = new Custom(isValid, message, true);

    expect(validator.isValid('foo')).to.be.false;
    expect(isValid).to.be.calledOnce;
    expect(validator.message).to.equal(message);
  });
});
