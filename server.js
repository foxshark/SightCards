var express = require('express');
var less = require('less');
 
var app = express();
var router = express.Router();
//var scratchpad = require('./scratchpad');
var path = __dirname + '/views/';

app.set('views', './views');
app.set('view engine', 'jade');


app.get('/', function(req, res) {
	res.render('game_base', {
		title: 'Welcome'
	});
  
});

app.use(express.static(__dirname + '/public'));
 
app.listen(8080,function(){
  console.log("Live at Port 8080");
});