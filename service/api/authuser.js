var usageHelper = require("../shared/usagehelper");
var usageActions = require("../shared/usageactions");
var credentialsParser = require("../shared/credentialsParser");

var handler = function(error, soapResponse) {
    if (error) {
        var statusCode = error.statusCode || statusCodes.INTERNAL_SERVER_ERROR;

        response.send(statusCode, error);
        return;
    }
    
    var token = usageHelper.resolve(soapResponse, [
        "body", "AuthenticateResponse", "AuthenticateResult"
    ]);

    if (!token) {
        response.send(statusCodes.INTERNAL_SERVER_ERROR, {
            error: {
                message: "Missing authentication token."
            }
        });

        return;
    }

    response.send(statusCodes.OK, {
        email: email,
        token: token
    });            
};

exports.get = function(request, response) {
    credentialsParser.parse(request.headers, function(error, credentials) {
        if (error) {
            response.send(statusCodes.BAD_REQUEST, error);
            return;
        }

        usageMessage.send(usageActions.AUTHENTICATE, credentials, handler);
    });
};
