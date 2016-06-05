var insertKeyframesRule;
try {
    insertKeyframesRule = require('domkit/insertKeyframesRule');
} catch (x) { }
module.exports = function () {
    try {
        return insertKeyframesRule.apply(null, arguments);
    } catch (x) {
        return {};
    }
}