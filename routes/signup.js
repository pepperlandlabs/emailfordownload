var Hapi = require('hapi');
var config = require('../config/development');
var User = require('../db/models/users');
var Passport;

var signUpRoutes = {

    index: {
        handler: function (request, reply) {
            reply.view('user/signUp.html', {
                title: 'Sign Up',
                user: request.user
            });
        }
    },
    post: {
        validate: {
            payload: {
                email: Hapi.types.String(),
                username: Hapi.types.String(),
                password: Hapi.types.String()
            }
        },
        pre: [{ method: saveUser, assign: 'user' }],
        handler: function(request, reply) {
            //TODO: Handle user created but passport failure
            // Realistically should never happen

            Passport.authenticate('local', {
                successRedirect: config.urls.successRedirect,
                failureRedirect: config.urls.failureRedirect,
                failureFlash: true
            })(request, reply)
        }
    },
    setupPassport: function(server){
        Passport = server.plugins.travelogue.passport;
    }

};

function saveUser(request, reply){
    var u = request.payload;
    var user = new User(u.username, u.password, u.email);

    user.save(function(resp){
        reply(resp.dataValues);
    },
    //TODO: Add better error codes
    function(err){
        console.log(err);
        console.log("NO");
    });
};

module.exports = signUpRoutes;
