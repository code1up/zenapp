var _ = require("underscore");

export.resolve = function(obj, keys) {
    _.each(keys, function(key) {
        if (obj && obj.hasOwnProperty(key)) {
            obj = obj[key];
        } else {
            return undefined;
        }
    });

    return obj;
};
