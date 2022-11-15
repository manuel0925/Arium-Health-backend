const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    password: String,
    email: {
      type: String,
      unique: true
    },
    role:String,
    createdDate: { 
      type: Date, 
      default: new Date()
    }
})

UserSchema.pre("save", async function(next){
  const user = this;
  if(this.isModified("password") || this.isNew ){
    try {      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password,salt);
      user.password = hashedPassword
    } catch (error) {
      console.log('error', error)
      next(error)
    }
  }
  next()
})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel