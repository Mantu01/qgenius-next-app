type templateParameters={
    title: string,
    message: string,
    link: string,
    buttonText: string
}

export function generateEmailHTML(params: templateParameters) {
    const mailTemplate:string = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to QGenius</title>
    <style>
        /* Reset styles */
        body, html {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f7fa;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            color: #333333;
            line-height: 1.6;
        }
        
        /* Main container */
        .email-wrapper {
            width: 100%;
            background-color: #f5f7fa;
            padding: 40px 20px;
        }
        
        .container {
            width: 100%;
            max-width: 600px;
            background: #ffffff;
            margin: 0 auto;
            padding: 0;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            overflow: hidden;
        }
        
        /* Top color band */
        .top-band {
            height: 8px;
            background: linear-gradient(90deg, #0052cc, #4c9aff);
            width: 100%;
        }
        
        /* Header section */
        .header {
            text-align: center;
            padding: 40px 40px 30px;
            background-color: #ffffff;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .logo {
            width: 180px;
            max-width: 100%;
            height: auto;
            margin-bottom: 15px;
            transition: transform 0.3s ease;
        }
        
        /* Content styling */
        .content {
            padding: 45px 50px;
            background-color: #ffffff;
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23f0f4f9' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
            background-size: 300px;
        }
        
        h1 {
            color: #1a1a2e;
            font-size: 28px;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: 25px;
            text-align: center;
            letter-spacing: -0.5px;
        }
        
        p {
            font-size: 16px;
            line-height: 1.8;
            color: #505050;
            margin-bottom: 22px;
        }
        
        /* Button styling */
        .button-container {
            text-align: center;
            margin: 35px 0;
        }
        
        .btn {
            display: inline-block;
            padding: 15px 36px;
            text-decoration: none;
            color: #ffffff;
            background: linear-gradient(135deg, #0052cc, #2684ff);
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 6px 16px rgba(0, 82, 204, 0.25);
            letter-spacing: 0.2px;
        }
        
        .btn:hover {
            background: linear-gradient(135deg, #0047b3, #0052cc);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 82, 204, 0.35);
        }
        
        /* Divider */
        .divider {
            height: 1px;
            background: linear-gradient(to right, rgba(0,0,0,0.02), rgba(0,0,0,0.08), rgba(0,0,0,0.02));
            margin: 20px 0;
        }
        
        /* Card section */
        .card {
            background-color: #f8fafd;
            border-radius: 12px;
            padding: 24px;
            margin: 35px 0;
            border-left: 5px solid #0052cc;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
        }
        
        .card p {
            margin-bottom: 0;
            color: #444444;
        }
        
        /* Footer styling */
        .footer {
            background-color: #fafbfd;
            padding: 35px 40px;
            border-top: 1px solid #f0f0f0;
            text-align: center;
        }
        
        .footer p {
            font-size: 14px;
            color: #777777;
            margin: 10px 0;
        }
        
        .footer a {
            color: #0052cc;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
        }
        
        .footer a:hover {
            color: #003d99;
            text-decoration: underline;
        }
        
        .social-links {
            margin: 25px 0;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 8px;
            transition: transform 0.3s ease;
        }
        
        .social-links a:hover {
            transform: translateY(-3px);
        }
        
        .social-icon {
            display: inline-block;
            width: 36px;
            height: 36px;
            padding: 8px;
            background-color: #f0f4f9;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .social-icon:hover {
            background-color: #e6eef7;
        }
        
        .footer-links {
            margin-top: 18px;
        }
        
        .footer-links a {
            display: inline-block;
            margin: 0 12px;
            font-size: 13px;
        }
        
        /* Additional elements */
        .highlight-text {
            font-weight: 600;
            color: #0052cc;
        }
        
        /* Responsive adjustments */
        @media only screen and (max-width: 640px) {
            .container {
                border-radius: 12px;
            }
            
            .header {
                padding: 30px 25px 25px;
            }
            
            .content {
                padding: 30px;
            }
            
            .footer {
                padding: 30px 25px;
            }
            
            h1 {
                font-size: 24px;
                margin-bottom: 20px;
            }
            
            p {
                font-size: 15px;
                line-height: 1.7;
            }
            
            .btn {
                padding: 14px 30px;
                font-size: 15px;
                border-radius: 6px;
            }
            
            .card {
                padding: 20px;
                border-left-width: 4px;
                margin: 30px 0;
            }
        }
        
        @media only screen and (max-width: 480px) {
            .email-wrapper {
                padding: 20px 15px;
            }
            
            .container {
                border-radius: 10px;
            }
            
            .header {
                padding: 25px 20px 20px;
            }
            
            .content {
                padding: 25px;
            }
            
            .footer {
                padding: 25px 20px;
            }
            
            h1 {
                font-size: 22px;
            }
            
            .btn {
                padding: 12px 28px;
                font-size: 14px;
                width: 100%;
                box-sizing: border-box;
            }
            
            .social-links a {
                margin: 0 6px;
            }
            
            .social-icon {
                width: 32px;
                height: 32px;
                padding: 6px;
            }
            
            .footer-links a {
                margin: 8px;
                display: block;
            }
        }
    </style>
</head>
<body>
  <div class="email-wrapper">
      <div class="container">
          <div class="top-band"></div>
          <div class="header">
              <img src="https://res.cloudinary.com/dqznmhhtv/image/upload/v1740554497/image-removebg-preview_nerxe2.png" alt="QGenius Logo" class="logo">
          </div>
          
          <div class="content">
              <h1>{{title}}</h1>
              <p>{{message}}</p>
              
              <div class="button-container">
                  <a href="{{link}}" class="btn">{{buttonText}}</a>
              </div>
              
              <div class="card">
                <p>Have questions? Need help? Our support team is always ready to assist you at <span class="highlight-text">support@qgenius.com</span></p>
              </div>
          </div>
          
          <div class="footer">
              <p>If you didn't request this email, please ignore it or <a href="#">contact our support team</a>.</p>
              <div class="divider"></div>
              
              <div class="social-links">
                  <a href="https://www.linkedin.com/in/mantu-kumar-2b5912238/" target="_blank">
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/linkedin.svg" alt="LinkedIn" class="social-icon">
                  </a>
                  <a href="https://x.com/Mantu_kumar91" target="_blank">
                      <img src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/8.15.0/twitter.svg" alt="Twitter" class="social-icon">
                  </a>
              </div>
              
              <p>© 2025 QGenius. All rights reserved.</p>
              
              <div class="footer-links">
                  <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> | <a href="#">Unsubscribe</a>
              </div>
          </div>
      </div>
  </div>
</body>
</html>
  `;
  
    // Replace all template placeholders with actual values
    let html:string = mailTemplate
      .replace('{{title}}', params.title || '')
      .replace('{{message}}', params.message || '')
      .replace('{{link}}', params.link || '')
      .replace('{{buttonText}}', params.buttonText || '')
    
    return html;
  }