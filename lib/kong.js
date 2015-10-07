var boom = require('boom');
var request = require('request');
var config = require('../config');
var kong = module.exports = {}

kong.createKey = function (user, cb){
  var opt = {
    uri: config.get('kong.domain') + '/consumers/',
    method: 'POST',
    json: true,
    body: {
      username: user
    },
    timeout: 400,
    maxAttempts: 1
  }
  request(opt, function(error, response, body){

    if (!error && response && response.statusCode == 201){
      
      opt = {
        uri: config.get('kong.domain') + '/consumers/' + user + '/key-auth',
        method: 'POST',
        json: true, 
        timeout: 400,
        maxAttempts: 1
      } 

      request(opt, function(error, response, body){

        if (!error && response &&  response.statusCode == 201){
          body.username = user;
          return cb(null, body);
        }

        return cb(boom.wrap(new Error('Error on getting keys'), response.statusCode ));
      }) 
      
      return 
    } 
    return cb(boom.wrap(new Error('Error on creating consumer'), response.statusCode ));
  })
}

kong.getkey = function(user, cb){

  if (!user){
    return cb(boom.wrap(new Error('Empty user'), 400 ));
  }  

  var opt = {
    uri: config.get('kong.domain') + '/consumers/' + user,
    method: 'GET',
    timeout: 400,
    maxAttempts: 1
  }

  request(opt, function(error, response, body){

    if (error || !response.statusCode == 200){
      return cb(boom.wrap(new Error('Error on getting user key'), response.statusCode ));
    }
    return cb(null, body);
  }) 
}

kong.delkey = function(user, cb){

  if (!user){
    return cb(boom.wrap(new Error('Empty user'), 400 ));
  }  
  
  var opt = {
    uri: config.get('kong.domain') + '/consumers/' + user,
    method: 'DELETE',
    timeout: 400,
    maxAttempts: 1
  }

  request(opt, function(error, response, body){

    if (error || !response.statusCode == 204){
      return cb(boom.wrap(new Error('Error on deleting user'), response.statusCode ));
    }
    return cb(null);
  }) 
}

kong.getkeys = function(cb){
  
  var opt = {
    uri: config.get('kong.domain') + '/consumers/',
    method: 'GET',
    timeout: 400,
    maxAttempts: 1
  }

  request(opt, function(error, response, body){

    if (error || !response.statusCode == 200){
      return cb(boom.wrap(new Error('Error on getting users'), response.statusCode ));
    }
    return cb(null, JSON.parse(body));
  }) 
}
