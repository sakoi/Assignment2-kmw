var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

//Create Account Schema with oauthID and creation date
var AccountSchema = new mongoose.Schema({
    oauthID: String,
    created: Date
});

AccountSchema.plugin(plm);

module.exports = mongoose.model('Account', AccountSchema);