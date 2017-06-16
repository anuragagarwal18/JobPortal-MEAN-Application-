# JobPortal-MEAN-Application-
job portal for searching job

steps to run project
1> Clone the project 
2> Install all node modules ie run npm install 
3> After installing node modules .run command 'node server.js'
4> Server is running now

Api routes
1> TO create user you need to pass fields in body
   You can also upload images (CV and profile url)

Request Type : POST
url:localhost:8080/user/createUserProfile

     name: Anurag
	   phoneNumber : 9874561230
	   email : ak@gmail.com
	   technicalSkills: Mean ,JAva
	   experience: 2
	   currentLocation:Bangalore
	   noticePeriod: 1
	   educationQualification: MCA
     
     
2> Update user Profile
  RequestType : PUT
  url :localhost:8080/user/updateUserProfile/:id
  Demo Url : localhost:8080/user/updateUserProfile/:5943f320f9a1c11e608ce578
  
     name: Anurag
	   phoneNumber : 9874561245
	   email : ak@gmail.com
	   technicalSkills: Mean ,JAva
	   experience: 2
	   currentLocation:Bangalore
	   noticePeriod: 1
	   educationQualification: MCA
  
  Response:{
          message: Successfully Updated
          }

  3> Get user Details api
      Reqest Type : GET
      Api Route : localhost:8080/user/getUser/:id
  
 4>  Get All user Records 
      Reqest Type : GET
      Api Route : localhost:8080/user/getAllusers
      
  5>  Create JOB Application
       Reqest Type : POST
      Api Route : localhost:8080/jobs/createjob
      
      REq DATA {
      salary :200000
      educationRequirements:Mean stack developer,
      jobLocation:USA
      hiringOrganizationName: ABC
      workingDays:5
      contactPersonName:Robert
      
      }
      
   6>  Update JOb profile
       Reqest Type : GET
       Api Route : localhost:8080/jobs/updateJob/:id
       
    7> Fetch Particular job details'
        Reqest Type : GET
       Api Route : localhost:8080/jobs/getJob/:id
       
     8>Fetch All job details
        Reqest Type : GET
       Api Route : localhost:8080/jobs/getAlljobs
       
     9>  Search job Acc to skills set
          Reqest Type : GET
          Api Route : localhost:8080/user/getJobsForCandidates/:id
          
     10> Get All candidates acc to job Id
          Reqest Type : GET
          Api Route : localhost:8080/candidates/getCandidatesForJob/:id
     
     
     
     
     
     
    
