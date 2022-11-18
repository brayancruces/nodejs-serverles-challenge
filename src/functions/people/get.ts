// import 'source-map-support/register'

import fetch from 'node-fetch'

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import dynamodb from '@libs/dynamodb'

import schema from './schema'

const get: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async event => {
  const {
    pathParameters: { id },
  } = event

  let response = null

  try {
    const result = await dynamodb
      .get({
        TableName: process.env.PEOPLE_TABLE,
        Key: { id },
      })
      .promise()

    response = result.Item

    if (!response) {
      const endpoint = `${process.env.SWAPI_URL}/people/${id}`

      const request = await fetch(endpoint)

      const json = await request.json()

      if (!json.error) {
        response = json
      }
    }
  } catch (error) {
    response = {
      error: error.message,
    }
  } finally {
    if (response) {
      return formatJSONResponse(response)
    }

    return formatJSONResponse(null, 404)
  }
}

export const handler = middyfy(get)
