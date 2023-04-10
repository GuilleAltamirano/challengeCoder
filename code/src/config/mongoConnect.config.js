import { connect } from "mongoose"

export const mongoConnect = async () => {
    try {
        connect('mongodb+srv://lguille:GrzBBTmDcPC3zVqJ@coder.barbhh9.mongodb.net/coder?retryWrites=true&w=majority')
        console.log(`Mongo Db connected 🚀`)
    } catch (err) {
        console.log(err)
    }
}
