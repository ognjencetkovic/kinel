var crypto = require('crypto');
var settings = require('../config/settings');

var genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') 
        .slice(0, length); 
};
var sha512 = function (password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

exports.saltHashPassword = function (password) {
    var salt = genRandomString(settings.saltLength);
    var passwordData = sha512(password, salt);
    return passwordData;
};

exports.validatePassword = function (password, salt, hash) {
    var passwordData = sha512(password, salt);
    return passwordData.passwordHash === hash;
}