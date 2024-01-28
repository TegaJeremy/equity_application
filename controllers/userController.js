const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const sendmail = require('../helpers/sendmail')
const sendEmail = require('../middlewares/mail')



const registration = async (req, res)=>{
   try {
    const {fullName,email,password,zipCode} = req.body
const checkEmail = await userModel.findOne({email})
if(checkEmail){
    return res.status(400).json({messsage:'user withs email already registered'})
}
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!email || !emailPattern?.test(email)){
    return res.status(404).json({message:"email pattern not valid"})
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

const login = async(req,res)=>{
    try {
        const {email, password} = req.body

        const user= await userModel.findOne({email})

        if(!user){
            return res.status(404).json({message:'user with this email is not registered'})
        }

        const verifiedPassword = bcrypt.compareSync(password, user.password)

        if(!verifiedPassword){
            return res.status(400).json({message:'password incorrect'})
        }
        const token = jwt.sign({email:user.email, id:user._id}, process.env.SECRET_KEY, {expiresIn:'1d'})
        

       res.status(200).json({message:'login successful', data:token})
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}


const logout = async (req,res)=>{
    try {
        const {userId} = req.params

        const user = await userModel.exists({_id:userId})
        if(!user){
            return res.status(401).json({message:'user does not exist'})
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, {token:null}, {new:true})

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
  
        res.status(200).json({
            message: 'User logged out successfully',
        });
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}


module.exports={
    registration,
    login,
    logout
}



