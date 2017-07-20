
$( document ).ready(function() {
		    console.log( "ready!" );


		    (function($){
		  $(function(){

		    $('.button-collapse').sideNav();
		    $('.parallax').parallax();




		   	$('form').on('submit', function (e) {
		  		 //ajax call here
		  		 e.preventDefault();

		  		 var email = 	$('#email').val();
		  		 var sc_link = 	$('#soundcloud_link').val();
		  		 var message = 	$('#message').val();

		  		 var serial = $(this).serialize();

		  		 var submission={
		  		 	email:email,
		  		 	sc_link:sc_link,
		  		 	message:message
		  		 }

		  		$.ajax({
					  type: "POST",
					  url: "/submission",
					  data: submission,
					  success: function(){
					  		Materialize.toast('Your submission was a success,Thanks for submitting', 4000);
					  		$('#email').val("");
		  					$('#soundcloud_link').val("");
		  					$('#message').val("");
						});

					  },
					  error: function(XMLHttpRequest, textStatus, errorThrown) { 
        					Materialize.toast("Error, please make sure your email and SC link are valid"); 
    					},
					  dataType: "JSON"
					});

		  		console.log(submission);

				Materialize.toast('Sending', 4000);
		  		 
		   		//stop form submission
		   		//e.preventDefault();

		   		



		  }); // end of document ready


		})(jQuery); // end of jQuery name space
});





 // function submit(){
 //          var form = $('#demoform').formSerialize(); 
 //          console.log('hello')
 //          console.log(form)

 //    }
