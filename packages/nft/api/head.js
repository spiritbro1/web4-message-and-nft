
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    endpoint: 'https://s3.filebase.com',
    region: 'us-east-1',
    s3ForcePathStyle: true
    , signatureVersion: 'v4'
  });
  
export default async function handler(request, response) {
 
  const headParams = {Bucket:process.env.BUCKET_NAME, Key: request.body.key}
      const data=await s3.headObject(headParams).promise()
      response.json(data)

    
  }
