import { handler } from '../../functions/people/get'
import { eventGenerator, isApiGatewayResponse } from '../utils'
import mock from '../utils/mock.json'
import dynamodb from '../../libs/dynamodb'

describe('Get People', () => {
  let uid: string = null

  beforeAll(async () => {
    uid = Date.now().toString(36)

    const now = new Date().toISOString()

    await dynamodb
      .put({
        TableName: 'People',
        Item: {
          id: uid,
          ...mock.post.body,
          fecha_creacion: now,
          fecha_edicion: now,
        },
      })
      .promise()
  })

  it('should get a people', async done => {
    const event = eventGenerator<object, { id: string }>({
      pathParametersObject: {
        id: uid,
      },
      method: 'GET',
    })

    const response: any = await handler(event, null, null)

    expect(response).toBeDefined()

    expect(isApiGatewayResponse(response)).toBeTruthy()

    const json = JSON.parse(response.body)

    expect(json.id).toBe(uid)

    done()
  })

  it('should not get a people', async done => {
    const event = eventGenerator<null, { id: string }>({
      pathParametersObject: {
        id: 'unknown',
      },
      method: 'GET',
    })

    const response: any = await handler(event, null, null)

    expect(isApiGatewayResponse(response)).toBeTruthy()

    const json = JSON.parse(response.body)

    expect(json.id).toBeUndefined()

    done()
  })
})
