const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { default: mongoose } = require('mongoose')
const sendmail = require('../helpers/sendmail')
const sendEmail = require('../middlewares/mail')

const registration = async (req, res)=>{
   try {
    const {fullName,email,password,zipCode} = req.body
const checkEmail = await userModel.findOne({email})
if(checkEmail){
    return res.status(400).json({messsage:'user withs email already registered'})
}

const salt = await bcrypt.genSaltSync(10)
const hashedPassword = await bcrypt.hashSync(password,salt)

const user = new userModel({
    fullName,
    email,
    password:hashedPassword,
    zipCode
})
const token = jwt.sign( { email:user.email }, process.env.SECRET_KEY, { expiresIn: "15m" } );
await user.save()
const subject = "New User Registration";
//const message = `Welcome onboard! Kindly use this OTP to verify your account: ${OTP}`;
html = sendmail();
const data = {
    email: user.email,
    subject,
    html,
};

await sendEmail(data);
res.status(200).json({message:'user registered successfully', data:user,token})

   } catch (error) {
    res.status(500).json(error.message)
   }
}

module.exports={
    registration
}



