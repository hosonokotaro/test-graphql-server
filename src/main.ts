import { ApolloServer, gql } from 'apollo-server'
import axios from 'axios'
import { join } from 'path'
import * as dotenv from 'dotenv'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'

import { Resolvers } from './types/generated/graphql'

// NOTE: Context type をここで使う場合
// import { Context } from './types/context'

dotenv.config()

// NOTE: https://www.the-guild.dev/graphql/tools/docs/schema-loading
const schema = loadSchemaSync(join(__dirname, './schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
})

// TODO: error type を定義する。return null ではないようにしてみたい

const API_URL = process.env.API_URL

// NOTE: Resolver の定義
const resolvers: Resolvers = {
  Query: {
    // TODO: 型定義を作成して持ってくる
    async articles() {
      try {
        const { data } = await axios.get(`${API_URL}/article-list.json`)
        return data
      } catch (error) {
        return null
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
