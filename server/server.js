var express = require('express');
path = require('path');
var port = process.env.PORT || 8080;

var app = express();
app.use(express.static(__dirname + '/../client'));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

app.listen(port);
console.log('Server listening on ' + port);

module.exports = app;
