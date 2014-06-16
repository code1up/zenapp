var authuser = require("./authuser");
var authclient = require("./authclient");

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
            "broadbandAccounts",
            "GetAndValidateAuthorisedBroadbandAccountsResponse",
            "GetAndValidateAuthorisedBroadbandAccountsResult"
        ];
        
        var broadbandAccounts = usageHelper.resolve(soapResponse, path);

        if (!broadbandAccounts) {
            response.send(statusCodes.INTERNAL_SERVER_ERROR, {
                error: {
                    message: "Missing broadband accounts."
                }
            });

            return;
        }

        response.send(statusCodes.OK, {
            broadbandAccounts: broadbandAccounts
        });            
    };

    var prereqs =
        credentials.USER_AUTHENTICATION_TOKEN |
        credentials.CLIENT_VALIDATION_TOKEN;

    credentialsParser.parse(request.headers, prereqs, function(error, credentials) {
        if (error) {
            response.send(statusCodes.BAD_REQUEST, error);
            return;
        }

        var params = {
            AuthenticationGUID: credentials.userAuthenticationToken,
            ClientValidationGUID: credentials.clientValidationToken
        };

        usageMessage.send(
            usageActions.GET_AND_VALIDATE_AUTHORISED_BROADBAND_ACCOUNTS,
            credentials,
            params,
            handler);
    });
};
