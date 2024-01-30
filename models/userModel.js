const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema(
    {
       fullName:{type:String, required:true},
       motherMaidenName:{type:String},
        email:{type:String, required:true, unique:true},
        address:{type:String, required:true},
        mobileNumber:{type:String, required:true},
        password:{type:String, required:true},
        zipCode:{type:String, required:true},
        SocialSecurityNumber:{type:String, required:true},
        accountNumber:{type:String, required:true}
        
    },{timestamps:true}
)

const userModel = mongoose.model('client', userSchema)
module.exports = userModel