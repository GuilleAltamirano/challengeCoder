import { createTransport } from "nodemailer"
import { EMAIL_NODEMAILER, PASS_NODEMAILER } from "../env/vars.env.js"

const nodemailer = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: EMAIL_NODEMAILER,
        pass: PASS_NODEMAILER
    }
})

export const sendEmailValidation = async ({receiver, code}) => {
    nodemailer.sendMail({
        from: `Test <${EMAIL_NODEMAILER}>`,
        to: receiver,
        subject: 'test send email',
        html: `
            <div> 
                <h1>first test</h1>
                <p>Code: ${code}</p>
            </div>
        `,
        attachments: []
    })
}