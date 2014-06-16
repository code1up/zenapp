var credentialsParser = require("../shared/credentialsparser");
var credentials = require("../shared/credentials");
var usageActions = require("../shared/usageactions");
var usageHelper = require("../shared/usagehelper");
var usageMessage = require("../shared/usagemessage");

exports.get = function(request, response) {

    var handler = function(error, soapResponse) {
        if (error) {
            var statusCode = error.statusCode || statusCodes.INTERNAL_SERVER_ERROR;

            response.send(statusCode, error);
            return;
        }
        
        var path = [
            "body",
            "AuthenticateResponse",
            "AuthenticateResult"
        ];
        
        var userAuthenticationToken = usageHelper.resolve(soapResponse, path);

        if (!userAuthenticationToken) {
            response.send(statusCodes.INTERNAL_SERVER_ERROR, {
                error: {
                    message: "Missing user authentication token."
                }
            });

            return;
        }

        response.send(statusCodes.OK, {
            userAuthenticationToken: userAuthenticationToken
        });            
    };

    credentialsParser.parse(request.headers, credentials.NONE, function(error, credentials) {
        if (error) {
            response.send(statusCodes.BAD_REQUEST, error);
            return;
        }

        usageMessage.send(usageActions.AUTHENTICATE, credentials, null, handler);
    });
};
