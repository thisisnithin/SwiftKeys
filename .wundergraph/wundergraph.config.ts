import { NextJsTemplate } from '@wundergraph/nextjs/dist/template'
import {
  Application,
  authProviders,
  configureWunderGraphApplication,
  cors,
  EnvironmentVariable,
  introspect,
  templates,
} from '@wundergraph/sdk'
import operations from './wundergraph.operations'
import server from './wundergraph.server'

const db = introspect.postgresql({
  apiNamespace: 'db',
  databaseURL: new EnvironmentVariable('DATABASE_URL'),
  introspection: {
    pollingIntervalSeconds: 5,
  },
})

const wordServer = introspect.openApi({
  apiNamespace: 'wordServer',
  source: {
    kind: 'file',
    filePath: 'server.yaml',
  },
  introspection: {
    pollingIntervalSeconds: 5,
  },
})

const myApplication = new Application({
  name: 'api',
  apis: [db, wordServer],
})

configureWunderGraphApplication({
  application: myApplication,
  server,
  operations,
  codeGenerators: [
    {
      templates: [
        ...templates.typescript.all,
        templates.typescript.operations,
        templates.typescript.linkBuilder,
      ],
    },
    {
      templates: [new NextJsTemplate()],
      path: '../src/components/generated',
    },
  ],
  cors: {
    ...cors.allowAll,
    allowedOrigins: [new EnvironmentVariable('NEXT_PUBLIC_URL')],
  },
  authentication: {
    cookieBased: {
      providers: [
        authProviders.google({
          id: 'google',
          clientId: new EnvironmentVariable('GOOGLE_CLIENT_ID'),
          clientSecret: new EnvironmentVariable('GOOGLE_CLIENT_SECRET'),
        }),
      ],
      authorizedRedirectUris: [new EnvironmentVariable('NEXT_PUBLIC_URL')],
    },
  },
  security: {
    enableGraphQLEndpoint: process.env.NODE_ENV !== 'production',
  },
})
