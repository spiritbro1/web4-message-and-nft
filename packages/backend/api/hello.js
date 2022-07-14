import axios from "axios";
import sharp from 'sharp'


export default async function handler(request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

//---- other code

//Preflight CORS handler
  if(request.method === 'OPTIONS') {
      return response.status(200).json(({
          body: "OK"
      }))
  }
    const input = (await axios({ url: request.query.url, responseType: "arraybuffer" })).data;


const output = await sharp(input).resize(200,200);
    output.pipe(response)
  }