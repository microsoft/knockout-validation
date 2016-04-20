var _ = require('underscore');
var chai = require('chai');
var sinon = require('sinon');
var koValidation = require('../js/index');
var Required = require('../js/validators/required');
var arr = require('../js/validators/array');
var str = require('../js/validators/string');
var num = require('../js/validators/number');
var Enum = require('../js/validators/enum');
var Passive = require('../js/validators/passive');
var Custom = require('../js/validators/custom');

chai.use(require('sinon-chai'));
var expect = chai.expect;

describe('knockout-validation', function () {
  it('should return an object', function () {
    expect(koValidation).to.exist;
  });

  describe('required', function () {
    it('should be defined as a function', function () {
      expect(koValidation.required).to.be.a('function');
    });

    it('should return an instance of Required', function () {
      var allowSpace = false;
      var validator = koValidation.required(allowSpace);

      expect(validator).to.be.instanceof(Required);
      expect(validator.allowSpace).to.be.equal(allowSpace);
    });
  });

  describe('array', function () {
    it('should be defined as a function', function () {
      expect(koValidation.array).to.be.a('function');
    });

    it('should return an instance of arr.Type', function () {
      expect(koValidation.array()).to.be.instanceof(arr.Type);
    });

    describe('array.size', function () {
      it('should be defined as a function', function () {
        expect(koValidation.array.size).to.be.a('function');
      });

      it('should return an instance of arr.Size', function () {
        expect(koValidation.array.size(3, 5)).to.be.instanceof(arr.Size);
      });
    });

    describe('array.item', function () {
      it('should be defined as a function', function () {
        expect(koValidation.array.item).to.be.a('function');
      });

      it('should return an instance of arr.Item', function () {
        expect(koValidation.array.item([new Enum(['foo', 'bar'])])).to.be.instanceof(arr.Item);
      });
    });

    describe('array.items', function () {
      it('should be defined as a function', function () {
        expect(koValidation.array.items).to.be.a('function');
      });

      it('should return an instance of arr.Items', function () {
        expect(koValidation.array.items([
          [new Enum(['foo', 'bar'])]
        ], false)).to.be.instanceof(arr.Items);
      });
    });

    describe('array.unique', function () {
      it('should be defined as a function', function () {
        expect(koValidation.array.unique).to.be.a('function');
      });

      it('should return an instance of arr.Unique', function () {
        expect(koValidation.array.unique()).to.be.instanceof(arr.Unique);
      });
    });
  });

  describe('string', function () {
    it('should be defined as a function', function () {
      expect(koValidation.string).to.be.a('function');
    });

    it('should return an instance of str.Type', function () {
      expect(koValidation.string()).to.be.instanceof(str.Type);
    });

    describe('string.size', function () {
      it('should be defined as a function', function () {
        expect(koValidation.string.size).to.be.a('function');
      });

      it('should return an instance of str.Size', function () {
        expect(koValidation.string.size(32)).to.be.instanceof(str.Size);
      });
    });

    describe('string.xss', function () {
      it('should be defined as a function', function () {
        expect(koValidation.string.xss).to.be.a('function');
      });

      it('should return an instance of str.XSS', function () {
        expect(koValidation.string.xss()).to.be.instanceof(str.XSS);
      });
    });
  });

  describe('number', function () {
    it('should be defined as a function', function () {
      expect(koValidation.number).to.be.a('function');
    });

    it('should return an instance of num.Type', function () {
      expect(koValidation.number()).to.be.instanceof(num.Type);
    });

    describe('number.size', function () {
      it('should be defined as a function', function () {
        expect(koValidation.number.size).to.be.a('function');
      });

      it('should return an instance of num.Size', function () {
        var integerLength = _.random(1, 10);
        var decimalLength = _.random(1, 10);
        var validator = koValidation.number.size(integerLength, decimalLength);

        expect(validator).to.be.instanceof(num.Size);
        expect(validator.integerLength).to.equal(integerLength);
        expect(validator.decimalLength).to.equal(decimalLength);
      });
    });

    describe('number.range', function () {
      it('should be defined as a function', function () {
        expect(koValidation.number.range).to.be.a('function');
      });

      it('should reutrn an instance of num.Range', function () {
        var min = _.random(0, 100);
        var max = _.random(100, 200);
        var validator = koValidation.number.range(min, max);

        expect(validator).to.be.instanceof(num.Range);
        expect(validator.min).to.equal(min);
        expect(validator.max).to.equal(max);
      });
    });
  });

  describe('enum', function () {
    it('should be defined as a function', function () {
      expect(koValidation.enum).to.be.a('function');
    });

    it('should return an instance of Enum', function () {
      var enumerators = ['hello', 'world'];
      var nullable = true;
      var validator = koValidation.enum(enumerators, true);

      expect(validator).to.be.instanceof(Enum);
      expect(validator.enumerators).to.deep.equal(enumerators);
      expect(validator.nullable).to.equal(nullable);
    });
  });

  describe('passive', function () {
    it('should be defined as a function', function () {
      expect(koValidation.passive).to.be.a('function');
    });

    it('should return an instance of Passive', function () {
      var validator = koValidation.passive();

      expect(validator).to.be.instanceof(Passive);
    });
  });

  describe('custom', function () {
    it('should be defined as a function', function () {
      expect(koValidation.custom).to.be.a('function');
    });

    it('should return an instance of Custom', function () {
      var method = function () {
        return false;
      };
      var message = 'Always fail';
      var blockInput = false;
      var validator = koValidation.custom(method, message, blockInput);

      expect(validator).to.be.instanceof(Custom);
      expect(validator.isValid).to.be.equal(method);
      expect(validator.message).to.be.equal(message);
      expect(validator.blockInput).to.be.equal(blockInput);
    });
  });

  describe('run', function () {
    it('should be defined as a function', function () {
      expect(koValidation.run).to.be.a('function');
    });

    it('should call the validators', function () {
      var isValid = sinon.spy(function () {
        return false;
      });
      var message = 'Always fail';
      var blockInput = false;

      var result = koValidation.run('foo', [
        koValidation.custom(isValid, message, blockInput),
      ]);

      expect(result).to.equal(message);
      expect(isValid).to.be.calledOnce;
    });
  });
});
