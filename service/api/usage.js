var _ = require("underscore");

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
        
        var allowancePath = [
            "body",
            "GetUsageResponse",
            "GetUsageResult",
            "Statistic",
            "AdditionalDetails",
            "AllowanceDetails"
        ];
        
        var xxx = usageHelper.resolve(soapResponse, ["body"]);
        var allowance = usageHelper.resolve(soapResponse, allowancePath);

        if (!xxx) {
            response.send(statusCodes.INTERNAL_SERVER_ERROR, {
                error: {
                    message: "Missing xxx."
                }
            });

            return;
        }
        
        response.send(statusCodes.OK, {
            xxx: xxx,
            allowance: {
                monthly: allowance.MonthlyAllowance,
                bank: allowance.BankAllowance,
                regrade: allowance.RegradeAllowance,
                usage: allowance.UsageAllowance
            }
        });            
    };

    var prereqs =
        credentials.USER_AUTHENTICATION_TOKEN |
        credentials.CLIENT_VALIDATION_TOKEN;

    credentialsParser.parse(request.headers, prereqs, function (error, credentials) {
        if (error) {
            response.send(statusCodes.BAD_REQUEST, error);
            return;
        }

        var params = {
            AuthenticationGUID: credentials.userAuthenticationToken,
            ClientValidationGUID: credentials.clientValidationToken,
            adslAccounts: [
                "zen198738@zen"
            ],
            dateTimeFrom: "2014-06-14T00:00:00.0",
            dateTimeTo: "2014-06-15T00:00:00.0"
        };

        usageMessage.send(
            usageActions.GET_USAGE,
            credentials,
            params,
            handler);
    });
};
