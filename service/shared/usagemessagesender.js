var _ = require("underscore");
var request = require("request");
var xml2js = require("xml2js");

var URL = "https://webservices.zen.co.uk/broadband/v3.11/serviceengine.asmx";

var HEADERS = {
    "content-type": 'text/xml; charset="utf-8"'
};

/*
var _handleResponse = function(error, data, body, callback) {
    data = data || {};

    var soapResponse = null;
    var statusCode = data.statusCode || -1;

    callback({
        error: error,
        statusCode: statusCode,
        soapResponse: soapResponse
    );
};
*/

exports.send = function(soapRequest, callback) {
    request.post({
        url: URL,
        headers: HEADERS,
        body: soapRequest
    }, function(error, data, body) {

        console.log("response: %j: ", {
            error: error,
            body: body
        });

        if (error) {
            callback(
                {
                    error: "A network error occurred, please check your Internet connection.",
                    internalError: error
                },
                data
            );
        } else if (!data || !data.statusCode) {
            callback(
                {
                    error: "No data or status code received."
                },
                data
            );
        } else if (data.statusCode !== 200) {
            callback(
                {
                    message: "Status code " + data.statusCode + " received."
                },
                data
            );
        } else {
            var options = {
                explicitArray: false
            };

            var parser = new xml2js.Parser(options);

            console.log(data.body);
            
            parser.parseString(data.body, function(error, json) {
                console.log("json: %j", json);

                var envelope = _.clone(json["soap:Envelope"]);
                var body = _.clone(envelope["soap:Body"]);

                var xxx = {
                    envelope: envelope,
                    body: body
                };

                console.log("xxx: %j", xxx);

                callback(null, xxx, null);
            });
        }
    });
}
