var formatter = require("../shared/usageMessageFormatter");

exports.get = function(request, response) {
    // response.send({ message : 'Hello World!' });
    
    console.log("Headers: %j", request.headers);
    
    response.send(statusCodes.OK, {
        message: formatter.format("ACTION", "EMAIL", "PASSWORD"),
        headers: request.headers
    });
};
