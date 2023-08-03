import Routers from "./router.js"
import varsEnv from "../env/vars.env.js"

const {SUPERIOR_PRIVILEGES} = varsEnv

class AnalyticsRouter extends Routers {
    async init(){
        this.get('/',[SUPERIOR_PRIVILEGES], )
    }
}

export const analyticsRoute = new AnalyticsRouter()