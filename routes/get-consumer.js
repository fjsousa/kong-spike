/**
 * Created by hartleyrobertson on 28/09/2015.
 */

var joi = require('joi');
var config = require('../config');
var kong = require('../lib/kong')
var rule = require('../util/username');

exports.register = function(server, options, next) {
    server.route({
        method: 'GET',
        path: '/consumer/{username}',
        config: {
            plugins: {
                'hapi-swaggered': {
                    operationId: 'get-consumer'
                }
            },
            description: 'Get consumer data',
            tags: ['api'],
            notes: 'Get Consumer data',
            validate: {
                params: joi.object({
                  username: joi.string().regex(rule).required().description('consumer username or id'),
                })
            }
        },
        handler: function(req, reply) {
          
          kong.getkey(req.params.username, function (err, body){
            if (err) return reply(err);

            return reply(body);
          });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'get-consumer',
    version: '0.0.1'
};
