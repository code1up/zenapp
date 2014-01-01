var _ = require("underscore");
var xml2js = require("xml2js");

var _logParserResult = function(error, soapResponse) {
    console.log("parseSoapResponse::result: %j", {
        error: error,
        soapResponse: soapResponse
    });
};

var _handleParserResult = function(error, soapResponse, callback) {

    _logParserResult(error, soapResponse);

    if (error) {
        callback({
            message: "SOAP parser error.",
            internalError: error
        });

        return;    
    }

    var envelope = soapResponse["soap:Envelope"];

    if (!envelope) {
        callback({
            message: "Missing SOAP envelope."
        });

        return;   
    }

    var body = envelope["soap:Body"];

    if (!body) {
        callback({
            message: "Missing SOAP body."
        });

        return;   
    }

    callback(null, {
        envelope: _.clone(envelope),
        body: _.clone(body)
    });
};

exports.parse = function(soapResponseString, callback) {
    var options = {
        explicitArray: false
    };

    var parser = new xml2js.Parser(options);

    parser.parseString(soapResponseString, function(error, soapResponse) {
        _handleParserResult(error, soapResponse, callback);
    });
};
