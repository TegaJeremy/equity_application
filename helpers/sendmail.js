function sendMail(fullName){
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
                background-color: #00a2ff;
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
    
            .cta-button {
                display: inline-block;
                background-color: #00a2ff;
                color: #fff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
                margin-top: 20px;
                font-weight: bold;
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
                <p class="message">Congratulations on joining Equity Bank! We are thrilled to have you as part of our
                    financial family. Your journey towards financial success begins now.</p>
                <p class="message">At Equity Bank, we are committed to providing you with seamless banking experiences,
                    innovative solutions, and personalized services.</p>
                <p class="message">Feel free to explore our range of banking services and discover the convenience of
                    banking with Equity.</p>
    
                <a href="#" class="cta-button">Explore Services</a>
            </div>
    
            <div class="footer">
                <p>Thank you for choosing Equity Bank</p>
                <p>Contact us at support@equitybank.com</p>
            </div>
        </div>
    </body>
    
    </html>`
    
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