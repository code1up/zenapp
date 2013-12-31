var formatter = require("../shared/usageMessageFormatter");

exports.get = function(request, response) {
    // response.send(statusCodes.OK, { message : 'Hello World!' });
    
    console.dir(request.headers);
    
    response.send({
        message: formatter.format("ACTION", "EMAIL", "PASSWORD")
    });
};
