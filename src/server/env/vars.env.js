import { config } from "dotenv"
import commander from "../utils/commander.js"
let envPath = '.env.production'
if (commander.mode != 'production'){commander.mode === 'dev' ? envPath = '.env.dev' : envPath = '.env.test'}
config({ path: envPath })

export default {
    URL: process.env.URL,
    ACCESS: process.env.ACCESS,
    SERVER: process.env.SERVER,
    PARAMS: process.env.PARAMS,
    EMAIL_ADMIN: process.env.EMAIL_ADMIN || "admin@admin.com",
    PASSWORD_ADMIN: process.env.PASSWORD_ADMIN || "admin@admin",
    PORT: process.env.PORT || 8080,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    WHITE_LIST: process.env.WHITE_LIST,
    PERSISTENCE: process.env.PERSISTENCE,
    EMAIL_NODEMAILER: process.env.EMAIL_NODEMAILER,
    PASS_NODEMAILER: process.env.PASS_NODEMAILER,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
}
