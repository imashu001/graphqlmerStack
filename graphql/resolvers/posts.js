const Post = require('../../models/Post');
const checkAuth = require('../../utils/check_auth')

module.exports = {
  Query: {
    async getPosts(){
      try{
        const posts = await Post.find().sort({createdAt: -1})
        return posts
      }
      catch(err){
        throw new Error(err);
      }
    },
    async getPost(_,{postId}){
      try {
        const post = await Post.findById(postId)
        if(post){b 
          return post
        }else{
          throw new Error ('Post Not Found')
        }
      } catch (error) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async createPost(_,{ body }, context){
      const user = checkAuth(context)
      const newPost = new Post({
        body,
        username: user.username,
        createdAt: new Date().toISOString
      })
      const post = await newPost.save();
      return post;
    },
    async deletePost(_,{ postId },context){
      const user = checkAuth(context)
      try {
        const post = await Post.findById(postId)
        if(user.username === post.username){
          post.delete();
          return "Post Deleted Sucessfully"
        }else{
          throw new Error ('You are not Authorized to delete this post')
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}