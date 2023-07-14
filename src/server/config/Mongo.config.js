import mongoose, { connect } from "mongoose"
import varsEnv from "../env/vars.env.js"
import { logger } from "../utils/logger.js"

export const mongoConfig = async () => {await MongoSingleton.getInstance()}

class MongoSingleton {
    static #instance
    constructor() {
        connect(`mongodb://127.0.0.1/eccomerce`), { //${varsEnv.URL}${varsEnv.ACCESS}${varsEnv.SERVER}${varsEnv.PARAMS}
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