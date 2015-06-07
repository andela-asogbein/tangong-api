'use strict';

var app = require('./app.js');

app.listen(process.env.PORT || 8000, function(err){
  if(err){
    console.log(err);
  }
  console.log('Tango server started on port 8000');
});
