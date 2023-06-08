import { connect } from "mongoose"
import { URL, ACCESS, SERVER, PARAMS } from "../env/vars.env.js"

export const mongoConfig = async () => {MongoSingleton.getInstance()}

class MongoSingleton {
    static #instance
    constructor() {
        connect(`${URL}${ACCESS}${SERVER}${PARAMS}`), {
            userUnifiedTopology: true
        }
    }

    static getInstance(){
        if (this.#instance){
            console.info('it is already connected')
            return this.#instance
        }

        this.#instance = new MongoSingleton()
        console.info('Mongo connect 🚀')

        return this.#instance
    }
}