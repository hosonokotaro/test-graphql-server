import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'
import { ApolloServer } from 'apollo-server'
import axios from 'axios'
import * as dotenv from 'dotenv'
import { join } from 'path'

import { Resolvers } from './types/generated/graphql'

// NOTE: Context type をここで使う場合
// import { Context } from './types/context'

dotenv.config()

// NOTE: https://www.the-guild.dev/graphql/tools/docs/schema-loading
const schema = loadSchemaSync(join(__dirname, './schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
})

const API_URL = process.env.API_URL

// NOTE: Resolver の定義
const resolvers: Resolvers = {
  Query: {
    async articles() {
      try {
        const { data } = await axios.get(`${API_URL}/article-list.json`)
        return data
      } catch (error) {
        if (error instanceof Error) {
          return {
            status: 'error',
            message: error.message,
          }
        }

        console.log(error)
      }
    },
  },
}

const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

// NOTE: Init GraphQL server
const server = new ApolloServer({ schema: schemaWithResolvers })

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
