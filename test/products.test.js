import chai from "chai"
import supertest from "supertest"

const expect = chai.expect
const requester = supertest('http://localhost:8080/')

describe('Testing Ddbase', () => {
    describe('Test Products', () => {
        it('Type petition post /api/products, return all products in format mongoose-paginate', async () => {
            const newProduct = {
                title: 'Test',
                description: "It's product test",
                code: 'ZZZ999',
                price: 1,
                stock: 1,
                category: 'TEST',
                thumbnails: ['https://placehold.co/300x300']
            }
        })
    })
})