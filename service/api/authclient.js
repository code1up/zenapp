var credentialsParser = require("../shared/credentialsparser");
var credentials = require("../shared/credentials");
var usageActions = require("../shared/usageactions");
var usageHelper = require("../shared/usagehelper");
var usageMessage = require("../shared/usagemessage");

var VERSION = "0.1";
var CLIENT_NAME = "ZenPlex";
var IS_BETA = true;

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
            "AuthenticateResult",
            "ValidateClientResponse",
            "ValidateClientResult"];
        
        var token = usageHelper.resolve(soapResponse, path);

        if (!token) {
            response.send(statusCodes.INTERNAL_SERVER_ERROR, {
                error: {
                    message: "Missing authentication token."
                }
            });

            return;
        }

        response.send(statusCodes.OK, {
            token: token
        });            
    };

    credentialsParser.parse(request.headers, credentials.USER, function(error, credentials) {
        if (error) {
            response.send(statusCodes.BAD_REQUEST, error);
            return;
        }

        var params = {
            AuthenticationGUID: credentials.userAuthenticationToken,
            ClientVersion: VERSION,
            ClientName: CLIENT_NAME,
            ClientIsBeta: IS_BETA
        };

        usageMessage.send(usageActions.VALIDATE_CLIENT, credentials, params, handler);
    });
};
