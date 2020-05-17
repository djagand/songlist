var path = require('path');
var express = require('express');
var express_graphql = require('express-graphql');
var graphqlConfig = require('./graphqlConfig');
var slashes = require('connect-slashes');
var cors = require('cors');

var STATIC_DIR = path.join(__dirname, '../client/build');

module.exports = function createApp(options) {
    var app = express();
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.static(STATIC_DIR));
    app.use(slashes(false));
    app.use(cors());
    app.use('/graphql', express_graphql(graphqlConfig));

    return app;
};