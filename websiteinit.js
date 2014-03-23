var express = require('express');

var app = express();
app.set('title', 'Cribbage Online');

// app.use(express.logger());
app.use(express.static(__dirname + "/res"));

// app.get('/express_running', function(req, res){
// 	res.send('<h3> CRIBBAGE HERE </h3>')
// });

app.listen(3000);