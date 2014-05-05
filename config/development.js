var config = {
    "hostname": "localhost",
    "port": 4200,
    "urls": {
        "successRedirect": "/",
        "failureRedirect": "/log-in"
    },
    "excludePaths": ["/public/"]
}

module.exports = config;