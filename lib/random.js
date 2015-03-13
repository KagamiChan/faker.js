var mersenne = require('../vendor/mersenne');
var faker = require('../index');

var random = {
    // returns a single random number based on a max number or range
    number: function (options) {

        if (typeof options === "number") {
          options = {
            max: options
          };
        }

        options = options || {};

        if (typeof options.min === "undefined") {
          options.min = 0;
        }

        if (typeof options.max === "undefined") {
          options.max = 1;
        }
        if (typeof options.precision === "undefined") {
          options.precision = 1;
        }

        var randomGenerator = null;
        if (typeof options.seed !== 'undefined') {
            randomGenerator = mersenne.seed(options.seed)
        }

        // Make the range inclusive of the max value
        var max = options.max;
        if (max > 0) {
          max += options.precision;
        }

        max = max / options.precision;
        var min = options.min/options.precision;

        var randomNumber = options.precision * Math.floor(
            mersenne.rand(max, min, randomGenerator)
        );

        return randomNumber;

    },

    // takes an array and returns a random element of the array
    array_element: function (array, options) {
        array = array || ["a", "b", "c"];

        options = options || {};

        if (typeof options.seed === 'undefined') {
            options.seed = null;
        }

        var r = faker.random.number({ max: array.length - 1, seed: options.seed });
        return array[r];
    },

    // takes an object and returns the randomly key or value
    object_element: function (object, field) {
        object = object || {};
        var array = Object.keys(object);
        var key = faker.random.array_element(array);

        return field === "key" ? key : object[key];
    },

    uuid : function () {
        var RFC4122_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        var replacePlaceholders = function (placeholder) {
            var random = Math.random()*16|0;
            var value = placeholder == 'x' ? random : (random &0x3 | 0x8);
            return value.toString(16);
        };
        return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
    }
};

module.exports = random;
