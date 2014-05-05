var dashboardRoutes = {

    index: {
        handler: function (request, reply) {
            reply.view('dashboard/index.html', {
                title: 'Dashboard'
            });
        }
    }

};

module.exports = dashboardRoutes;
