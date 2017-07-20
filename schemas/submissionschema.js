var mongoose = require('mongoose');
var validator = require('validator')
var Schema = mongoose.Schema;


// create a schema
var submissionSchema = new Schema({
  email: {
        type: String,
        validate: {
          validator: function(e) {
            return validator.isEmail(e);
          },
          message: '{VALUE} is not a valid email!'
        },
        required: [true, 'Email required']
      },

  sc_link: {
        type: String,
        validate: {
          validator: function(sc) {
            return validator.isURL(sc) && sc.includes('soundcloud');
          },
          message: '{VALUE} is not a valid soundcloud link!'
        },
        required: [true, 'Soundcloud link required']
      },
  reviewed:{type:Boolean, default:false},
  message: String
});

// the schema is useless so far
// we need to create a model using it

// make this available to our users in our Node applications
module.exports = submissionSchema;