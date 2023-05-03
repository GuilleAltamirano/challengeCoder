import { config } from "dotenv"
config()
import { connect } from "mongoose"


const URL = process.env.URL
const ACCESS = process.env.ACCESS
const SERVER = process.env.SERVER
const PARAMS = process.env.PARAMS

export const mongoConfig = async () => {
    try {
        connect(`${URL}${ACCESS}${SERVER}${PARAMS}`)
        console.info('Mongo connect 🚀')
    } catch (err) {console.error(err)}
}