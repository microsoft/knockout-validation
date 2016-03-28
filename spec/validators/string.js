var chai = require('chai');
var expect = chai.expect;

var str = require('../../js/validators/string');

describe('str validators', function () {
  it('should an object', function () {
    expect(str).to.be.an('object');
  });

  describe('str.Type', function () {
    it('should be a class', function () {
      expect(str.Type).to.be.a('function');
    });

    it('should validate if an object is a string', function () {
      var validator = new str.Type();

      expect(validator.isValid('foo')).to.be.true;
      expect(validator.isValid('')).to.be.true;
      expect(validator.isValid(' ')).to.be.true;
      expect(validator.isValid('\t\n')).to.be.true;
      expect(validator.isValid(123)).to.be.false;
      expect(validator.isValid({ a: 'hello' })).to.be.false;
      expect(validator.isValid(['foo'])).to.be.false;
    });
  });

  describe('str.Size', function () {
    it('should be a class', function () {
      expect(str.Size).to.be.a('function');
    });

    it('should validate if a string is within the limited length', function () {
      var validator = new str.Size(3);

      expect(validator.isValid('')).to.be.true;
      expect(validator.isValid('a')).to.be.true;
      expect(validator.isValid('ab')).to.be.true;
      expect(validator.isValid('abc')).to.be.true;
      expect(validator.isValid('abcd')).to.be.false;
      expect(validator.isValid(123)).to.be.false;
    });
  });

  describe('str.XSS', function () {
    it('should be a class', function () {
      expect(str.XSS).to.be.a('function');
    });

    it('should validate if a string contains HTML tags', function () {
      var validator = new str.XSS();

      expect(validator.isValid('foo')).to.be.true;
      expect(validator.isValid('<a href="some-link">a link</a>')).to.be.false;
    });
  });
});
