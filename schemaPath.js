exports = module.exports = function(app, mongoose) {

  require('./schema/userSchema')(app, mongoose);
  require('./schema/jobSchema')(app, mongoose);
  
};  