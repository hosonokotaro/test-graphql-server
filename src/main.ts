import { ApolloServer, gql } from 'apollo-server'
import fs from 'fs'
import axios from 'axios'

// NOTE GraphQL Schema の定義
// ! マークは null 非許容
const typeDefs = gql`
  type Article {
    id: String!
    title: String!
    content: String
    createDate: String
    release: Boolean
  }

  type Query {
    articles: [Article]
  }
`

// TODO: error type を定義する。return null ではないようにしてみたい

const BASE_URL = 'https://hosonokotaro-blog-98d9d.firebaseio.com'

// NOTE: Resolver の定義
const resolvers = {
  Query: {
    // TODO: 型定義を作成して持ってくる
    async articles(parent: any, args: any, context: any, info: any) {
      try {
        const { data } = await axios.get(`${BASE_URL}/article-list.json`)
        return data
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
