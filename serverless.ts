import type { AWS } from '@serverless/typescript'

import * as functions from './src/functions'
import people from './offline/dynamodb/migrations/people.json'

const PeopleTableSettings = people.Table

/**
 * IAMCredential
 * https://gist.githubusercontent.com/ServerlessBot/7618156b8671840a539f405dea2704c8/raw/a76e80cdbf2e9808352c3fec79a9625fa345a00d/IAMCredentials.json
 */
const serverlessConfiguration: AWS = {
  service: 'star-wars-api',
  useDotenv: true,
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    dynamodb: {
      stages: [`\${self:provider.stage}`],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true,
        seed: true,
      },
      migration: {
        dir: 'offline/dynamodb/migrations',
      },
      seed: {
        dev: {
          sources: [
            {
              table: `\${self:provider.environment.PEOPLE_TABLE}`,
              sources: ['./offline/dynamodb/people.json'],
            },
          ],
        },
      },
    },
    'serverless-offline': {
      useChildProcesses: true,
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-jest-plugin',
    'serverless-dotenv-plugin',
    'serverless-dynamodb-local',
    'serverless-offline',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: 'dev',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PEOPLE_TABLE: 'People',
      // REGION: `\${opt:region, self:provider.region}`,
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateTable',
        ],
        Resource: '*',
      },
    ],
    lambdaHashingVersion: '20201221',
  },
  functions: { ...functions },
  resources: {
    Resources: {
      PeopleTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          ...PeopleTableSettings,
          TableName: `\${self:provider.environment.PEOPLE_TABLE}`,
        },
      },
    },
  },
}

module.exports = serverlessConfiguration
