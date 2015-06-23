'use strict';

var app = require('./app.js');
var port = process.env.PORT || 8000;

app.listen(port, function(err){
  if(err){
    return err;
  }
  console.log('Tango server started on port %s',port);
});
