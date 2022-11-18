import { handler } from '../../functions/people/post'
import { eventGenerator, isApiGatewayResponse } from '../utils'
import mock from '../utils/mock.json'

describe('Post People', () => {
  it('should create a people', async done => {
    const event = eventGenerator<typeof mock.post.body, null>({
      body: mock.post.body,
      method: 'POST',
    })

    const response: any = await handler(event, null, null)

    expect(response).toBeDefined()

    expect(isApiGatewayResponse(response)).toBeTruthy()

    const json = JSON.parse(response.body)

    expect(typeof json.id).toBe('string')

    done()
  })

  it('should not create a people', async done => {
    const event = eventGenerator({
      body: null,
      method: 'POST',
    })

    const response: any = await handler(event, null, null)

    expect(response).toBeDefined()

    expect(isApiGatewayResponse(response)).toBeTruthy()

    const json = JSON.parse(response.body)

    expect(response.statusCode).toBe(400)

    expect(json.error).toBe('Campos incorrectos')

    done()
  })
})
