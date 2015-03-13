var faker = require('../index');

var commerce = {

    color: function() {
        return faker.random.array_element(faker.definitions.commerce.color);
    },

    department: function(max, fixedAmount) {
        max = max || 3;

        var num = Math.floor((Math.random() * max) + 1);
        if(fixedAmount) {
            num = max;
        }

        var categories = faker.commerce.categories(num);

        if(num > 1) {
            return faker.commerce.mergeCategories(categories);
        }

        return categories[0];
    },

    productName: function(options) {
        options = options || {};

        if (typeof options.seed === 'undefined') {
            options.seed = null;
        }

        return faker.commerce.productAdjective(options) + " " +
                faker.commerce.productMaterial(options) + " " +
                faker.commerce.product(options);
    },

    price: function(min, max, dec, symbol) {
        min = min || 0;
        max = max || 1000;
        dec = dec || 2;
        symbol = symbol || '';

        if(min < 0 || max < 0) {
            return symbol + 0.00;
        }

        return symbol + (Math.round((Math.random() * (max - min) + min) * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(dec);
    },

    categories: function(num) {
        var categories = [];

        do {
            var category = faker.random.array_element(faker.definitions.commerce.department);
            if(categories.indexOf(category) === -1) {
                categories.push(category);
            }
        } while(categories.length < num);

        return categories;
    },

    mergeCategories: function(categories) {
        var separator = faker.definitions.separator;
        var commaSeparated = categories.slice(0, -1).join(', ');

        return [commaSeparated, categories[categories.length - 1]].join(separator);
    },

    productAdjective: function(options) {
        return faker.random.array_element(faker.definitions.commerce.product_name.adjective, options);
    },

    productMaterial: function(options) {
        return faker.random.array_element(faker.definitions.commerce.product_name.material, options);
    },

    product: function(options) {
        return faker.random.array_element(faker.definitions.commerce.product_name.product, options);
    }

};

module.exports = commerce;