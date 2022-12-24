'use strict';

const decorators = require("./decorators");

var fullProductBase = module.superModule;

module.exports = function fullProduct(product, apiProduct, options) {
    fullProductBase.call(product,apiProduct,options);
    decorators.sustainabilityAttributes(product,apiProduct);
    return product;
}
