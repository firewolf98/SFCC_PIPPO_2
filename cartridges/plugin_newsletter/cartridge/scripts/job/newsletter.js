"use strict";

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Logger = require('dw/system/Logger').getLogger('Emailblink', 'subscribe');

var EmailblinkService = require('~/cartridge/scripts/services/emailblink');

function execute() {

    var searchQuery = CustomObjectMgr.queryCustomObjects('Newsletter_Forms', "email = *", null);  

    while (searchQuery.hasNext()) {

        newsletterForm = searchQuery.next();

        var resp =  EmailblinkService.call(newsletterForm.custom.email);

        if (resp.statusCode == 200) {
            Logger.info('Subscribed email {0}', newsletterForm.custom.email);

            try {
              CustomObjectMgr.remove(customObj);
            } catch (e) {
              Logger.error('Error occured during delete email {0}', newsletterForm.custom.email);
            }

        } else {
           return PIPELET_ERROR;
        }

    }
    return PIPELET_NEXT;
}

module.exports = {
  execute: execute
};
