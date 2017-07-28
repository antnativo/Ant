const Hapi = require('hapi'),
  server = new Hapi.Server(),
  handerFileRequest = (request, reply) => reply.file('./build/' + request.url.path),
  handerFileRequestBuildDir = (request, reply) => {
    let newRequest = request;
    newRequest.url.path = "../build/".concat(newRequest.url.path);
    handerFileRequest(newRequest, reply);
  };
server.connection({ host: 'localhost', port: 8089 });
server.register(require('inert'), (err) => {
  if (err)
    throw err;
  server.route({
    method: 'GET',
    path: '/build/{filename}',
    handler: (request, reply) => {
        //console.log(/build/' + decodeURIComponent(request.params.filename))
        reply.file( '.build/' + decodeURIComponent(request.params.filename))
    }
  });
});
server.register(require('inert'), (err) => {
  if (err)
    throw err;
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.file('./tests/index.html');
    }
  });
});

module.exports = server;