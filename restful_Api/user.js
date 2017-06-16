var events = require('events');
var fs = require('fs');
var mkdirp = require('mkdirp');
var async = require('async');
var mkdirp = require('mkdirp');
var express = require('express');
var app = express();

// API to create user profile 
exports.createUserProfile = function(req, res){
		 console.log("req data",req.files);

		 var eventEmitter = new events.EventEmitter();
		 var schemaType = req.app.schema.userschema;
		 var destinationPath = './images/' + req.body.phoneNumber; // create a directory

		 schemaType.find({phoneNumber : req.body.phoneNumber}).exec(function(err, userInfo){
		  if(err){
			console.log("Error :",err);
		   } else if (userInfo.length > 0 ){
			 res.json({message:"Already registered",response: false});       
		   } else {
			eventEmitter.emit('checkForFolderExist', schemaType, destinationPath, req.body);
		 }
   });


 eventEmitter.on('checkForFolderExist', function(schemaType, destinationPath, body){
	  if (fs.existsSync(destinationPath)) {
				eventEmitter.emit('uploadDocuments', schemaType, destinationPath, body);
		   } else {
				mkdirp(destinationPath, function(err) {
				 if (err) {
						console.log("Error: ", err);
					} else {
			 eventEmitter.emit('uploadDocuments', schemaType, destinationPath, body);
			  }
			});
		   } 
		});
	
 eventEmitter.on('uploadDocuments', function(schemaType, path, body){   
				var files = req.files;
				console.log("req.files",req.files);
				var filename;
			  if(req.files !=null && req.files !== undefined){
				  
				async.forEach(Object.keys(files), function (item, callback){
				var destPath = destinationPath;
				var fileObj = req.files[item];
				var sourceFileLoc = fileObj.path;
				var originalname = fileObj.fieldname;
				var extension = fileObj.extension;
				if(item == originalname){
				filename = originalname + "." + extension;
				}
	   
				if (fs.existsSync(destPath)) {
				   destPath += "/" + filename;
					fs.createReadStream(sourceFileLoc).
						pipe(fs.createWriteStream(destPath));
					callback(); // tell async that the iterator has completed
				} else {
				console.log("iterating till app images uploaded");
			  }
			}, function(err) {
					   if(err){
						console.log("Error");
						}else{
						   eventEmitter.emit('createDocument', schemaType, body); 
						 }
					});
			  }else{
				 eventEmitter.emit('createDocument', schemaType, body); 
			  }	
				});
 	
 eventEmitter.on('createDocument', function(schemaType, body){
			  req.app.functions.createProfile(body, schemaType, req.app, function(err, responseData){
				 if(err){
				  res.json({message:"unexpected error",response:false});
				 } else {
					 var responseData = responseData;
					 responseData.message = "Successfully updated"
					 responseData.response = true ;
					 res.json(responseData);
				 }
			   });
			   
			 })	
};

// API to update user Document
exports.updateUserProfile = function(req, res){
	console.log("Data to be updated!!!!!!: ", req.body);
	
	var userId = req.params._id;
	var DataToUpdate = req.body;
	var schemaType = req.app.schema.userschema;
	var query = {
		_id : userId
	}
	
	req.app.functions.updateFunction(query, DataToUpdate, schemaType,req.app, function(err, responseData){
		if(err){
			res.json("Error in updating  user Profile");
		} else {
			console.log("Successfully updated document: ",responseData);
			res.json(responseData);
		}
	});
};

// API to get single user
exports.getUser = function(req, res){
	console.log("Client request Data: ", req.params);
	
	var userId = req.params.id;
	var collection = req.app.schema.userschema;
	var selection = {};
	var query = {
		_id : userId
	}
	
	req.app.functions.getOneDocument(query, collection, selection, req.app, function(err, doc){
		if(err){
			console.log("Error in getting single candidate: ",err);
			res.json("Unexpected error");
		} else {
			console.log("Got single Candidate: ",doc);
			res.json(doc);
		}
	});
};

// API to get all users
exports.getAllusers = function(req, res){
	var collection = req.app.schema.userschema;
	var selection = {};
	
	req.app.functions.findAllDocuments(collection, selection, req.app, function(err, docs){
		if(err){
			console.log("Error in getting all jobs: ",err);
			res.json("Unexpected error");
		} else {
			console.log("Got Jobs: ",docs);
			res.json(docs);
		}
	});
};


// API to get matching jobs for a candidate - /candidates/getJobsForCandidates/:id
exports.getJobsForCandidates = function(req, res){
		 
			 var candidateId = req.params.id;
			 var eventEmitter = new events.EventEmitter();
			 
			 eventEmitter.on('getCandidateDoc', function(candidateId){
			  var collection = req.app.schema.userschema;
			  var query = {
			   _id : candidateId
			  }  
			  req.app.functions.getOneDocument(query, collection,req.app, function(err, doc){
			   if(err){
				res.json("Unexpected error");
			   } else {
				eventEmitter.emit('getJobsForCandidates', doc);
			   }
			  });
			 });
	 
 eventEmitter.on('getJobsForCandidates', function(candidate){
			  var collection = req.app.schema.jobs;
			  var query = {skillsRequired: {$in:candidate.technicalSkills}, jobLocation: candidate.locationPrefernce};
			  
			  req.app.functions.findAllDocuments(query, collection,req.app, function(err, docs){
			   if(err){
				res.json("Unexpected error");
			   } else {
				res.json(docs);
			   }
			  });
			 });
 
 eventEmitter.emit('getCandidateDoc', candidateId);
 
};