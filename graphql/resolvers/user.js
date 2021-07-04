const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../config')
const {UserInputError} = require('apollo-server')
const { validateLoginInput } = require('../../utils/validators')


function generateToken(user){
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
  },SECRET_KEY,{expiresIn: '1h'})
}

module.exports = {
  Mutation: {
    async login(_,{loginUser: {username,password}},context,info){
      // const {errors, valid} = validateLoginInput(username, password);
      if(!username || !password){
        errors.genral = "Field Missing"
        throw new UserInputError("Field Missing", {errors})
      }
      const user = await User.findOne({username});
      if(!user){
        errors.genral = "usernot found"
        throw new UserInputError("usernot found", {errors})
      }
      const match = await bcrypt.compare(password,user.password);
      if(!match){
        errors.genral = "INCORRECT PASSWORD"
        throw new UserInputError("INCORRECT PASSWORD")
      }

      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token
      }
    },







     async register(_,{registerInput : {username,email, password,confirmPassword}},context,info){
      //Validate Users Data
      //Unique username
      //hashpassword and create jwt token
      password = await bcrypt.hash(password,12)
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString
      })
      const res = await newUser.save()
      const token = generateToken(res)
      
      return {
        ...res._doc,
        id: res._id,
        token
      }

    }
  }
}