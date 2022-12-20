'use strict';
//Fare il require di mail e lo assegna a Mail
var Mail = require('dw/net/Mail');

/**
 * Send contact form data to client
 * @param {Array} contactDetails  - The contact form data
 * @return void
 */
function subscribe(contactDetails) {

    //Creare una stringa content prendendo gli elementi di contactDetails
    var content = contactDetails[contactFirstName] + " " + contactDetails[contactLastName] + " " + contactDetails[contactEmail] + "\n" + contactDetails[contactTopic] + " " + contactDetails[contactComment];

    //creiamo una nuova mail e settiamo gli elementi addTo setFrom setSubject e setContent, infine inviamo la mail
    var mail = new Mail();
    mail.addTo("ecommerce@pippo.online");
    mail.setFrom("noreply@pippo.online");
    mail.setSubject("PIPPO SITE CONTACT FORM");

    mail.setContent(content);
    mail.send();

    return;
}

//facciamo l'export di subscribe
module.exports = {
    subscribe
}