var appendVendorPrefix = require('domkit/appendVendorPrefix');
module.exports = function (obj) {
    try {
        return appendVendorPrefix.apply(null, arguments);
    } catch (x) {
        return obj;
    }
};