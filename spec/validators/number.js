var chai = require('chai');
var expect = chai.expect;

var num = require('../../js/validators/number');

describe('number validators', function () {
  it('should return an object', function () {
    expect(num).to.be.an('object');
  });

  describe('num.Type', function () {
    it('should be a class', function () {
      expect(num.Type).to.be.a('function');
    });

    it('should validate if an object is number', function () {
      var validator = new num.Type();

      expect(validator.isValid(1)).to.be.true;
      expect(validator.isValid(1.23)).to.be.true;
      expect(validator.isValid(123)).to.be.true;
      expect(validator.isValid(1234)).to.be.true;
      expect(validator.isValid('1234')).to.be.true;
      expect(validator.isValid('1,234')).to.be.true;
      expect(validator.isValid('1,234.456')).to.be.true;
      expect(validator.isValid('f1,234.456')).to.be.false;
      // TODO: [zhbliu] should we allow numbers shown with scientific notation by default (number with too many digits) ?
      //expect(validator.isValid(Number.MAX_VALUE)).to.be.true;
      //expect(validator.isValid(Number.MIN_VALUE)).to.be.true;
      expect(validator.isValid('foo')).to.be.false;
      expect(validator.isValid({ a: 1 })).to.be.false;
      expect(validator.isValid([1, 2, 3])).to.be.false;
    });
  });

  describe('num.Size', function () {
    it('should be a class', function () {
      expect(num.Size).to.be.a('function');
    });

    it('should validate if a number has limited integer and decimal length', function () {
      var validator = new num.Size(3, 2);

      expect(validator.isValid(1.2)).to.be.true;
      expect(validator.isValid(1.23)).to.be.true;
      expect(validator.isValid(12.34)).to.be.true;
      expect(validator.isValid(123.45)).to.be.true;
      expect(validator.isValid(-123.45)).to.be.true;
      expect(validator.isValid('foo')).to.be.false;
      expect(validator.isValid(123.456)).to.be.false;
      expect(validator.isValid(1234.56)).to.be.false;
    });

    it('should validate for integer number if decimalLength is 0', function () {
      var validator = new num.Size(3, 0);

      expect(validator.isValid(1)).to.be.true;
      expect(validator.isValid(12)).to.be.true;
      expect(validator.isValid(123)).to.be.true;
      expect(validator.isValid(-123)).to.be.true;
      expect(validator.isValid(1234)).to.be.false;
      expect(validator.isValid(1.2)).to.be.false;
    });
  });

  describe('num.Range', function () {
    it('should be a class', function () {
      expect(num.Range).to.be.a('function');
    });

    it('should validate if a number is no smaller than min', function () {
      var validator = new num.Range(1);

      expect(validator.isValid(1)).to.be.true;
      expect(validator.isValid(1.5)).to.be.true;
      expect(validator.isValid('foo')).to.be.false;
      expect(validator.isValid(0.5)).to.be.false;
    });

    it('should validate if a number is no larger than max', function () {
      var validator = new num.Range(Number.NEGATIVE_INFINITY, 1);

      expect(validator.isValid(1)).to.be.true;
      expect(validator.isValid(0.5)).to.be.true;
      expect(validator.isValid('foo')).to.be.false;
      expect(validator.isValid(1.5)).to.be.false;
    });

    it('should validate if a number is in the given range', function () {
      var validator = new num.Range(0, 1);

      expect(validator.isValid(0)).to.be.true;
      expect(validator.isValid(0.5)).to.be.true;
      expect(validator.isValid(1)).to.be.true;
      expect(validator.isValid('foo')).to.be.false;
      expect(validator.isValid(-1)).to.be.false;
      expect(validator.isValid(1.5)).to.be.false;
    });
  });
});
