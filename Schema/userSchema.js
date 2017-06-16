'use strict'; 

exports = module.exports = function(app, mongoose) {
  var userSchema = mongoose.Schema({
	  'name': {type: String},
	  'phoneNumber': {type: String},
	  'email':{type: String},
	  'technicalSkills':{type: String},
	  'resumeUrl':{type: String},
	  'experience':{type: Number},
	  'profilePicUrl':{type: String},
	  'locationPrefernce':{type: String},
	  'currentLocation':{type: String},
	  'noticePeriod': {type: Number},
	  'educationQualification': {type: String}
	
  });

    var userschema = mongoose.model('userschemas', userSchema);
    app.schema.userschema = userschema;
};