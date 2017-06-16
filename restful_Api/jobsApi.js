
// API to create jobs document
exports.createjob = function(req, res){
				console.log("Data in req object", req.body);
				var dataTosave = req.body;
				var schemaType = req.app.schema.jobs;
				
				req.app.functions.createProfile(dataTosave,schemaType,req.app, function(err, responseData){
					if(err){
							res.json({message:"Error",res:false});
					} else {
						console.log("Successfully created document: ",responseData);
						res.json(responseData);
					}
				});	
};

// API to update jobs  Document
exports.updateJob = function(req, res){
				console.log("Data to be updated!!!!!!: ", req.body);
				
				var userId = req.body._id;
				var DataToUpdate = req.body;
				var schemaType = req.app.schema.jobs;
				var query = {
					_id : userId
				}
				
				req.app.functions.updateFunction(query, DataToUpdate, schemaType,req.app, function(err, responseData){
					if(err){
						res.json({message:"Error",res:false});
					} else {
						console.log("Successfully updated document: ",responseData);
						res.json(responseData);
					}
				});
};

// API to get job document
exports.getJob = function(req, res){
				
				var userId = req.params.id;
				var schemaType = req.app.schema.jobs;
				var selection = {};
				var query = {
					_id : userId
				}
				
				req.app.functions.getOneDocument(query, schemaType, selection, req.app, function(err, data){
					if(err){
						res.json({Message:"error",res:false});
					} else {
						res.json(data);
					}
				});
};


// API to get all jobs documents
exports.getAlljobs = function(req, res){
				var schemaType = req.app.schema.jobs;
				var selection = {};
				
				req.app.functions.findAllDocuments(schemaType, selection, req.app, function(err, data){
					if(err){
							res.json({message:"Error",res:false});
					} else {
						res.json(data);
					}
				});
};

// API to get matching candidates for a job - /candidates/getCandidatesForJob/:id
exports.getCandidatesForJob = function(req, res){
 
				 var jobId = req.params.id;
				 var eventEmitter = new events.EventEmitter();
				 eventEmitter.on('getJobDoc', function(jobId){
				  var collection = req.app.schema.jobs;
				 
				  var query = {
				   _id : jobId
				  }  
				  req.app.functions.getOneDocument(query, collection, req.app, function(err, doc){
				   if(err){
					res.json("Unexpected error");
				   } else {
					eventEmitter.emit('getCandidatesForJob', doc);
				   }
				  });
				 });
				 
				 eventEmitter.on('getCandidatesForJob', function(job){
				  console.log("job",job);
				  var collection = req.app.schema.userschema;
				  var query = {technicalSkills: {$in:job.skillsRequired}, locationPrefernce: job.jobLocation};
				 
				  req.app.functions.findAllDocuments(query, collection, req.app, function(err, docs){
				   if(err){
					res.json("Unexpected error");
				   } else {
					res.json(docs);
				   }
				  });
				 });
				 
				 eventEmitter.emit('getJobDoc', jobId);
 
};