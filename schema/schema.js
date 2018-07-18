const graphql = require('graphql')
const axios = require('axios')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString } ,
    age: { type: GraphQLInt },
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString }},
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`)
          // axios response comes nested inside a 'data' property,
          // so this is necessary to make it work nicely with GraphQL
          .then(response => response.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
