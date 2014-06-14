var headerNames = {
    EMAIL: "x-zen-email",
    PASSWORD: "x-zen-password",
    USER_AUTHENTICATION_TOKEN: "x-zen-user-authentication-token",
    CLIENT_VALIDATION_TOKEN: "x-zen-client-validation-token"
};

exports.parse = function(headers, prereqs, callback) {
    var email = headers[headerNames.EMAIL];
    var password = headers[headerNames.PASSWORD];

    if (!(email && password)) {
        callback({
            message: "Missing email or password."
        });

        return;
    }

    prereqs = prereqs || credentials.NONE;

    var userAuthenticationToken = headers[headerNames.USER_AUTHENTICATION_TOKEN];

    if ((prereqs & credentials.USER_AUTHENTICATION_TOKEN) !== 0 &&
        !userAuthenticationToken) {
        callback({
            message: "Missing user authentication token."
        });

        return;
    }

    var clientValidationToken = headers[headerNames.CLIENT_VALIDATION_TOKEN];

    if ((prereqs & credentials.CLIENT_VALIDATION_TOKEN) !== 0 &&
        !clientValidationToken) {
        callback({
            message: "Missing client validation token."
        });

        return;
    }

    callback(null, {
        email: email,
        password: password,
        userAuthenticationToken: userAuthenticationToken,
        clientValidationToken: clientValidationToken
    });
};
