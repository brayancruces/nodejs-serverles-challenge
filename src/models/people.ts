import aws from 'aws-sdk'

const dynamodb = new aws.DynamoDB({ region: process.env.SERVERLESS_REGION })

export interface People {
  id: string
  nombre: string
  genero: string
  peliculas: string[]
  color_ojo: string
  color_cabello: string
  color_piel: string
  altura: string
  peso: string
  planeta_natal: string
  especies: string[]
  naves_estelares: string[]
  vehiculos: string[]
  url: string
  fecha_nacimiento: string
  fecha_creacion: string
  fecha_edicion: string
}

const createTable = async () => {
  await dynamodb
    .createTable({
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'nombre', AttributeType: 'S' },
        { AttributeName: 'genero', AttributeType: 'S' },
        { AttributeName: 'peliculas', AttributeType: 'S' },
        { AttributeName: 'color_ojo', AttributeType: 'S' },
        { AttributeName: 'color_cabello', AttributeType: 'S' },
        { AttributeName: 'color_piel', AttributeType: 'S' },
        { AttributeName: 'altura', AttributeType: 'S' },
        { AttributeName: 'peso', AttributeType: 'S' },
        { AttributeName: 'planeta_natal', AttributeType: 'S' },
        { AttributeName: 'especies', AttributeType: 'S' },
        { AttributeName: 'naves_estelares', AttributeType: 'S' },
        { AttributeName: 'vehiculos', AttributeType: 'S' },
        { AttributeName: 'url', AttributeType: 'S' },
        { AttributeName: 'fecha_nacimiento', AttributeType: 'S' },
        { AttributeName: 'fecha_creacion', AttributeType: 'S' },
        { AttributeName: 'fecha_edicion', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
        { AttributeName: 'nombre', KeyType: 'RANGE' },
        { AttributeName: 'genero', KeyType: 'RANGE' },
        { AttributeName: 'peliculas', KeyType: 'RANGE' },
        { AttributeName: 'color_ojo', KeyType: 'RANGE' },
        { AttributeName: 'color_cabello', KeyType: 'RANGE' },
        { AttributeName: 'color_piel', KeyType: 'RANGE' },
        { AttributeName: 'altura', KeyType: 'RANGE' },
        { AttributeName: 'peso', KeyType: 'RANGE' },
        { AttributeName: 'planeta_natal', KeyType: 'RANGE' },
        { AttributeName: 'especies', KeyType: 'RANGE' },
        { AttributeName: 'naves_estelares', KeyType: 'RANGE' },
        { AttributeName: 'vehiculos', KeyType: 'RANGE' },
        { AttributeName: 'url', KeyType: 'RANGE' },
        { AttributeName: 'fecha_nacimiento', KeyType: 'RANGE' },
        { AttributeName: 'fecha_creacion', KeyType: 'RANGE' },
        { AttributeName: 'fecha_edicion', KeyType: 'RANGE' },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 10,
      },
      TableName: 'People',
      BillingMode: 'PROVISIONED',
    })
    .promise()

  await dynamodb.waitFor('tableExists', { TableName: 'People' }).promise()

  console.log('Table has been created, please continue to insert data')
}

createTable().catch(error => console.error(JSON.stringify(error, null, 2)))
