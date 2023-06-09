import twilio from "twilio"
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from "../env/vars.env.js"

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

export const generateWhatsapp = (err) => {
    client.messages
    .create({
        from: "whatsapp:+13614507982",
        body: `${err}`,
        to:'whatsapp:+543513324770'
    })
}