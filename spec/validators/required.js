var chai = require('chai');
var expect = chai.expect;

var Required = require('../../js/validators/required');

describe('required validator', function () {
  it('should be a class', function () {
    expect(Required).to.be.a('function');
  });

  it('should validate if a value is defined', function () {
    var validator = new Required();

    expect(validator.isValid('foo')).to.be.true;
    expect(validator.isValid(123)).to.be.true;
    expect(validator.isValid({ a: 1 })).to.be.true;
    expect(validator.isValid([1, 2, 3])).to.be.true;
    expect(validator.isValid()).to.be.false;
    expect(validator.isValid(null)).to.be.false;
    expect(validator.isValid(' ')).to.be.false;
    expect(validator.isValid('\t\n')).to.be.false;
  });

  it('should accept empty string if allowSpace is on', function () {
    var validator = new Required(true);

    expect(validator.isValid(' ')).to.be.true;
    expect(validator.isValid('\t\n')).to.be.true;
  });
});
