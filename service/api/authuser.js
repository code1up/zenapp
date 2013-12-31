var formatter = require("../shared/usageMessageformatter");
var sender = require("../shared/usageMessagesender");

exports.get = function(request, response) {
    var email = request.headers["x-zen-email"];
    var password = request.headers["x-zen-password"];
    
    var message = formatter.format("Authenticate", email, password);
    var authentication = sender.send(message);
    
    response.send(statusCodes.OK, {
        authentication: authentication
    });
};
