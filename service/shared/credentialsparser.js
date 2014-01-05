var EMAIL = "x-zen-email";
var PASSWORD = "x-zen-password";

exports.parse = function(headers, handler) {
    var email = headers[EMAIL];
    var password = headers[PASSWORD];

    if (!(email && password)) {
        handler({
            message: "Missing email or password."
        });
    }

    handler(null, {
        email: email,
        password: password
    });
};
