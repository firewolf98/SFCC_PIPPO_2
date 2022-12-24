'use strict';

var base = module.superModule;

var Locale = require('dw/util/Locale');
var countries = require('*/cartridge/config/countries');
const { sustainabilityAttributes } = require('../../models/product/decorators');

function convertco2value(product) {
    var currentLocale = Locale.getLocale(req.locale.id).toString();
    var convertedCo2Value = "";

    countries.forEach(function(locale){
        if (currentLocale===locale.id){
            switch(locale.weight) {
                case 'kg.':
                    convertedCo2Value += product.custom.co2Saved + locale.weight;
                    break;
                case 'lb.':
                    convertedCo2Value += (product.custom.co2Saved/2.205).toString() + locale.weight;
                    break;
                default:
                    convertedCo2Value = 'N/A';
                    break;
            }
            return convertedCo2Value;
        }
    });
}

function sustainabilityColor(product) {
    if (product.custom.co2Saved>5 && product.custom.co2Saved>90) {
        return "#40C047";
    } else if (product.custom.co2Saved<5 || product.custom.co2Saved<90) {
        return "#82C91E";
    } else {
        return "#FAB005";
    }
}

base.convertco2value = convertco2value;
base.sustainabilityColor = sustainabilityColor;

module,exports = base;