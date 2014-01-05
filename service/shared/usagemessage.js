var messageFormatter = require("../shared/usagemessageformatter");
var messageParser = require("../shared/usagemessageparser");
var messageSender = require("../shared/usagemessagesender");

exports.send = function(action, credentials, handler) {
    var soapRequestString = messageFormatter.format(
        action, credentials.email, credentials.password);    

    messageSender.send(soapRequestString, function(error, soapResponseString) {
        if (error) {
            handler(error);
            return;
        }
        
        messageParser.parse(soapResponseString, function(error, soapResponse) {
            if (error) {
                handler(error);
                return;
            }

            handler(null, soapResponse);
        });
    });
};
