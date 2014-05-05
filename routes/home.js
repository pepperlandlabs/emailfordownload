var homeRoutes = {

    index: {
        handler: function (request, reply) {
            reply.view('home.html', {
                title: 'Home',
                user: request.user
            });
        }
    }

};

module.exports = homeRoutes;
