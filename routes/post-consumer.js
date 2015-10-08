/**
 * Created by hartleyrobertson on 28/09/2015.
 */

var joi = require('joi');
var config = require('../config');
var kong = require('../lib/kong');
var rule = require('../util/username');

exports.register = function(server, options, next) {
    server.route({
        method: 'POST',
        path: '/consumer',
        config: {
            plugins: {
                'hapi-swaggered': {
                    operationId: 'post-consumer'
                }
            },
            description: 'Create consumer',
            tags: ['api'],
            notes: 'Create consumer',
            validate: {
                payload: joi.object({
                  username: joi.string().regex(rule).required().description('consumer username'),//needs regex
                })
            }
        },
        handler: function(req, reply) {
          
          kong.createKey(req.payload.username, function (err, body){
            if (err) return reply(err);

            return reply(body);
          });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'post-consumer',
    version: '0.0.1'
};
