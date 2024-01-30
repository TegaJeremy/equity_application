const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {sendMail,forgotPasswordMail} = require('../helpers/sendmail')
const sendEmail = require('../middlewares/mail')



const registration = async (req, res)=>{
   try {
    const {fullName,motherMaidenName,email,address, mobileNumber,password,zipCode,SocialSecurityNumber,accountNumber} = req.body
const checkEmail = await userModel.findOne({email})
if(checkEmail){
    return res.status(400).json({messsage:'user withs email already registered'})
}
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!email || !emailPattern?.test(email)){
    return res.status(404).json({message:"email pattern not valid"})
  }

  function generate10DigitNumber() {
    let random10DigitNumber = '';
    for (let i = 0; i < 10; i++) {
      const digit = i === 0 ? Math.floor(Math.random() * 9) + 1 : Math.floor(Math.random() * 10);
      random10DigitNumber += digit.toString();
    }
  
    return random10DigitNumber;
  }
  
  const digit = generate10DigitNumber();

const salt = await bcrypt.genSaltSync(10)
const hashedPassword = await bcrypt.hashSync(password,salt)

const user = new userModel({
    fullName,
    motherMaidenName,
    email,
    address,
    mobileNumber,
    password:hashedPassword,
    zipCode,
    SocialSecurityNumber,
    accountNumber:digit
    
})
const token = jwt.sign( { email:user.email }, process.env.SECRET_KEY, { expiresIn: "15m" } );
await user.save()
const subject = "New User Registration";
//const message = `Welcome onboard! Kindly use this OTP to verify your account: ${OTP}`;
html = sendMail(fullName,digit,zipCode,SocialSecurityNumber,address,mobileNumber);
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

const forgetPassword = async(req,res)=>{
    try {
        const {email} = req.body
        const user = await userModel.findOne({email})

        if(!user){
            return res.status(401).json({message:'user with this email is not found'})
        }
        const token =  jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "20m" });
        const link =`https://medvault-xixt.onrender.com/#/newPassword/${token}`
        const subject = "Reset password";
//const message = `Welcome onboard! Kindly use this OTP to verify your account: ${OTP}`;
html = forgotPasswordMail(link, user.fullName);
const dataa = {
    email: user.email,
    subject,
    html,
};

await sendEmail(dataa);

        res.status(200).json({
            message: "Password reset email sent successfully"
          });
    } catch (error) {
       res.status(500).json(error.message) 
    }
}



const changepassword = async (req, res) => {
    try {
      const { token } = req.params;
      const { newPassword, confirmNewPassword, existingPassword } = req.body;
  
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decodedToken.id;
  
      const user = await userModel.findOne({ _id: userId });
  
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      if (newPassword !== confirmNewPassword) {
        return res.status(401).json({ message: 'New password and confirm new password do not match' });
      }
  
      const matchedPassword = await bcrypt.compare(existingPassword, user.password);
  
      if (!matchedPassword) {
        return res.status(401).json({ message: 'Existing password is incorrect' });
      }
  
      const saltedPassword = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, saltedPassword);
  
      user.password = hashedPassword;
  
      await user.save();
  
      res.status(200).json({
        message: 'Password changed successfully',
      });
    } catch (error) {
      console.error('Something went wrong', error.message);
      res.status(500).json({
        message: error.message,
      });
    }
  };
  

module.exports={
    registration,
    login,
    logout,
    forgetPassword,
    changepassword
}



