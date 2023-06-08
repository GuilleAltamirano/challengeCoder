import { config } from "dotenv"
import commander from "../utils/commander.js"
if (commander.user !== 'root' && commander.user !== 'tester' && commander.user !== 'customer') {
    console.error('Error, you are not identified')
    process.exit();
}
let envPath = '.env.production'
if (commander.mode != 'production'){commander.mode === 'dev' ? envPath = '.env.dev' : envPath = '.env.test'}
config({ path: envPath })

export const URL = process.env.URL
export const ACCESS = process.env.ACCESS
export const SERVER = process.env.SERVER
export const PARAMS = process.env.PARAMS
export const CLIENT_ID_GITHUB = process.env.CLIENT_ID_GITHUB
export const CLIENT_SECRET_GITHUB = process.env.CLIENT_SECRET_GITHUB
export const EMAIL_ADMIN = process.env.EMAIL_ADMIN || "admin@admin.com"
export const PASSWORD_ADMIN = process.env.PASSWORD_ADMIN || "admin@admin"
export const PORT = process.env.PORT || 8080
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
export const COOKIE_SECRET = process.env.COOKIE_SECRET
export const WHITE_LIST = process.env.WHITE_LIST
export const PERSISTENCE = process.env.PERSISTENCE
