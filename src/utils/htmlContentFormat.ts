export const generateCreateEmailHtml = (
  defaultPassword: string,
  clientUrl: string
) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #F0F0F0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            width: 80%;
            max-width: 800px;
            background-color: #FFFFFF;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            text-align: center;
          }
          .container header {
            background-color: #DDDDDD;
            padding: 10px;
          }
          .container main {
            margin-top: 20px;
            margin: 0;
          }
          .container main p {
            margin-bottom: 10px;
          }
          .container main .login-button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            color: #FFFFFF;
            background-color: #007BFF;
            text-decoration: none;
            border-radius: 5px;
          }
          .container footer {
            margin-top: 20px;
            background-color: #F9F9F9;
            color: #888888;
            padding: 10px;
            font-size: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>Attendance Management System</h1>
          </header>
          <main>
            <h2>Account Created Successfully.</h2>
            <p>Please click the Login button below to log in to the AMS System.</p>
            <p>Your password is: ${defaultPassword}</p>
            <a href="${clientUrl}/login" class="login-button">Login</a>
            <p>If you did not create an account, no further action is required.</p>
            <p>Regards,<br>DWC Attendance Management Team</p>
            <p>If you’re having trouble clicking the button, then go to the link below:</p>
            <p><a href="https://deerwalktrainingcenter.com/contact-us">https://deerwalktrainingcenter.com/contact-us</a></p>
            <br />
            <img src="cid:unique_image_cid" width= "100px" height = "100px">
          </main>
          <footer>
            <p>©2024 Attendance Management System. All rights reserved</p>
          </footer>
        </div>
      </body>
    </html>`;
};

export const generateResetPasswordHtml = (clientUrl: string, token: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body, html {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #F0F0F0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          width: 80%;
          max-width: 800px;
          background-color: #FFFFFF;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          text-align: center;
        }
        .container header {
          background-color: #DDDDDD;
          padding: 10px;
        }
        .container main {
          margin-top: 20px;
          margin: 0;
        }
        .container main p {
          margin-bottom: 10px;
        }
        .container main .login-button {
          display: inline-block;
          padding: 10px 20px;
          margin-top: 20px;
          color: #FFFFFF;
          background-color: #007BFF;
          text-decoration: none;
          border-radius: 5px;
        }
        .container footer {
          margin-top: 20px;
          background-color: #F9F9F9;
          color: #888888;
          padding: 10px;
          font-size: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <header>
          <h1>Reset Password</h1>
        </header>
        <main>
          <h2>Verify to check reset password</h2>
          <a href="${clientUrl}/reset-password?token=${token}">
            ${clientUrl}/reset-password?token=${token}
          </a>
          <h4>If you did not request a password reset, no further action is required.</h4>
          <p>Regards,<br>DWC Attendance Management Team</p>
          <p>If you’re having trouble clicking the "Reset Password" link, click the URL below for further enquiry:</p>
          <p><a href="https://deerwalktrainingcenter.com/contact-us">https://deerwalktrainingcenter.com/contact-us</a></p>
          <br />
          <img src="cid:unique_image_cid" width= "100px" height = "100px">
        </main>
        <footer>
          <p>©2024 Attendance Management System. All rights reserved</p>
        </footer>
      </div>
      <br />
    </body>
    </html>`;
};

export const generateFeedbackHtml = (clientUrl: string, token: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body, html {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #F0F0F0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          width: 80%;
          max-width: 800px;
          background-color: #FFFFFF;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          text-align: center;
        }
        .container header {
          background-color: #DDDDDD;
          padding: 10px;
        }
        .container main {
          margin-top: 20px;
          margin: 0;
        }
        .container main p {
          margin-bottom: 10px;
        }
        .container main .login-button {
          display: inline-block;
          padding: 10px 20px;
          margin-top: 20px;
          color: #FFFFFF;
          background-color: #007BFF;
          text-decoration: none;
          border-radius: 5px;
        }
        .container footer {
          margin-top: 20px;
          background-color: #F9F9F9;
          color: #888888;
          padding: 10px;
          font-size: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <header>
          <h1>Attendance Management System</h1>
        </header>
        <main>
          <h2>Feedback Form</h2>
          <a href="${clientUrl}/feedback-form?token=${token}">
            Click here to give Feedback.
          </a>
          <p>Regards,<br>DWC Attendance Management Team</p>
          <p>If you’re having trouble clicking the "Feedback" link, click the URL below for further enquiry:</p>
          <p><a href="https://deerwalktrainingcenter.com/contact-us">https://deerwalktrainingcenter.com/contact-us</a></p>
          <br />
          <img src="cid:unique_image_cid" width= "100px" height = "100px">
        </main>
        <footer>
          <p>©2024 Attendance Management System. All rights reserved</p>
        </footer>
      </div>
      <br />
    </body>
    </html>`;
};
