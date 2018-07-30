var EMAIL='connectedsubmissions@gmail.com';
var STAFF='carlos_balladares@outlook.com'+','+STAFF+','+ 'connectedsoundsncs@gmail.com';
var SUBJECT='connected sounds submission';

var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'connectedsubmissions@gmail.com',
    pass: '?'
  }
});

 

var sendEmail=function(submission){
	var mailOptions = {
	  from: EMAIL,
	  to: STAFF,
	  subject: SUBJECT,
	  text: "New submission by:\n"+submission.email +"\nSoundcloud link"+ submission.sc_link+ "\n Message(may be empty):" + submission.message
	};


	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});

}
exports.sendEmail=sendEmail;
