const postResolvers = require('./posts');
const userResolver = require('./user');
const commentsResolvers = require('./comments')

module.exports = {
  Query: {
    ...postResolvers.Query
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolvers.Mutation,
    ...commentsResolvers.Mutation
  }
}