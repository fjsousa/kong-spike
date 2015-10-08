/**
 * Created by hartleyrobertson on 24/09/2015.
 */

var Hapi = require('hapi'),
    h2o2 = require('h2o2'),
    inert = require('inert'),
    vision = require('vision'),
    config = require('./config'),
    server = new Hapi.Server(),
    hapiSwaggeredUi = require('hapi-swaggered-ui'),
    hapiSwaggered = require('hapi-swaggered');

var app = null;
var getConsumer = require('./routes/get-consumer');
var postConsumer = require('./routes/post-consumer');
var getConsumers = require('./routes/get-consumers');
var delConsumer = require('./routes/del-consumer');

server.connection({
    host: config.get('http.listen'),
    port: config.get('http.port'),
    labels: ['api'],
    routes: {
        cors: true
    }
});

// swagger
server.register({
    register: hapiSwaggered,
    options: {
        produces: ['application/json'],
        tags: {
            '/foobar': 'Example foobar description'
        },
        info: {
            title: 'auth.api.style.com',
            description: 'Style.com API auth server',
            version: '0.1'
        }
    }
}, {
    select: 'api',
    routes: {
        prefix: '/swagger'
    }
}, function(err) {
    if (err) {
        throw err
    }
});

// swagger ui browser client
server.register([
    h2o2,
    inert,
    vision,
    {
        register: hapiSwaggeredUi,
        options: {
            title: 'authserver',
            // swaggerEndpoint: '/swagger.json',
            swaggerOptions: {
                docExpansion: 'full'    
            }
            
        }
    }], {
    select: 'api'
}, function(err) {
    if (err) throw err;
});

// api
server.register([
    {
        register: delConsumer
    },
    {
        register: getConsumers
    },
    {
        register: getConsumer
    },
    {
        register: postConsumer
    }
], function(err) {
    if (err) throw err;
});

server.start(function () {
  console.log('info', 'server running at: ' + server.info.uri);
});
