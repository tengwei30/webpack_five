const path = require("path");

module.exports = {
    dev: {
        env: require('./dev.env'),
        port: 3000,
        // assetsSubDirectory: '/',
        assetsPublicPath: '/',
        host: 'localhost',
        proxyTable: {},
    },
    build: {
        env: require('./prod.env'),
    }
}
