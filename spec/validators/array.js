var chai = require('chai');
var expect = chai.expect;

var arr = require('../../js/validators/array');
var Enum = require('../../js/validators/enum');

describe('array validators', function () {
  it('should return an object', function () {
    expect(arr).to.be.an('object');
  });

  describe('arr.Type', function () {
    it('should be a class', function () {
      expect(arr.Type).to.be.a('function');
    });

    it('should validate if an object is array', function () {
      var validator = new arr.Type();

      expect(validator.isValid([])).to.be.true;
      expect(validator.isValid([1, 1])).to.be.true;
      expect(validator.isValid([1, 2, 3])).to.be.true;
      expect(validator.isValid(arguments)).to.be.false;
      expect(validator.isValid({})).to.be.false;
      expect(validator.isValid('foo')).to.be.false;
      expect(validator.isValid(123)).to.be.false;
    });
  });

  describe('arr.Size', function () {
    it('should be a class', function () {
      expect(arr.Size).to.be.a('function');
    });

    it('should validate if an array has length in specified range', function () {
      var validator = new arr.Size(3, 5);

      expect(validator.isValid([])).to.be.false;
      expect(validator.isValid([1, 2])).to.be.false;
      expect(validator.isValid([1, 2, 3])).to.be.true;
      expect(validator.isValid([1, 2, 3, 4, 5])).to.be.true;
      expect(validator.isValid([1, 2, 3, 4, 5, 6])).to.be.false;
      expect(validator.isValid('foo')).to.be.false;
    });

    it('should have default min items 0', function () {
      var validator = new arr.Size(undefined, 1);

      expect(validator.isValid([])).to.be.true;
      expect(validator.isValid([1])).to.be.true;
      expect(validator.isValid([1, 2])).to.be.false;
    });
  });

  describe('arr.Item', function () {
    it('should be a class', function () {
      expect(arr.Item).to.be.a('function');
    });

    it('should validate if every item passes validation of passed in validator', function () {
      var validator = new arr.Item([new Enum(['foo', 'bar'])]);

      expect(validator.isValid([])).to.be.true;
      expect(validator.isValid(['foo'])).to.be.true;
      expect(validator.isValid(['foo', 'bar'])).to.be.true;
      expect(validator.isValid(['foo', 'foo'])).to.be.true;
      expect(validator.isValid(['oof', 'bar'])).to.be.false;
      expect(validator.isValid(['oof', 'rab'])).to.be.false;

      expect(validator.message({})).to.be.equal('Validation_Base_Field_Not_Valid');
      expect(validator.message(['oof', 'bar'])).to.be.equal('Validation_Array_Items_Invalid');
    });
  });

  describe('arr.Items', function () {
    it('should be a class', function () {
      expect(arr.Items).to.be.a('function');
    });

    it('should validate if each item passes validation of corresponding validator when additional validator is true', function () {
      var validator = new arr.Items([
        [new Enum(['foo1', 'bar1'])],
        [new Enum(['foo2', 'bar2'])]
      ], true);

      expect(validator.isValid([])).to.be.true;
      expect(validator.isValid(['foo1'])).to.be.true;
      expect(validator.isValid(['foo1', 'bar2'])).to.be.true;
      expect(validator.isValid(['foo1', 'bar2', 'no validation'])).to.be.true;
      expect(validator.isValid(['foo2', 'bar1'])).to.be.false;

      expect(validator.message({})).to.be.equal('Validation_Base_Field_Not_Valid');
      expect(validator.message(['foo2', 'bar1'])).to.be.equal('Validation_Array_Items_Invalid');
    });

    it('should validate if additional items pass validation of additional validator', function () {
      var validator = new arr.Items([
        [new Enum(['foo1', 'bar1'])],
        [new Enum(['foo2', 'bar2'])]
      ], [
        new Enum(['foo-additional', 'bar-additional'])
      ]);

      expect(validator.isValid(['foo1', 'bar2', 'foo-additional'])).to.be.true;
      expect(validator.isValid(['foo1', 'bar2', 'no validation'])).to.be.false;
    });

    it('should validate if array length not exceed length of validators when additional validator is false', function () {
      var validator = new arr.Items([
        [new Enum(['foo1', 'bar1'])],
        [new Enum(['foo2', 'bar2'])]
      ], false);

      expect(validator.isValid(['foo1', 'bar2'])).to.be.true;
      expect(validator.isValid(['foo1', 'bar2', 'no validation'])).to.be.false;

      expect(validator.message(['foo1', 'bar2', 'no validation'])).to.be.equal('Validation_Array_Size_Max');
    });
  });

  describe('arr.Unique', function () {
    it('should be a class', function () {
      expect(arr.Unique).to.be.a('function');
    });

    it('should validate if there are duplicate items', function () {
      var validator = new arr.Unique();

      expect(validator.isValid([])).to.be.true;
      expect(validator.isValid(['foo'])).to.be.true;
      expect(validator.isValid(['foo', 'bar'])).to.be.true;
      expect(validator.isValid(['foo', 'foo'])).to.be.false;
    });
  });
});
