const postResolvers = require('./posts');
const userResolver = require('./user');

module.exports = {
  Query: {
    ...postResolvers.Query
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolvers.Mutation
  }
}