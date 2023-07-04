import { createTransport } from "nodemailer"
import varsEnv from "../env/vars.env.js"

const nodemailer = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: varsEnv.EMAIL_NODEMAILER,
        pass: varsEnv.PASS_NODEMAILER
    }
})

export const sendEmailValidation = async ({receiver, code}) => {
    nodemailer.sendMail({
        from: `Test <${varsEnv.EMAIL_NODEMAILER}>`,
        to: receiver,
        subject: 'test send email',
        html: htmlForgot(code),
        attachments: []
    })
}

const htmlForgot = (code) => {
    return`
        <body style='background: linear-gradient(#1A1A1A, #000000); min-height: 100vh'>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center">
                        <table width="600" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td align="center" style="padding: 40px 0 30px 0;">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/ddbase.appspot.com/o/nav%2FisoTipo.png?alt=media&token=cd21ebbe-2412-4aa7-9662-1b21b1b44833" alt="Logo Ddbase" width="80" height="70" style="display: block;" />
                                    <h1 style='font-size: 350%; color: white; margin: 0 0 0 1%;'>Ddbase</h1>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 40px 30px 40px 30px;">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <p style="font-family: Arial, sans-serif; font-size: 24px; color:white;">
                                                Did you forget your password?
                                            </p>
                                        </tr>
                                        <tr>
                                            <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; padding: 20px 0 30px 0; color:white;">
                                                We heard that you lost your Ddbase password. Sorry about that!<br><br>But don’t worry! You can use the following link to reset your password:<br><br>
                                            </p>
                                        </tr>
                                        <tr align="center">
                                            <a href='http://localhost:${varsEnv.PORT}/api/sessions/newpassword/?code=${code}' style='color:black; background-color: #F24405;
                                            border-radius: 25px;
                                            font-size: 150%;
                                            padding: 3% 5%;
                                            text-decoration: none;'>Click me</a>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    `
}