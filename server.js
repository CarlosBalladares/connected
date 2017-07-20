//Constants
var DEVDB='mongodb://localhost:27017/connected';
var REALDB="mongodb://connectedstaff:connected11235@ds111103.mlab.com:11103/connected"



//Modules and initializaitions
var express = require('express');
var bodyParser=require('body-parser');
var app = express();
var http=require('http').Server(app);
var mongoose = require('mongoose');
var submissionSchema = require('./schemas/submissionschema.js');
var sanitize = require("mongo-sanitize");
var json = require("body-parser").json;
var restResponse = require('express-rest-response');
var router = express.Router(); 
var mailer= require('./mailer.js');


var options = {
  showStatusCode: true,  
  showDefaultMessage: true  
};


var dboptions = { 
  server: { 
    socketOptions: { 
      keepAlive: 300000, connectTimeoutMS: 30000 
    } 
  }, 
  replset: { 
    socketOptions: { 
      keepAlive: 300000, 
      connectTimeoutMS : 30000 
    } 
  } 
};

// create connection to db

//var DB =(process.env.NODE_ENV)? DEVDB:REALDB;
var DB =DEVDB;

console.log(DB+' environment')



var db =mongoose.createConnection(DB);

var Submission=db.model('Submission', submissionSchema);

process.on('exit',function(){
    db.close();
});

db.on('error', function(err){
    console.log(err);
});

db.on('connected', function(){
	console.log('app connected')
})

db.on('disconnected', function(){
	console.log('app disconnected')
})

//setup express app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(restResponse(options));

app.use(express.static('public'))




// app.get('/', function (req, res) {
//   res.send('Hello World!')
// });


function processSubmission(req, res){
 	  req.body = sanitize(req.body);



	  var submission = new Submission(req.body);
	  submission.save(function(error){
	  	if(error){
	  		res.rest.badRequest(error.name+error.message);
	  	}else{
	  		res.rest.success();
	  		mailer.sendEmail(submission);

	  	}
	  });





}

app.post('/submission', processSubmission);

http.listen(8080, function () {
	console.log('Example app listening on port 8080!');	  
});