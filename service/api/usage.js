var formatter = require("../shared/usageMessageFormatter");

exports.get = function(request, response) {
    // response.send({ message : 'Hello World!' });
    
    console.log("Email: %s", request.headers["x-zen-email"]);
    console.log("Password: %s", request.headers["x-zen-password"]);
    
    response.send(statusCodes.OK, {
        message: formatter.format("ACTION", "EMAIL", "PASSWORD")
    });
};
