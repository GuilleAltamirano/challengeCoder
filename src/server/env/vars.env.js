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
    STATUS_PRODUCTS: process.env.STATUS_PRODUCTS ?? 'Active',
    PROMOTION_PRODUCTS: process.env.PROMOTION_PRODUCTS ??'Promotion',
    SUPERIOR_PRIVILEGES: process.env.SUPERIOR_PRIVILEGES ?? 'ADMIN',
    ROLE_USER_ADVANCED: process.env.ROLE_USER_ADVANCED ?? 'PREMIUM',
    ROLE_USER_BASIC: process.env.ROLE_USER_BASIC ?? 'USER',
    ROLE_PUBLIC: process.env.ROLE_PUBLIC ?? 'PUBLIC',
    STATUS_DOCUMENTS_USERS: process.env.STATUS_DOCUMENTS_USERS ?? 'AllDocuments',
    EMAIL_VERIFIED_USERS: process.env.EMAIL_VERIFIED_USERS ?? 'Verified',
    UPLOAD_DOCUMENT_ONE: process.env.UPLOAD_DOCUMENT_ONE ?? 'identification',
    UPLOAD_DOCUMENT_TWO: process.env.UPLOAD_DOCUMENT_TWO ?? 'address',
    UPLOAD_DOCUMENT_THREE: process.env.UPLOAD_DOCUMENT_THREE ?? 'account_status',
    UPLOAD_PHOTO_USER: process.env.UPLOAD_PHOTO_USER ?? 'profile',
    UPLOAD_IMAGE_PRODUCTS: process.env.UPLOAD_IMAGE_PRODUCTS ?? 'thumbnails',
    PUBLIC_ROUTER: process.env.PUBLIC_ROUTER ?? '../../../public',
    SESSION_DURATION: process.env.SESSION_DURATION ?? '12h',
    TOKEN_VALIDATION_DURATION: process.env.TOKEN_VALIDATION_DURATION ?? '1h',
    NAME_COOKIE_SESSION: process.env.NAME_COOKIE_SESSION ?? 'cookieToken',
    NAME_COOKIE_VALIDATION: process.env.NAME_COOKIE_VALIDATION ?? 'cookieAuthEmail',
    PROJECT_NAME: process.env.PROJECT_NAME ?? 'Ddbase',
    COOKIE_AUTH_DURATION: process.env.COOKIE_AUTH_DURATION ?? 3600000*12,
    STRIPE_KEY_PRIVATE: process.env.STRIPE_KEY_PRIVATE
}
