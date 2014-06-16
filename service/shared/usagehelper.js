var _ = require("underscore");

exports.resolve = function(obj, path) {
    _.each(path, function(key) {
        if (obj && obj.hasOwnProperty(key)) {
            obj = obj[key];
        } else {
            return undefined;
        }
    });

    return obj;
};
