var Hapi = require('hapi');
var config = require('./config/development');

// Hapi configuration
var options = {
    views: {
        path: __dirname + '/templates',
        engines: {
            html: 'handlebars'
        },
        layout: true,
        partialsPath: __dirname + '/templates/partials'
    }
};

var plugins = {
    yar: {
        cookieOptions: {
            password: "teeheewidgets!",
            isSecure: false
        }
    },
    travelogue: config
}

//TODO: Move file
var tmplHelpers = require('./templates/helpers');

// Create a server with a host and port
var server = Hapi.createServer(config.hostname, config.port, options);

server.pack.require(plugins, function (err) {
    if (err) {
        throw err;
    }
});

server.auth.strategy('passport', 'passport');

//TODO: Change to server.routes
var routes = require('./routes')(server);

// Start the server
server.start(function(){
    //TODO: Implement custom logger
    console.log('Server started at: ' + server.info.uri);    
});

