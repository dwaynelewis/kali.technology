var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) => {

});

app.listen(1800, function () {
  console.log('App listening on port 1800!')
});
