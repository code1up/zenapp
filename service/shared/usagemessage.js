var messageFormatter = require("../shared/usagemessageformatter");
var messageParser = require("../shared/usagemessageparser");
var messageSender = require("../shared/usagemessagesender");

exports.send = function(action, credentials, callback) {
    var soapRequestString = messageFormatter.format(
        action, credentials.email, credentials.password);    

    messageSender.send(soapRequestString, function(error, soapResponseString) {
        if (error) {
            callback(error);
            return;
        }
        
        messageParser.parse(soapResponseString, function(error, soapResponse) {
            if (error) {
                callback(error);
                return;
            }

            callback(null, soapResponse);
        });
    });
};
