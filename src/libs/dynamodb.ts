import aws from 'aws-sdk'

const { IS_OFFLINE } = process.env

const options = {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
}

const dynamodb = new aws.DynamoDB.DocumentClient(IS_OFFLINE ? options : {})

export default dynamodb
