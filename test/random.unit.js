if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var _ = require('lodash');
    var faker = require('../index');
}


describe("random.js", function () {
  describe("number", function() {

    it("returns a random number given a maximum value as Number", function() {
      var max = 10;
      assert.ok(faker.random.number(max) <= max);
    });


    it("returns a random number given a maximum value as Object", function() {
      var options = { max: 10 };
      assert.ok(faker.random.number(options) <= options.max);
    });

    it("returns a random number between a range", function() {
      var options = { min: 22, max: 33 };
      for(var i = 0; i < 100; i++) {
        var randomNumber = faker.random.number(options);
        assert.ok(randomNumber >= options.min);
        assert.ok(randomNumber <= options.max);
      }
    });

    it("provides numbers with a given precision", function() {
      var options = { min: 0, max: 1.5, precision: 0.5 };
      var results = _.chain(_.range(50))
        .map(function() {
          return faker.random.number(options);
        })
        .uniq()
        .value()
        .sort();

      assert.ok(_.contains(results, 0.5));
      assert.ok(_.contains(results, 1.0));

      assert.equal(results[0], 0);
      assert.equal(_.last(results), 1.5);

    });

    it("should not modify the input object", function() {
      var min = 1;
      var max = 2;
      var opts = {
        min: min,
        max: max
      };

      faker.random.number(opts);
      
      assert.equal(opts.min, min);
      assert.equal(opts.max, max);
    });

    it("should return a seeded random number if passed the seed parameter", function() {
      var max = 100;
      var seed = 1234;

      assert.ok(faker.random.number({ max: max, seed: seed }) <= max);
      assert.strictEqual(faker.random.number({ max: max, seed: seed }), faker.random.number({ max: max, seed: seed }));
      assert.notStrictEqual(faker.random.number({ max: max }), faker.random.number({ max: max }));
    });
  });

    describe('array_element()', function() {
        it("should return a default array if non passed in", function() {
            var random = faker.random.array_element();
            assert.ok(random);
            assert.ok(_.contains(["a", "b", "c"], random));
        });

        it("should return a random array element", function() {
            var array = [1, 2, 3, 4, 5];

            var random = faker.random.array_element(array);

            assert.ok(random);
            assert.ok(_.contains(array, random));
        });

        it("should return a seeded array element", function() {
            var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            var seed = 1234;

            var random = faker.random.array_element(array, {seed: seed});

            assert.ok(random);
            assert.strictEqual(random, faker.random.array_element(array, {seed: seed}));
            assert.ok(_.contains(array, random));
        });
    });

  describe('UUID', function() {
    it('should generate a valid UUID', function() {
      var UUID = faker.random.uuid();
      var RFC4122 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
      assert.ok(RFC4122.test(UUID));
    })
  })
});
