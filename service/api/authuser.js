var formatter = require("../shared/usagemessageformatter");
var sender = require("../shared/usageMessagesender");

exports.get = function(request, response) {
    var email = request.headers["x-zen-email"];
    var password = request.headers["x-zen-password"];
    
    var message = formatter.format("Authenticate", email, password);
    
    console.log(message);
    
    sender.send(message, function(error, data, body) {
        var statusCode = error ? statusCodes.OK : statusCodes.INTERNAL_SERVER_ERROR;
        
        response.send(statusCode, {
            error: error,
            data: data,
            body: body
        });                
    });
};
