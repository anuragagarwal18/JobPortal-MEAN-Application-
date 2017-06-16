var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('Mean Application');
});


module.exports = function(app) {
			
		// user APIS - Start
			
			app.put('/user/updateUserProfile/:id', require('./restful_Api/user').updateUserProfile);
			app.get('/user/getUser/:id', require('./restful_Api/user').getUser);
			app.get('/user/getAllusers', require('./restful_Api/user').getAllusers);
			app.get('/user/getJobsForCandidates/:id', require('./restful_Api/user').getJobsForCandidates);
			app.post('/user/createUserProfile',upload, require('./restful_Api/user').createUserProfile);
			
		//jobs APIS

			app.post('/jobs/createjob', require('./restful_Api/jobsApi').createjob);
			app.put('/jobs/updateJob/:id', require('./restful_Api/jobsApi').updateJob);
			app.get('/jobs/getJob/:id', require('./restful_Api/jobsApi').getJob);
			app.get('/jobs/getAlljobs', require('./restful_Api/jobsApi').getAlljobs);
			app.get('/candidates/getCandidatesForJob/:id', require('./restful_Api/jobsApi').getCandidatesForJob);
		 
};