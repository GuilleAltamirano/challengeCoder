import chai from "chai"
import supertest from "supertest"

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing Ddbase', () => {
    let cookieToken, id, user
    describe('Test session and User', () => {
        it('Type petition post /api/sessions/register, create user', async () => {
            const newUser = {
                first_name: 'User', 
                last_name: 'Test', 
                email: 'LGuille.2000@gmail.com',
                age: 22, 
                password: 'admin@admin'
            }
            user = { email: newUser.email, password: newUser.password }

            const {statusCode} = await requester.post('/api/users/register').send(newUser)

            expect(statusCode).to.be.ok
        })

        it('Type petition get /api/sessions/verification/?code=id, validate email', async () => {
            const {_body} = await requester.post(`/api/users/id`).send(user)
            id = _body.message
            const {statusCode} = await requester.get(`/api/sessions/verification/?code=${id}`)

            expect(statusCode).to.be.ok
        })

        it('Type petition post /api/sessions/login, for login', async () => {
            const result = await requester.post(`/api/sessions/login`).send(user)
            cookieToken = result.headers['set-cookie'][0]

            expect(result).to.be.ok
        })

        it('Type petition put /api/sessions/premium/:uid, for challenge role to premium', async () => {
            const result = await requester.put(`/api/users/premium/${id}`).set('Cookie', cookieToken)
            cookieToken = result.headers['set-cookie'][1] //token with new role

            expect(result).to.be.ok
        })

        it('Type petition get /api/sessions/current, return cookie data', async () => {
            const {_body} = await requester.get(`/api/sessions/current`).set('Cookie', cookieToken)

            expect(_body).to.be.ok
        })

        it('Type petition post /api/sessions/logout, return cookie data', async () => {
            const result = await requester.post(`/api/sessions/logout`).set('Cookie', cookieToken)
            cookieToken = null
            expect(result).to.be.ok
        })

        it('Type petition post /api/sessions/forgotpassword, return code for challenge password', async () => {
            const {_body} = await requester.post(`/api/sessions/forgotpassword`).send({email: user.email})
            cookieToken = _body.payload.code.code
            
            expect(_body.payload.code.code).to.be.ok
        })

        it('Type petition get /api/sessions/newpassword, validated code and redirect to new password', async () => {
            const result = await requester.get(`/api/sessions/newpassword/?code=${cookieToken}`)
            cookieToken = result.headers['set-cookie']

            expect(result).to.be.ok
        })

        it('Type petition put /api/users/newPassword/:uid, validated password and challenge', async () => {
            const {_body} = await requester.put(`/api/users/newpassword/${id}`).send({password: user.password}).set('Cookie', cookieToken)

            expect(_body).to.be.ok
        })
    })

    describe('Test Products', () => {
        it('Type petition get /api/products, return all products in format mongoose-paginate', async () => {
            const {_body} = await requester.get('/api/products').set('Cookie', cookieToken)

            expect(_body.payload.docs).to.be.ok
        })

        it('Type petition get /api/products, create new product', async () => {
            const newProduct = {
                title: 'Product test',
                description: "It's product for test",
                code: "TTT999",
                price: 5000,
                stock: 4,
                category: 'test'
            }
            console.log(newProduct);
            // const {_body} = await requester.post('/api/products').send(newProduct).set('Cookie', cookieToken)
            // console.log(_body);
            // expect(_body.payload).to.be.ok
        })
    })
})