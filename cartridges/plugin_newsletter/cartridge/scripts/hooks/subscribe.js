'use strict';

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Logger = require('dw/system/Logger');



/**
 * validates the current users basket
 * @param {String} email - The current user's basket
 * @returns {Object} an error object
 */
function subscribe(email) {

    var keyValue = email.toLowerCase();

    var searchQuery = CustomObjectMgr.queryCustomObjects('Newsletter_Forms', "custom.email = {0}", email.toLowerCase());
    
    if (searchQuery.hasNext()) {
        return;
    }

    try {
        var customObj = CustomObjectMgr.createCustomObject('Newsletter_Forms', keyValue);
    } catch (e) {
        Logger.getLogger('Newsletter', 'subscribe').error('Error occured during save: email {0}', email);
    }

    return;

}

module.exports = {
  subscribe
};