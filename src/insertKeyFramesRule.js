var insertKeyframesRule = require('domkit/insertKeyframesRule');
module.exports = function () {
    try {
        return insertKeyframesRule.apply(null, arguments);
    } catch (x) {
        return {};
    }
}