var passport = require('passport');
var url = require('url');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config');
var users = require('users.controller');

module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: '1104144112934466',
    clientSecret: 'eff6688475a13c585563c6a037132de5',
    callbackURL: 'http://localhost:8000/oauth/facebook/callback',
    passReqToCallback: true
  },

  function(req, accessToken, refreshToken, profile, done) {
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;

    var providerUserProfile = {
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    fullName: profile.displayName,
    email: profile.emails[0].value,
    username: profile.username,
    provider: 'facebook',
    providerId: profile.id,
    providerData: providerData
    };

    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
};
