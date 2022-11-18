import schema from './schema'

const getPathname = (handler: string): string =>
  `${__dirname.split(process.cwd())[1].substring(1)}/${handler}.handler`

export const post = {
  handler: getPathname('post'),
  events: [
    {
      http: {
        method: 'post',
        path: 'people',
        cors: true,
        request: {
          schema: {
            'application/json': schema,
          },
        },
      },
    },
  ],
}

export const get = {
  handler: getPathname('get'),
  events: [
    {
      http: {
        method: 'get',
        path: 'people/{id}',
        cors: true,
      },
    },
  ],
}
