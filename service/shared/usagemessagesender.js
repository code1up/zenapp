var xml2js = require("xml2js");

var URL = "https://webservices.zen.co.uk/broadband/v3.11/serviceengine.asmx";

var HEADERS = {
    "content-type": 'text/xml; charset="utf-8"'
};

exports.send = function(message, callback) {
    request.post({
        url: URL,
        headers: HEADERS,
        body: message
    }, function(error, data, body) {
        if (error) {
            callback(
                {
                    error: "A network error occurred, please check your Internet connection.",
                    internalError: error
                },
                data,
                body
            );
        }
        else if (!data || !data.statusCode) {
            callback(
                {
                    error: "No data or data status code received."
                },
                data,
                body
            );
        }
        else if (data.statusCode !== 200) {
            callback(
                {
                    error: "data code " + data.statusCode + " receieved."
                },
                data,
                body
            );
        }
        else {
            var parser = new xml2js.Parser();

            console.log(data.body);
            
            parser.parseString(data.body, function(error, json) {
                // console.log(json);
                var body = json["soap:Body"];

                callback(null, data, body);
            });
        }
    });
}
