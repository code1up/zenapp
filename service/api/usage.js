var authuser = require("./authuser");
var authclient = require("./authclient");

exports.get = function(request, response) {
    response.send(statusCodes.BAD_REQUEST);
};
