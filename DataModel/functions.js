// CRUD Operations in mongodb

// Function to update document
exports.updateFunction = function (query, dataToupdate, schemaName, app, callback){
	schemaName.findOneAndUpdate(query, dataToupdate,{new:true}).lean().exec(function(err, data){
		if(err){
			callback(err, "");
		} else {
			callback("", data);
		}
	});
};


// Function to get document

exports.findAllDocuments = function (schemaName, selection, app, callback){
	schemaName.find({}, selection).exec(function(err, data){
		if(err){
			callback(err, "");
		} else {
			callback("", data);
		}
	});
};

//create user profile 
exports.createProfile = function (jsonData, schemaName, app, callback){
	var reqData = new schemaName(jsonData);
	reqData.save(function(err, data){
		if(err){
			callback(err, "");
		} else {
			callback("", data);
		}
	});
};

// Function to get document

exports.getOneDocument = function (query, schemaName, selection, app, callback){
	schemaName.findOne(query, selection).exec(function(err, data){
		if(err){
			callback(err, "");
		} else {
			callback("", data);
		}
	});
};
