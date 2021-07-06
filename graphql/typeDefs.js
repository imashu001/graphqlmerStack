const {gql} = require('apollo-server');

module.exports = gql`
type Post {
  id: ID!
  body:String!
  username:String!
  createdAt:String!
  comments: [Comment]!
  likes: [Like]!
}
type Comment{
  id: ID!
  createdAt: String!
  body:String!
  username:String!
}
type Like{
  id: ID!
  createdAt: String!
  username:String!
}
type  User{
  id: ID!
  email: String!
  token: String!
  username: String!
  createdAt: String!
}
input RegisterInput{
  username: String!
  password: String!
  email: String!
  confirmPassword: String!
}
input LoginUser{
  username: String!
  password: String!
}
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginUser: LoginUser): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;