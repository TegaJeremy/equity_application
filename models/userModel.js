const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema(
    {
       fullName:{type:String, required:true},
        email:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        zipCode:{type:String, required:true},
    },{timestamps:true}
)

const userModel = mongoose.model('client', userSchema)
module.exports = userModel