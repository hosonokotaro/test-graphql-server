import { ApolloServer, gql } from 'apollo-server'
import fs from 'fs'

// NOTE GraphQL Schema の定義
// ! マークは null 非許容
const typeDefs = gql`
  type Article {
    id: String!
    title: String!
    description: String
  }

  type Query {
    articles: [Article]
  }
`

// TODO: error type を定義する。return null ではないようにしてみたい

// NOTE: Resolver の定義
const resolvers = {
  Query: {
    articles: () => {
      try {
        return JSON.parse(fs.readFileSync('mock/articles.json', 'utf8'))
      } catch (error) {
        return null
      }
    },
  },
}

// NOTE: Init GraphQL server
const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
