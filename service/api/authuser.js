var formatter = require("../shared/usagemessageformatter");
var sender = require("../shared/usagemessagesender");
var parser = require("../shared/usagemessageparser");

exports.get = function(request, response) {
    var email = request.headers["x-zen-email"];
    var password = request.headers["x-zen-password"];
    
    var soapRequestString = formatter.format("Authenticate", email, password);
    
    sender.send(soapRequestString, function(error, soapResponseString) {
        if (error) {
            response.send(error.statusCode, {
                error: error
            });

            return;
        };
        
        parser.parse(soapResponseString, function(error, soapResponse) {
            if (error) {
                response.send(statusCodes.INTERNAL_SERVER_ERROR, {
                    error: error
                });

                return;
            };

            try {
                var token = soapResponse.body.AuthenticatResponse.AuthenticateResul;

                response.send(statusCodes.OK, {
                    email: email,
                    token: token
                });            
            }
            catch (e) {
                response.send(statusCodes.INTERNAL_SERVER_ERROR, {
                    error: {
                        message: "Missing authentication token.",
                        internalError: e
                    }
                });
            }
        });
    });
};
