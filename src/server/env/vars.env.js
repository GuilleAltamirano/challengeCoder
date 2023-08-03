import { config } from "dotenv"
import commander from "../utils/commander.js"

let envPath = '.env.production'
commander.mode != 'production' ? envPath = '.env.dev' : envPath = '.env.production'
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
    STATUS_PRODUCTS: 'Active',
    PROMOTION_PRODUCTS: 'Promotion',
    SUPERIOR_PRIVILEGES: 'ADMIN',
    ROLE_USER_ADVANCED: 'PREMIUM',
    ROLE_USER_BASIC: 'USER',
    ROLE_PUBLIC: 'PUBLIC',
    STATUS_DOCUMENTS_USERS: 'AllDocuments',
    EMAIL_VERIFIED_USERS: 'Verified',
    UPLOAD_DOCUMENT_ONE: 'identification',
    UPLOAD_DOCUMENT_TWO: 'address',
    UPLOAD_DOCUMENT_THREE: 'account_status',
    UPLOAD_PHOTO_USER: 'profile',
    UPLOAD_IMAGE_PRODUCTS: 'thumbnails',
    PUBLIC_ROUTER: '../../../public',
    SESSION_DURATION: '12hs',
    TOKEN_VALIDATION_DURATION: '1h',
    NAME_COOKIE_SESSION: 'cookieToken',
    NAME_COOKIE_VALIDATION: 'cookieAuthEmail',
    PROJECT_NAME: 'Ddbase'
}
