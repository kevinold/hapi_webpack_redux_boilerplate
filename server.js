'use strict';
var Hapi = require('hapi');
var Good = require('good');
var Joi = require('joi');
var path = require('path');
var fs = require('fs');
var HapiWebpackDevMiddleware = require('hapi-webpack-dev-middleware');
var HapiWebpackHotMiddleware = require('hapi-webpack-hot-middleware');
var WebpackConfig = require('./webpack.config.js');
var Vision = require('vision');

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var server = new Hapi.Server();

server.connection({port: parseInt(process.env.PORT, 10) || 3000, routes: { cors: true } });

var plugins = [
  Vision,
  {
    register: HapiWebpackDevMiddleware,
    options: {
      config: WebpackConfig,
      options: {
        noInfo: true,
        publicPath:  WebpackConfig.output.publicPath,
        historyApiFallback: true
      }
    }
  },
  {
    register: HapiWebpackHotMiddleware,
    options: {
      template: 'index',
      params: {
        env: process.env.NODE_ENV
      }
    }
  }
];

server.register(plugins, (err) => {

  if (err) {
    throw err;
  }
  server.views({
    engines: {
      html: require("swig")
    },
    path: path.resolve(__dirname + '/lib/views')
  });

});

server.register(require('inert'), (err) => {

  if (err) {
    throw err;
  }

  // Statically serve 'src' directory
  server.route({
    method: 'GET',
    path: '/{param*}',
    config: {
      auth: false,
      handler: {
        directory: {
          path: path.resolve(__dirname + '/public')
        }
      }
    }
  });

});

server.route({
  method: "GET",
  path: "/",
  handler: function(request, reply) {
    reply.view("index", { env: process.env.NODE_ENV });
  }
});

server.register({
  register: require('good'),
  options: {
    opsInterval: 1000,
    reporters: [{
      reporter: require('good-console'),
      events: {log: '*', request: '*', response: '*', error: '*', 'request-internal': '*'}
    }]
  }
}, function(err){
  if(err) {
    console.error(err);
  }

  // start the server only except for test runs
  if (process.env.NODE_ENV !== 'test') {
    server.start(function () {
      console.log('Server running at:', server.info.uri);
    });
  }
});

module.exports = server;

