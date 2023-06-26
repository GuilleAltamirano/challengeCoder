import { connect } from "mongoose"
import varsEnv from "../env/vars.env.js"
import { logger } from "../utils/logger.js"

export const mongoConfig = async () => {await MongoSingleton.getInstance()}

class MongoSingleton {
    static #instance
    constructor() {
        connect(`${varsEnv.URL}${varsEnv.ACCESS}${varsEnv.SERVER}${varsEnv.PARAMS}`), {
            userUnifiedTopology: true
        }
    }

    static async getInstance(){
        if (this.#instance){
            logger.warning('it is already connected')
            return this.#instance
        }

        this.#instance = new MongoSingleton()
        logger.info('Mongo connect 🚀')

        return this.#instance
    }
}