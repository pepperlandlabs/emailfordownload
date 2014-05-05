var Hapi = require('hapi');
var config = require('../config/development');
var User = require('../db/models/users');
var LocalStrategy = require('passport-local').Strategy;
var Passport;

var loginRoutes = {

    index: {
        handler: function (request, reply) {
            reply.view('user/login.html', {
                title: 'Log In',
                user: request.user
            });
        }
    },
    post: {
        validate: {
            payload: {
                username: Hapi.types.String(),
                password: Hapi.types.String()
            }
        },
        auth: false,
        handler: function (request, reply) {

            Passport.authenticate('local', {
                successRedirect: config.urls.successRedirect,
                failureRedirect: config.urls.failureRedirect,
                failureFlash: true
            })(request, reply)
        }
    },
    setupPassport: function(server){
        Passport = server.plugins.travelogue.passport;

        Passport.use(new LocalStrategy(function (username, password, done) {

            User.find(username, password, function(resp){
                return done(null, resp.dataValues);
            },
            function(err){
                return done(null, false, err);
            });

        }));

        Passport.serializeUser(function (user, done) {
            done(null, user);
        });

        Passport.deserializeUser(function (obj, done){
            done(null, obj);
        });
    }
};


module.exports = loginRoutes;
