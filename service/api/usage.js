var formatter = require("../shared/usageMessageFormatter");

exports.get = function(request, response) {
    var email = request.headers["x-zen-email"];
    var password = request.headers["x-zen-password"];
    
    response.send(statusCodes.OK, {
        message: formatter.format("ACTION", "EMAIL", "PASSWORD")
    });
};
