/**
 * Created by hartleyrobertson on 28/09/2015.
 */

var joi = require('joi');
var config = require('../config');
var kong = require('../lib/kong');

exports.register = function(server, options, next) {
    server.route({
        method: 'GET',
        path: '/consumer/',
        config: {
            plugins: {
                'hapi-swaggered': {
                    operationId: 'get-consumers'
                }
            },
            description: 'Get consumer list',
            tags: ['api'],
            notes: 'Get Consumer list'
        },
        handler: function(req, reply) {
          
          kong.getkeys(function (err, body){
            if (err) return reply(err);

            return reply(body);
          });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'get-consumers',
    version: '0.0.1'
};
