var home = require('./home');
var dashboard = require('./dashboard');
var signup = require('./signup');
var login = require('./login');

function allRoutes(server){

    login.setupPassport(server);
    signup.setupPassport(server);

    server.route ([

        /** Full Pages **/

        { method: 'GET', path: '/', config: home.index },
        { method: 'GET', path: '/dashboard', config: dashboard.index },
        { method: 'GET', path: '/log-in', config: login.index },
        { method: 'GET', path: '/sign-up', config: signup.index },

        /** POSTs **/
        
        { method: 'POST', path: '/log-in', config: login.post},
        { method: 'POST', path: '/sign-up', config: signup.post },

        /** Ajax GETs **/        


        /** Assets **/

        {
            method: 'GET',
            path: '/{path*}',
            handler: {
                directory: { path: ['./public', './components'], listing: false, index: true }
            }
        },

        /** 404 **/

        { 
            method: '*', 
            path: '/{p*}', 
            handler:  function(request,reply){ reply('The page was not found').code(404) }
        }

    ]);

}

module.exports = allRoutes;

