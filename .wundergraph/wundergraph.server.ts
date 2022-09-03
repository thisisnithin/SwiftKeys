import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import { configureWunderGraphServer } from '@wundergraph/sdk'
import type { HooksConfig, HookRequest } from './generated/wundergraph.hooks'
import type { InternalClient } from './generated/wundergraph.internal.client'
import { WebhooksConfig } from '@wundergraph/sdk/dist/webhooks/types'

export default configureWunderGraphServer<
  HooksConfig,
  InternalClient,
  WebhooksConfig
>(() => ({
  hooks: {
    queries: {},
    mutations: {},
    authentication: {
      postAuthentication: async ({ internalClient, user, log }) => {
        if (!user || !user.name || !user.email || !user.userId) {
          log.error('User not found or incomplete')
          return
        }
        log.info('User authenticated: ', user.email)
        const result = await internalClient.mutations.user({
          input: {
            email: user.email,
            name: user.name,
            id: user.userId,
          },
        })
        if (result.errors) {
          log.error('Error upserting user: ', result.errors)
        }
        if (result.data) {
          log.info('User upserted: ', result.data.db_upsertOneUser?.id)
        }
      },
    },
  },
  graphqlServers: [
    {
      apiNamespace: 'gql',
      serverName: 'gql',
      schema: new GraphQLSchema({
        query: new GraphQLObjectType({
          name: 'RootQueryType',
          fields: {
            hello: {
              type: GraphQLString,
              resolve() {
                return 'world'
              },
            },
          },
        }),
      }),
    },
  ],
}))
