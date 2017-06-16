'use strict'; 

exports = module.exports = function(app, mongoose) {
  var jobSchema = mongoose.Schema({
     'salary':{type: Number},
	 'postedDate': {type:Date, default: Date.now},
	 'validTillDate':{type:Date},
	 'jobStatus':{type : Boolean, default: true},
	 'educationRequirements':{type: String},
	 'jobLocation':{type: String},
	 'hiringOrganizationName':{type: String},
	 'orgainizationDescription':{type: String},
	 'skillsRequired':{type: String},
	 'workHours':{type: Number}, 
	 'workingDays':{type: Number},
	 'contactPersonName':{type: String},
	 'contactPersonEmail':{type: String},
	 'contactPersonPhNo':{type: String},
	 'SubscriptionType':{type: String},   //Premium , Normal
	 'jobType':{type: String},            // PartTime ,FullTime
	 'jobDescription':{type: String},
	 'priority':{type: String}          //Normal,Medium,High

  });

    var job = mongoose.model('jobs', jobSchema);
    app.schema.jobs = job;
};