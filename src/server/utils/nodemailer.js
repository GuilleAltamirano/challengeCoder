import { createTransport } from "nodemailer"
import varsEnv from "../env/vars.env.js"

const {PROJECT_NAME, EMAIL_NODEMAILER, PASS_NODEMAILER} = varsEnv

//config
const nodemailer = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: EMAIL_NODEMAILER,
        pass: PASS_NODEMAILER
    }
})

export const sendEmailValidation = async ({receiver, code, use, user}) => {
    nodemailer.sendMail({
        from: `${PROJECT_NAME} <${EMAIL_NODEMAILER}>`,
        to: receiver,
        subject: typeSubject({use}),
        html: typeEmail({code, user, use}),
        attachments: []
    })
}

//use?
const typeEmail = ({code, user, use}) => {
    if (use === 'verify') return htmlVerify({code, user})
    if (use === 'forgot') return htmlForgot({code, user})
    if (use === 'delProd') return htmlDelProd({code, user})
}

const typeSubject = ({use}) => {
    if (use === 'verify') return 'Verify your email'
    if (use === 'forgot') return 'Restore your password'
    if (use === 'delProd') return 'Your product has been removed'
}

//html's
const htmlForgot = ({code, user}) => {
    return`
        <body style='background: linear-gradient(#1A1A1A, #000000); min-height: 100vh'>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center">
                        <table width="600" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td align="center" style="padding: 40px 0 30px 0;">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/ddbase.appspot.com/o/nav%2FisoTipo.png?alt=media&token=cd21ebbe-2412-4aa7-9662-1b21b1b44833" alt="Logo Ddbase" width="80" height="70" style="display: block;" />
                                    <h1 style='font-size: 350%; color: white; margin: 0 0 0 1%;'>${PROJECT_NAME}</h1>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 40px 30px 40px 30px;">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <p style="font-family: Arial, sans-serif; font-size: 24px; color:white;">
                                                ${user} forgot your password??
                                            </p>
                                        </tr>
                                        <tr>
                                            <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; padding: 20px 0 30px 0; color:white;">
                                                We heard that you lost your ${PROJECT_NAME} password. Sorry about that!<br><br>But don’t worry! You can use the following bottom to reset your password:<br><br>
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

const htmlVerify = ({code, user}) => {
    return `
        <body style='background: linear-gradient(#1A1A1A, #000000); min-height: 100vh'>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center">
                        <table width="600" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td align="center" style="padding: 40px 0 30px 0;">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/ddbase.appspot.com/o/nav%2FisoTipo.png?alt=media&token=cd21ebbe-2412-4aa7-9662-1b21b1b44833" alt="Logo Ddbase" width="80" height="70" style="display: block;" />
                                    <h1 style='font-size: 350%; color: white; margin: 0 0 0 1%;'>${PROJECT_NAME}</h1>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 40px 30px 40px 30px;">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <p style="font-family: Arial, sans-serif; font-size: 24px; color:white;">
                                                Welcome to ${PROJECT_NAME} ${user}
                                            </p>
                                        </tr>
                                        <tr>
                                            <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; padding: 20px 0 30px 0; color:white;">
                                            For privacy and security issues, we need your email to be validated!<br><br>You can use the following bottom to enable and activate your account: <br><br>
                                            </p>
                                        </tr>
                                        <tr align="center">
                                            <a href='http://localhost:${varsEnv.PORT}/api/sessions/verification/?code=${code}' style='color:black; background-color: #F24405;
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

const htmlDelProd = ({code, user}) => {// code is product name
    return `
        <body style='background: linear-gradient(#1A1A1A, #000000); min-height: 100vh'>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center">
                        <table width="600" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td align="center" style="padding: 40px 0 30px 0;">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/ddbase.appspot.com/o/nav%2FisoTipo.png?alt=media&token=cd21ebbe-2412-4aa7-9662-1b21b1b44833" alt="Logo Ddbase" width="80" height="70" style="display: block;" />
                                    <h1 style='font-size: 350%; color: white; margin: 0 0 0 1%;'>${PROJECT_NAME}</h1>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 40px 30px 40px 30px;">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <p style="font-family: Arial, sans-serif; font-size: 24px; color:white;">
                                                Dear ${user}
                                            </p>
                                        </tr>
                                        <tr>
                                            <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; padding: 20px 0 30px 0; color:white;">
                                            We hope this email finds you well. We are writing to inform you that we have recently made some changes to our platform, and unfortunately, your product has been removed.
                                            </p>
                                            <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; padding: 20px 0 30px 0; color:white;">
                                            We sincerely apologize for any inconvenience this may have caused and would like to provide you with further details regarding this action. Our moderation team carefully reviewed the products listed on our website and found that your product ${code} violated our terms of use and conditions.
                                            </p>
                                            <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; padding: 20px 0 30px 0; color:white;">
                                            Thank you for being a part of our community at ${PROJECT_NAME}. We look forward to seeing you again and wish you success in your future transactions.
                                            </p>
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