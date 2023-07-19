import chai from "chai"
import supertest from "supertest"
import { usersDao } from "../src/server/dao/factory.dao.js"

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing Ddbase', () => {
    let cookieToken, uid, user, pid, cid
    describe('Test session and User', () => {
        it('Request type post /api/sessions/register, create user', async () => {
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

        it('Request type get /api/sessions/verification/?code=id, validate email', async () => {
            const data = await usersDao.get({email: user.email})
            uid = data[0]._id
            cid = data[0].cart._id

            const {statusCode} = await requester.get(`/api/sessions/verification/?code=${uid}`)

            expect(statusCode).to.be.ok
        })

        it('Request type post /api/sessions/login, for login', async () => {
            const result = await requester.post(`/api/sessions/login`).send(user)
            cookieToken = result.headers['set-cookie'][0]

            expect(result).to.be.ok
        })

        it('Request type put /api/sessions/premium/:uid, for challenge role to premium', async () => {
            const result = await requester.put(`/api/users/premium/${uid}`).set('Cookie', cookieToken)
            cookieToken = result.headers['set-cookie'][1] //token with new role

            expect(result).to.be.ok
        })

        it('Request type get /api/sessions/current, return cookie data', async () => {
            const {_body} = await requester.get(`/api/sessions/current`).set('Cookie', cookieToken)

            expect(_body).to.be.ok
        })

        it('Request type post /api/sessions/logout, delete session', async () => {
            const result = await requester.post(`/api/sessions/logout`).set('Cookie', cookieToken)
            cookieToken = null
            expect(result).to.be.ok
        })

        it('Request type post /api/sessions/forgotpassword, return code for challenge password', async () => {
            const {_body} = await requester.post(`/api/sessions/forgotpassword`).send({email: user.email})
            cookieToken = _body.payload.code.code
            
            expect(_body.payload.code.code).to.be.ok
        })

        it('Request type get /api/sessions/newpassword, validated code and redirect to new password', async () => {
            const result = await requester.get(`/api/sessions/newpassword/?code=${cookieToken}`)
            cookieToken = result.headers['set-cookie']

            expect(result).to.be.ok
        })

        it('Request type put /api/users/newPassword/:uid, validated password and challenge', async () => {
            const {_body} = await requester.put(`/api/users/newpassword/${uid}`).send({password: user.password}).set('Cookie', cookieToken)

            expect(_body).to.be.ok
        })
    })

    describe('Test Products', () => {
        it('Request type get /api/products, return all products in format mongoose-paginate', async () => {
            const {_body} = await requester.get('/api/products').set('Cookie', cookieToken)

            expect(_body.payload.docs).to.be.ok
        })

        it('Request type post /api/products, create new product', async () => {
            const newProduct = {
                title: 'Product test',
                description: "this product for test",
                code: "TTT999",
                price: 5000,
                stock: 4,
                category: 'test'
            }

            const {_body} = await requester.post('/api/products').send(newProduct).set('Cookie', cookieToken)
            pid = _body.payload._id

            expect(_body.payload).to.be.ok
        })

        it('Request type put /api/products/:pid, update product', async () => {

            const {_body} = await requester.put(`/api/products/${pid}`).send({stock: 1}).set('Cookie', cookieToken)

            expect(_body.message).to.be.ok
        })

        it('Request type delete /api/products/:pid, update status to false', async () => {

            const {_body} = await requester.delete(`/api/products/${pid}`).set('Cookie', cookieToken)

            expect(_body.message).to.be.ok
        })
    })

    describe('Test carts', () => {
        it('Request type post /api/carts/:cid/products/:pid, add product in cart', async () => {

            const {_body} = await requester.post(`/api/carts/${cid}/products/64b1c648a2c7631c977a039a`).set('Cookie', cookieToken)

            expect(_body).to.be.ok
        })

        it('Request type put /api/carts/:cid/products/:pid, update qty to product', async () => {
            const quantity = 3
            const {_body} = await requester.put(`/api/carts/${cid}/products/64b1c648a2c7631c977a039a`).send({quantity}).set('Cookie', cookieToken)

            expect(_body).to.be.ok
        })

        
        it('Request type delete /api/carts/:cid/product/:pid, delete product in cart', async () => {
            const {_body} = await requester.delete(`/api/carts/${cid}/products/64b1c648a2c7631c977a039a`).set('Cookie', cookieToken)
            
            expect(_body).to.be.ok
        })

        it('Request type put /api/carts/:cid, update cart with two products', async () => {
            const newCart = {
                products: [
                    {
                        product: '64b1c648a2c7631c977a039a',
                        quantity: 5
                    },
                    {
                        product: '6433d2d9253a5014b24bbf85',
                        quantity: 1
                    },
                ]
            }
            const {_body} = await requester.put(`/api/carts/${cid}/`).send(newCart).set('Cookie', cookieToken)
    
            expect(_body).to.be.ok
        })

        it('Request type post /api/carts/:cid/purchase, generate ticket', async () => {
            const {_body} = await requester.post(`/api/carts/${cid}/purchase`).set('Cookie', cookieToken)

            expect(_body).to.be.ok
        })
    })
})