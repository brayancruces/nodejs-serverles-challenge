interface Params<TBody extends object, TPathParams extends object> {
  body?: TBody
  method: 'POST' | 'GET'
  path?: string
  queryStringObject?: any
  pathParametersObject?: TPathParams
  stageVariables?: any
}

function eventGenerator<TBody extends object, TPathParams extends object>({
  body,
  method,
  path = '',
  queryStringObject,
  pathParametersObject,
  stageVariables = null,
}: Params<TBody, TPathParams>) {
  const request = {
    body: body ? JSON.stringify(body) : null,
    headers: {},
    multiValueHeaders: {},
    httpMethod: method,
    isBase64Encoded: false,
    path,
    pathParameters: pathParametersObject || null,
    queryStringParameters: queryStringObject || null,
    multiValueQueryStringParameters: null,
    stageVariables,
    requestContext: {
      accountId: '',
      apiId: '',
      httpMethod: method,
      identity: {
        accessKey: '',
        accountId: '',
        apiKey: '',
        apiKeyId: '',
        caller: '',
        cognitoAuthenticationProvider: '',
        cognitoAuthenticationType: '',
        cognitoIdentityId: '',
        cognitoIdentityPoolId: '',
        principalOrgId: '',
        sourceIp: '',
        user: '',
        userAgent: '',
        userArn: '',
      },
      path,
      stage: '',
      requestId: '',
      requestTimeEpoch: 3,
      resourceId: '',
      resourcePath: '',
    },
    resource: '',
  }

  return request
}

export default eventGenerator
