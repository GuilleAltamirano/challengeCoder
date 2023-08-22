import Stripe from "stripe"
import varsEnv from "../env/vars.env.js"

const {STRIPE_KEY_PRIVATE} = varsEnv

class PaymentsService {
    constructor() {
        this.stripe = new Stripe(STRIPE_KEY_PRIVATE)
    }

    async createPaymentIntent (data) {
        const paymentIntent = this.stripe.paymentIntents.create(data)
        return paymentIntent
    }
}

export const paymentsService = new PaymentsService()