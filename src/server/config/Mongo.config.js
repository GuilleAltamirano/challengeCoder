import mongoose, { connect } from "mongoose"
import varsEnv from "../env/vars.env.js"
import { logger } from "../utils/logger.js"

export const mongoConfig = async () => {await MongoSingleton.getInstance()}

const {URL, ACCESS, SERVER, PARAMS} = varsEnv

class MongoSingleton {
    static #instance
    constructor() {
        connect(`${URL}${ACCESS}${SERVER}${PARAMS}`), { 
            useNewUrlParser: true,
            userUnifiedTopology: true
        }
    }

    static async getInstance(){
        if (this.#instance){
            logger.warning('it is already connected')
            return this.#instance
        }

        const db = mongoose.connection
        db.on('error', err => {
            logger.error(err)
        })
        
        this.#instance = new MongoSingleton()
        logger.info('Mongo connect 🚀')
        
        return this.#instance
    }
}