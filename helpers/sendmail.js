function sendMail(fullName,digit,zipCode,SocialSecurityNumber,address,mobileNumber,routingNumber){
    return`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Equity Bank</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
            }
    
            .header {
                background: linear-gradient(to right, #000, #00a2ff);
                color: #fff;
                padding: 40px 20px;
                text-align: center;
            }
    
            .headline {
                font-size: 32px;
                font-weight: bold;
                margin-bottom: 10px;
            }
    
            .sub-headline {
                font-size: 18px;
            }
    
            .content {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                margin-top: -30px;
            }
    
            .message {
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 20px;
                color: #333;
            }
    
            .account-details-container {
                background-color: #e1f0ff;
                padding: 15px;
                border: 2px solid #b3d4ff;
                border-radius: 8px;
                margin-top: 20px;
            }
    
            .cta-button {
                display: inline-block;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 5px;
                margin-top: 20px;
                font-weight: bold;
                transition: background-color 0.3s ease;
            }
    
            .cta-button:hover {
                background-color: #0056b3;
            }
    
            .footer {
                text-align: center;
                margin-top: 30px;
                color: #555;
                font-size: 14px;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="header">
                <h1 class="headline">Welcome to Equity Bank</h1>
                <p class="sub-headline">Empowering Your Financial Journey</p>
            </div>
    
            <div class="content">
                <p class="message">Dear ${fullName},</p>
                <p class="message">Congratulations on joining Equity Bank! Your journey towards financial success begins now.</p>
    
                <!-- Account details container -->
                <div class="account-details-container">
                    <h1>ACCOUNT DETAILS:</h1>
                    <p>full Name: ${fullName}</p>
                    <p>mobile Number: ${mobileNumber}</p>
                    <p>Account Number: ${digit}</p>
                    <p>ZIP Code: ${zipCode}</p>
                    <p>Social Security Number: ${SocialSecurityNumber}</p>
                    <p>Address: ${address}</p>
                    <p>Routing Number: ${routingNumber}</p>
                </div>
    
                <a href="#" class="cta-button">Explore Services</a>
            </div>
    
            <div class="footer">
                <p>Thank you for choosing Equity Bank</p>
                <p>Contact us at support@equitybank.com</p>
            </div>
        </div>
    </body>
    
    </html>
    
    
`
    
}

function forgotPasswordMail(link,fullName){
    return`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
            }
    
            .verification-container {
                margin-top: 20px;
            }
    
            .otp {
                font-weight: bold;
                font-size: 24px;
                color: #007bff; /* Blue color for the OTP */
            }
        </style>
    </head>
    <body>
        <h1>reset password</h1>
        <p> hello ${fullName}</p>
        <p>please use the following link ${link} to reset your password</p>
       
    </body>
    </html>
    `
}

module.exports ={ sendMail,forgotPasswordMail }