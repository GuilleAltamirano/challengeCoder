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
        html: `
            <div> 
                <h1>first test</h1>
                <p>Code: ${code}</p>
            </div>
        `,
        attachments: []
    })
}