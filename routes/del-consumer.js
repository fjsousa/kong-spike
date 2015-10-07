/**
 * Created by hartleyrobertson on 28/09/2015.
 */

var joi = require('joi');
var config = require('../config');
var kong = require('../lib/kong')

exports.register = function(server, options, next) {
    server.route({
        method: 'DELETE',
        path: '/consumer/{username}',
        config: {
            plugins: {
                'hapi-swaggered': {
                    operationId: 'del-consumer'
                }
            },
            description: 'delete consumer data',
            tags: ['api'],
            notes: 'delete Consumer data',
            validate: {
                params: joi.object({
                  username: joi.string().required().description('consumer username or id'),
                })
            }
        },
        handler: function(req, reply) {
          
          kong.delkey(req.params.username, function (err){
            if (err) return reply(err);

            return reply();
          });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'del-consumer',
    version: '0.0.1'
};
