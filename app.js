
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', 8080);
app.set('s3', {
  key: "AKIAIOT26IBLBQQII4AA",
  secret: "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",
  bucket: "imglemon-storage"
});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/health', function (req, res) {
  res.send(200,"We good.");
});

var images = require('./routes/images');
app.post('/images/new', images.upload);
app.get('/images/view/:id/:size', images.view);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});