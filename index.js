var fs = require('fs')
var http = require('http')
var mime = require('lighter-mime')
var port = 8888
var dir = __dirname

http.createServer(serve).listen(port)

function serve (request, response) {
  var url = request.url
  if (url === '/' || url === '/index.js') {
    url = '/index.html'
  }
  var path = dir + url
  fs.readFile(path, function (error, content) {
    if (error) {
      response.statusCode = 404
      request.url = '/404.html'
      return serve(request, response)
    }
    var extension = path.replace(/^.*\./, '')
    response.setHeader('Content-Type', mime[extension])
    response.end(content)
  })
}
