var EMAIL = "x-zen-email";
var PASSWORD = "x-zen-password";

exports.parse = function(headers, callback) {
    var email = headers[EMAIL];
    var password = headers[PASSWORD];

    if (!(email && password)) {
        callback({
            message: "Missing email or password."
        });
    }

    callback(null, {
        email: email,
        password: password
    });
};
