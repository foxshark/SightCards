var express = require('express');
 
var app = express();
var router = express.Router();
//var scratchpad = require('./scratchpad');
var path = __dirname + '/views/';

app.set('views', './views');
app.set('view engine', 'jade');


app.get('/', function(req, res) {
	res.render('home', {
		title: 'Welcome'
	});
  
});

app.use(express.static(__dirname + '/public'));
 
app.listen(3000,function(){
  console.log("Live at Port 3000");
});