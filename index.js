const { ApolloServer }  = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const {MONGODB} = require('./config');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB, {useNewUrlParser: true})
  .then(() => {
    console.log(`MONGO DB CONNECTED`);
})
server.listen({port: 5000})
  .then((res) => {
    console.log(`Server is running on port ${res.url}`)
  })