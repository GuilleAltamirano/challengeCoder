import twilio from "twilio"
import varsEnv from '../env/vars.env.js'

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = ''

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

export const generateWhatsapp = async (err) => {
    client.messages
    .create({
        from: "+13614507982",
        body: `${err}`,
        to:'+543513324770'
    })
}