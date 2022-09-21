# gr-resq-node-backend

## Steps to run/debug the app locally

## With Docker

Prerequisites:  
 - Local install of Docker. 
 - Local install of the aws-cli

 Note, if using Windows, this has only been tested in WSL environments. 
1. Start local dynamodb container  
`docker run -p 8000:8000 amazon/dynamodb-local`
2. Copy Environment variables assignments to `.env-development`.
3. Initialze database:   
`node utils/setupDb.js`  
(you may want to list tables with aws cli at this point\*)
4. Start node app: 
`node app.js`

**\*Listing local dynamodb tables with aws cli**  
`aws dynamodb list-tables --endpoint-url http://localhost:8000`

