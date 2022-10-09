import { ApolloServer, gql } from 'apollo-server'

// NOTE GraphQL Schema の定義
const typeDefs = gql`
  type Query {
    hello: String!
  }
`

// NOTE: Resolver の定義
const resolvers = {
  Query: {
    hello: () => 'world',
  },
}

// NOTE: Init GraphQL server
const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
