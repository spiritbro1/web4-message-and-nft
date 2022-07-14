var AWS = require('aws-sdk');
require('dotenv').config()
// Set the region 

// Create S3 service object
const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    endpoint: 'https://s3.filebase.com',
    region: 'us-east-1',
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
  });
  

  var thisConfig = {
    AllowedHeaders:["*"],
    AllowedMethods:["PUT","GET"],
    AllowedOrigins:["*"],
    ExposeHeaders:[],
    MaxAgeSeconds:3000
  };
  
  // Assemble the list of allowed methods based on command line parameters
  
  // Create array of configs then add the config object to it
  var corsRules = new Array(thisConfig);
  
  // Create CORS params
  var corsParams = {Bucket: process.env.BUCKET_NAME, CORSConfiguration: {CORSRules: corsRules}};
  
  // set the new CORS configuration on the selected bucket
  s3.putBucketCors(corsParams, function(err, data) {
    if (err) {
      // display error message
      console.log("Error", err);
    } else {
      // update the displayed CORS config for the selected bucket
      console.log("Success", data);
    }
  });