var formatter = require("../shared/usageMessageFormatter");

exports.get = function(request, response) {
    var email = request.headers["x-zen-email"];
    var password = request.headers["x-zen-password"];
    
    var message = formatter.format("Authenticate", email, password);
    
    response.send(statusCodes.OK, {
        message: message
    });
};
