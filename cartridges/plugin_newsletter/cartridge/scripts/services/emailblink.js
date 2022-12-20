'use strict';


var Svc = require('dw/svc');

/**
 * Create AVS service
 * @returns {dw.svc.HTTPService} HTTP service object
 */
function subscribe() {
  return Svc.LocalServiceRegistry.createService('Emailblink', {
        /**
         * @param {dw.svc.HTTPService} svc
         * @returns {string} email
         */
    createRequest: function (svc, email) {
        svc.addHeader('Content-Type', 'application/json');
        svc.addHeader('Accept', 'application/json');
        svc.setRequestMethod('POST');

        svc.setAuthentication('NONE');

        var curSite = Site.getCurrent();
        svc.url = curSite.getCustomPreferenceValue('url');
        var username = curSite.getCustomPreferenceValue('client_id');
        var password = curSite.getCustomPreferenceValue('client_secret');

        if (empty(url)) {
            throw new Error('Emailblink service configuration requires valid url in Site custom preferences');
        }
        if (empty(username) || empty(password)) {
            throw new Error('Emailblink service configuration requires valid client username and password in Site custom preferences');
        }

        svc.addHeader('Username', username);
        svc.addHeader('Password', password);

        var requestBody = {    
          'Payload': {
          'Email': email
          }                
        };

    },
        /**
         *
         * @param {dw.svc.HTTPService} svc
         * @param {dw.net.HTTPClient} client
         * @returns {{responseObj: Object, isError: boolean, isValidJSON: boolean, errorText: string}}
         */
    parseResponse: function (svc, client) {
      var result =  { client } //statusCode + msg
      return result;
    }
  });
}

module.exports = subscribe();
