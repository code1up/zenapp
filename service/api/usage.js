var formatter = require("../shared/usageMessageFormatter");

exports.get = function(request, response) {
    // response.send({ message : 'Hello World!' });
    
    console.dir("Headers: %j", request.headers);
    
    response.send(statusCodes.OK, {
        message: formatter.format("ACTION", "EMAIL", "PASSWORD")
    });
};
