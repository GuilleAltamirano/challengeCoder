import Routers from "./router.js"

class AnalyticsRouter extends Routers {
    async init(){
        this.get('/',['ADMIN'], )
    }
}

export const analyticsRoute = new AnalyticsRouter()