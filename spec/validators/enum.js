var chai = require('chai');
var expect = chai.expect;

var Enum = require('../../js/validators/enum');

describe('enum validator', function () {
  var enumerators = ['foo', 'bar', 123];

  it('should be a class', function () {
    expect(Enum).to.be.a('function');
  });

  it('should validate if a value is in the acceptable value set', function () {
    var validator = new Enum(enumerators);

    expect(validator.isValid('foo')).to.be.true;
    expect(validator.isValid('bar')).to.be.true;
    expect(validator.isValid(123)).to.be.true;
    expect(validator.isValid('hello')).to.be.false;
    expect(validator.isValid(1)).to.be.false;
    expect(validator.isValid({})).to.be.false;
    expect(validator.isValid(null)).to.be.false;
  });

  it('should accept null if nullable is on', function () {
    var validator = new Enum(enumerators, true);

    expect(validator.isValid(null)).to.be.true;
  });
});
