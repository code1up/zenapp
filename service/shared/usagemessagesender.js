var request = require("request");

var URL = "https://webservices.zen.co.uk/broadband/v3.11/serviceengine.asmx";

var HEADERS = {
    "content-type": 'text/xml; charset="utf-8"'
};

var _logSoapResponse = function(error, body) {
    console.log("usagemessagesender::response: %j: ", {
        error: error,
        body: body
    });
};

var _handleSoapResponse = function(error, data, body, callback) {
    _logSoapResponse(error, body);

    if (error) {
        callback({
            statusCode: statusCodes.INTERNAL_SERVER_ERROR,
            message: "HTTP request error.",
            internalError: error
        });

        return;
    }

    if (!data || !data.statusCode) {
        callback({
            statusCode: statusCodes.NO_CONTENT,
            message: "Missing data or HTTP status code."
        });

        return;   
    }

    statusCode = data.statusCode;

    if (statusCode !== 200) {
        callback({
            statusCode: statusCode,
            message: "HTTP status code " + data.statusCode + " received."
        });

        return;   
    }

    if (!body) {
        callback({
            statusCode: statusCodes.NO_CONTENT,
            message: "Missing body."
        });

        return;   
    }

    callback(null, body);
};

exports.send = function(soapRequest, callback) {
    var httpRequest = {
        url: URL,
        headers: HEADERS,
        body: soapRequest
    };

    request.post(httpRequest, function(error, data, body) {
        _handleSoapResponse(error, data, body, callback);
    });
};
