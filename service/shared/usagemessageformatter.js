var _ = require("underscore");

var TEMPLATE = [
    '<soap:Envelope',
        ' xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"',
        ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
        ' xmlns:xsd="http://www.w3.org/2001/XMLSchema"',
        ' xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing"',
        ' xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"',
        ' xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">',
        '<soap:Header>',
            '<wsa:Action>https://webservices.zen.co.uk/broadbandstatistics/__action__</wsa:Action>',
            '<wsa:MessageID>urn:uuid:97fbd859-2a6e-4bc1-b201-92accf4828c3</wsa:MessageID>',
            '<wsa:ReplyTo>',
                '<wsa:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</wsa:Address>',
            '</wsa:ReplyTo>',
            '<wsa:To>https://webservices.zen.co.uk/broadband/v3.11/serviceengine.asmx</wsa:To>',
            '<wsse:Security soap:mustUnderstand="1">',
                '<wsse:UsernameToken wsu:Id="SecurityToken-3e12170e-c6b4-4546-bde6-d6fbfd00cc10">',
                    '<wsse:Username>__username__</wsse:Username>',
                    '<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">__password__</wsse:Password>',
                '</wsse:UsernameToken>',
            '</wsse:Security>',
        '</soap:Header>',
        '<soap:Body>',
            '<__action__ xmlns="https://webservices.zen.co.uk/broadband/v3.11/">',
            '<username>__username__</username>',
            '<password>__password__</password>',
            '__body__',
            '</__action__>',
        '</soap:Body>',
    '</soap:Envelope>'
];

var _createTemplate = function() {
    return TEMPLATE.join("");
};

var _escapeXml = function(value) {
    return value;
};

var _makeKeyValuePair = function(key, value) {
    var pre = "<" + key + ">";
    var post = "</" + key + ">";

    return pre + _escapeXml(value) + post;
};

var _formatBody = function(email, password, params) {
    var body = "";

    if (_.isObject(params)) {
        var extendedParams = _.clone(params);

        _.extend(extendedParams, {
            email: email,
            password: password              
        });

        _.each(extendedParams, function(value, key) {
            if (_.isArray(value)) {

            } else {
                body += _makeKeyValuePair(key, value);;
            }
        }); 
    }

    return body;
};

exports.format = function(action, email, password, params) {
    var template = _createTemplate();
    var body = _formatBody(email, password, params);

    var message = template
        .replace(/__action__/mgi, action)
        .replace(/__username__/mgi, _escapeXml(email))
        .replace(/__password__/mgi, _escapeXml(password))
        .replace(/__body__/mgi, body);
    
    return message;
};
